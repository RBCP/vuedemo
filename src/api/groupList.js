import request from '@/utils/request'
export function getGroupList(params) {
  return request({
    url: '/group/groupList',
    method: 'get',
    params: params
  })
}
export function createGroup(data){
    return request({
      url:'/group/createGroup',
      method:'post',
      data:data
    })
}
export function getMembers(params){
  return request({
    url:'/group/getMembers',
    params:params
  })
}
