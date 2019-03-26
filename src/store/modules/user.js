import {login,logout ,getInfo} from '@/api/login'
import {getToken,setToken,removeToken} from '@/utils/auth'
const user= {
  /*
  state为单一状态叔，在state中需要定义我们所需要管理的数组，对象，字符串等等。只有在这里定义了，在vue.js组件中才能获取你定义对象的状态
  */

  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  /*更改store中的state状态的唯一方法就是提交mutation，就类似⌚️。每个mutation都有一个字符串类型的事件类型和回调函数。我们需要改变state的🈯️就要在回调函数中改变
  我们需要执行这个回调函数，那么我们需要执行一个响应的调用方法：store.commit。个
  */
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles=roles;
    }
  },
  /*
  action可以提交mutation，在action中可以执行store.commit.而且action中可以有任何的一步操作。在页面中我们要调用这个action
  需要执行store.dispatch
  */

  actions: {
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        console.log(username);
        resolve();
      })
    },
    Login1({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        console.log("登陆成功");
        resolve();
        console.log(username);
      })
    },
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo:roles must be a none null array')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
      })
    },
    FedLogout({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
