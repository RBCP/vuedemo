import request from '@/utils/request'
export function getSingleChatLogs(params){
  return request({
    url:'/message/getSigChatList',
    method:'get',
    params:params
  })
}
export function getGroupChatLogs(params){
  return request({
    url:'/message/getGrpChatList',
    method:'get',
    params:params
  })
}
