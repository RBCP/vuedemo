import request from '@/utils/request'
export function getuserList(){
  return request({
    url:'/api/userList',
    method:'get'
  })
}
