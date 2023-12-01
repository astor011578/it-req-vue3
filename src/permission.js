import router, { asyncRoutes } from '@/router'
import { useAppStore } from './store/app'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { useNewStore } from '@/store/addNew'
import { getToken, setToken } from '@/utils/auth'
import { lang } from '@/hooks/useCommon'
import getPageTitle from '@/utils/getPageTitle'
import settings from './settings'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

//import and setup ElLoading & ElMessageBox
import { h } from 'vue'
import RegisterBox from '@/components/RegisterBox.vue'
import { ElLoading, ElMessage, ElMessageBox, ElInput } from 'element-plus'
const loadingInstance = ElLoading.service({
  fullscreen: true,
  lock: true,
  background: '#00000011',
  text: `${lang('Loading')}...`
})

//whitelist which's no need to redirect
const whiteList = ['/login', '/401', '/404', '/500']

//router guard
router.beforeEach(async (to, from, next) => {
  //start progress bar when route changes
  if (settings.isNeedNprogress) NProgress.start()

  //set page title
  document.title = getPageTitle(to.meta.title)
  if (!settings.isNeedLogin) setToken(settings.tmpToken)

  //store instances
  const appStore = useAppStore()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const addNewStore = useNewStore()

  //在變換路由前重置 addNewStore 中的資訊
  await addNewStore.resetApplication()
  await addNewStore.resetValidate()

  let isIndex = (to.path === '/login' || to.path === '/tables') ? 1 : 0
  axiosReq({ method: 'patch', url: `/summary/views?isIndex=${isIndex}` })

  //get token
  if (getToken()) {
    if (to.path === '/login') {
      //if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      //judge if has fetched user's info
      const hasUserInfo = permissionStore.hasUserInfo
      switch (hasUserInfo) {
        //has fetched user info, no need to redirect
        case true: {
          next()
          break
        }
        //has not fetched user info, sending request to server
        case false: {
          try {
            let accessRoutes = []
            if (settings.isNeedLogin) {
              //get user info
              //note: roles must be a object array! such as: ['admin'] or, ['developer','editor']
              const { roles, isRegistered } = await userStore.getAuth()
              const userID = localStorage.getItem('user')
              //if user hasn't registered his or her information
              if (isRegistered === 0) {
                ElMessage.warning(lang('Please register your account'))
                const userData = ref({
                  userID,
                  userName: '',
                  mgrID: '',
                  mgrName: '',
                  eMail: ''
                })
                const validate = ref('')
                await ElMessageBox({
                  title: lang('Register'),
                  closeOnClickModal: false,
                  closeOnPressEscape: false,
                  showClose: false,
                  message: () =>
                    h(RegisterBox, {
                      modelValue: userData.value,
                      validate: lang(validate.value),
                      'onUpdate:modelValue': (val) => userData.value = val
                    }),
                  beforeClose: async (action, instance, done) => {
                    const { userName, mgrName, eMail } = userData.value
                    switch (true) {
                      case userName.trim() === '': validate.value = 'Please input user name'; break;
                      case mgrName.trim() === '': validate.value = 'Please input manager name'; break;
                      case eMail.trim() === '': validate.value = 'Please input e-mail'; break;
                      default: validate.value = ''; break;
                    }
                    if (validate.value === '') {
                      const res = await userStore.editInfo(userData.value)
                      if (res.code === 200) {
                        done()
                      } else {
                        ElMessage.error(lang('Failed to edit user data'))
                      }
                    }
                  }
                })
                  .then(async (val) => {
                    ElMessage.success(lang('Edit user data successfully'))
                    await userStore.logout()
                    ElMessage.info(lang('Please login again'))
                    setTimeout(() => location.reload(), 2000)
                  })
              }
              accessRoutes = await permissionStore.generateRoutes(roles)
            } else {
              accessRoutes = asyncRoutes
            }
            //setting constRouters and accessRoutes to vuex, in order to sideBar for using
            permissionStore.M_routes(accessRoutes)
            //dynamically add accessible routes
            //router4 addRoutes destroyed
            accessRoutes.forEach((route) => {
              router.addRoute(route)
            })
            //already get userInfo
            permissionStore.M_hasUserInfo(true)
            //hack method to ensure that addRoutes is complete
            //set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (err) {
            await userStore.resetState()
            next(`/login?redirect=${to.fullPath}`)
            if (settings.isNeedNprogress) NProgress.done()
            loadingInstance.close()
          }
          break
        }
      }
    }
  } else {
    //if hasn't logged in
    if (whiteList.indexOf(to.path) !== -1) {
      //if (to.path) isn't in whiteList (means user don't need to get authorization)
      next()
    } else {
      //if (to.path) is in whiteList, redirecting to /login
      next(`/login?redirect=${to.fullPath}`)
      if (settings.isNeedNprogress) NProgress.done()
      loadingInstance.close()
    }
  }
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
  loadingInstance.close()
})
