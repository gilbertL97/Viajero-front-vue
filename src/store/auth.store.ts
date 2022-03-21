

import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { setLogin, doLogout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { createPinia } from 'pinia'
import { UserLogged, UserLogin } from '../types/authTypes'

const store = createPinia()

interface UserState {
  token?: string |null;
  userInfo:UserLogged | null;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: getToken(),
    userInfo: null
  }),
  getters: {
    getUserInfo(): any {
      return this.userInfo || {}
    },
    getToken(): any {
      return this.token
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      setToken(token)
    },
    setUserInfo(info: UserLogged) {
      this.userInfo = info
    },
    resetState() {
      this.token = ''
      this.userInfo = null
      removeToken()
      resetRouter()
    },
    /**
     * @description: login
     */
    async login(params: { username: string; password: string }) {
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
    async logout() {
      if (this.getToken) {
        try {
          await doLogout()
          this.resetState()
          return Promise.resolve()
        } catch {
          return Promise.reject('logout error')
        }
      }
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}