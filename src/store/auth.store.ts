

import { defineStore,createPinia } from 'pinia'
import { User} from '../types/authTypes'

const store = createPinia()

interface UserState {
  token?: string |null;
  userInfo:User | null;
}

export const authStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: null
  }),
  getters: {
    getUserInfo(): User | null {
      return this.userInfo;
    },
    getToken(): any {
      return this.token
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      //setToken(token)
    },
    setUserInfo(info: User) {
      this.userInfo = info
    },
    resetState() {
      this.token = ''
      this.userInfo = null
     /* removeToken()
      resetRouter()*/
    },
    /**
     * @description: login
     */
  /*  async login(params: { username: string; password: string }) {
      try {
        const { username, password } = params
        const { data } = await setLogin({ username, password })
        this.setToken(data.token)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getInfo(): Promise<UserLogged | null> {
      try {
        const { data } = await getUserInfo({ token: this.getToken })
        this.setUserInfo(data)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * @description: logout
     */
    /*async logout() {
      if (this.getToken) {
        try {
          await doLogout()
          this.resetState()
          return Promise.resolve()
        } catch {
          return Promise.reject('logout error')
        }
      }
    }*/
  }
})

// Need to be used outside the setup
export function useAuthStore() {
  return authStore(store)
}