import Cookies from 'js-cookie'
const Tokenkey='loginToken'
export function getToken(){
  return Cookies.get(Tokenkey)
}
export function setToken(token){
  return Cookies.set(TOkenKey,token)
}
export function removeToken(){
  return Cookies.remove(TokenKey)
}
