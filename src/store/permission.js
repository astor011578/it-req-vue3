import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import settings from '@/settings'

/**
 * @description Use meta.code to determine if the current user has permission
 * @param codeArr
 * @param routeItem
 */
const hasCodePermission = (codeArr, routeItem) => {
  if (routeItem.meta && routeItem.meta.code) {
    return codeArr.includes(routeItem.meta.code) || routeItem.hidden
  } else {
    return true
  }
}
/**
 * @description Use meta.code to determine if the current user has permission
 * @param codeArr
 * @param asyncRoutes
 */
const filterRouterByCodeArr = (codeArr, asyncRoutes) => {
  return new Promise((resolve) => {
    const filterRouter = []
    asyncRoutes.forEach(async (routeItem) => {
      if (hasCodePermission(codeArr, routeItem)) {
        if (routeItem.children) {
          routeItem.children = await filterRouterByCodeArr(codeArr, routeItem.children)
        }
        filterRouter.push(routeItem)
      }
    })
    resolve(filterRouter)
  })
}

/**
 * @description Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

/**
 * @description Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      hasUserInfo: false, //if has fetched user info
      routes: [],         //集合過濾後的 asyncRoutes 與 constantRoutes
      addRoutes: []       //過濾後的 asyncRoutes
    }
  },

  actions: {
    M_routes(routes) {
      this.$patch((state) => {
        //要被串接的 asyncRoutes
        state.addRoutes = routes
        //將 constantRoutes 與 asyncRoutes 串接在一個陣列中
        state.routes = constantRoutes.concat(routes)
      })
    },
    M_hasUserInfo(data) {
      this.$patch((state) => {
        state.hasUserInfo = data
      })
    },
    generateRoutes(roles) {
      return new Promise(async (resolve) => {
        let accessedRoutes
        if (settings.permissionMode === 'roles') {
          //filter by role
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          //filter by codeArr
          //req code arr
          let codeArr = localStorage.getItem('codeArr')
          if (codeArr) {
            codeArr = JSON.parse(codeArr)
          } else {
            localStorage.setItem('codeArr', JSON.stringify([1]))
            codeArr = localStorage.getItem('codeArr')
          }
          accessedRoutes = await filterRouterByCodeArr(codeArr, asyncRoutes)
        }
        // commit('M_routes', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
