import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken, setData, removeData } from '@/utils/auth'

// const user = {
//   state: {
//     token: getToken(),
//     user: {},
//     roles: [],
//     // 第一次加载菜单时用到
//     loadMenus: false,
//     userInfo: {}
//   },
const getDefaultState = () => {
  return {
    token: getToken(),
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false,
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOAD_MENUS: (state, loadMenus) => {
    state.loadMenus = loadMenus
  }
}

const actions = {
  // 登录
  Login({ commit }, userInfo) {
    const rememberMe = userInfo.account
    return new Promise((resolve, reject) => {
      login({ ...userInfo }).then(res => {
        const { data } = res
        if (data !== null) {
          setToken(data.token, rememberMe)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_INFO', data)
          setData('username', data.account)
          // // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          // commit('SET_LOAD_MENUS', true)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  // GetInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo().then(res => {
  //       setUserInfo(res, commit)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // 登出
  LogOut({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        commit('RESET_STATE', {})
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE', {})
      // removeData('userName')
      resolve()
    })
  }

  // updateLoadMenus({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     commit('SET_LOAD_MENUS', false)
  //   })
  // }
}

// export const logOut = (commit) => {
//   commit('SET_TOKEN', '')
//   commit('SET_ROLES', [])
//   removeToken()
// }

// export const setUserInfo = (res, commit) => {
//   // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
//   if (res.roles.length === 0) {
//     commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
//   } else {
//     commit('SET_ROLES', res.roles)
//   }
//   commit('SET_USER', res.user)
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
