import { defineStore } from 'pinia'
import { loginReq, logoutReq, authReq, getInfoReq, editInfoReq } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { asyncRoutes } from '@/router'
import { usePermissionStore } from '@/store/permission'

const resetRouter = () => {
  const asyncRouterNameArr = asyncRoutes.map((mItem) => mItem.name)
  asyncRouterNameArr.forEach((name) => {
    if (router.hasRoute(name)) router.removeRoute(name)
  })
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      roles: [],
      userInfo: {},
      isRegistered: false
    }
  },

  actions: {
    M_username(username) { this.$patch((state) => state.username = username) },
    M_roles(roles) { this.$patch((state) => state.roles = roles) },
    M_isRegistered(isRegistered) { this.$patch((state) => state.isRegistered = isRegistered === 0 ? false : true) },

    /**
     * login
     */
    async login(data) {
      return new Promise((resolve, reject) => {
        loginReq(data)
          .then(res => {
            const { code, message, status, authorization } = res
            switch (code) {
              case 200: {
                setToken(authorization)
                resolve(null)
                break
              }
              default: {
                reject(res)
                break
              }
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * get user authentication
     */
    getAuth() {
      return new Promise((resolve, reject) => {
        //header 中夾帶 token, 到 server 端請求回傳 user info
        authReq()
          .then((response) => {
            const { data } = response
            // console.log(data)
            //沒有 token
            if (!data) return reject('Verification failed, please LOGIN again.')
            const rolesArr = localStorage.getItem('roles')
            const { exp, roles, username, isAdmin, isRegistered } = data

            if (rolesArr) {
              //if there's roles in localStorage
              data.roles = JSON.parse(rolesArr)
            } else {
              //if there's no roles in localStorage
              localStorage.setItem('roles', JSON.stringify(roles))
              localStorage.setItem('exp', exp)
              localStorage.setItem('user', username)
              localStorage.setItem('registered', isRegistered === 0 ? false : true)
            }
            this.M_username(username)
            this.M_roles(roles)
            this.M_isRegistered(isRegistered)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     * logout
     */
    logout() {
      return new Promise((resolve) => {
        logoutReq().then((res) => {
          this.resetState()
          resolve(null)
        })
      })
    },
    /**
     * reset State
     */
    resetState() {
      return new Promise((resolve) => {
        this.M_username('')
        this.M_roles([])
        this.M_isRegistered(0)
        //must remove token first
        removeToken()
        //then remove all items except "language" in localStorage
        localStorage.removeItem('Authorization')
        resetRouter()
        const permissionStore = usePermissionStore()
        permissionStore.M_hasUserInfo(false)
        resolve(null)
      })
    },
    /**
     * get user information
     */
    getInfo(data) {
      return new Promise((resolve, reject) => {
        //Send get user info request to server
        getInfoReq(data)
          .then((res) => {
            switch (res.code) {
              case 200: {
                resolve(res)
                break
              }
              default: {
                reject(res)
                break
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     * submit to update user information
     */
    editInfo(data) {
      return new Promise((resolve, reject) => {
        editInfoReq(data)
          .then((res) => {
            switch (res.code) {
              case 200: {
                resolve(res)
                break
              }
              default: {
                reject(res)
                break
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})
