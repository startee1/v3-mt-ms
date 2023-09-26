import { defineStore } from 'pinia'

export const useUserStateStore = defineStore('userState', () => {
  const userInfo = reactive({
    username: '',
    password: '',
    uid: ''
  })

  const Login = (argUsername: string, argPassword: string, argUid: string = '12312') => {
    userInfo.username = argUsername
    userInfo.password = argPassword
    userInfo.uid = argUid
    window.sessionStorage.setItem('uid', argUid)
    window.location.reload()
  }
  const Logoff = () => {
    userInfo.username = ''
    userInfo.password = ''
    userInfo.uid = ''
    window.sessionStorage.removeItem('uid')
    window.location.reload()
  }
  const getUserInfo = () => {
    return {username: userInfo.username, password: userInfo.password}
  }
  return { Login, Logoff, getUserInfo }
})