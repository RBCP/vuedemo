import request from '@/utils/request'
export function getuserList(params){
  return request({
    url:'/api/userList',
    method:'get',
    params:params
  })
}
