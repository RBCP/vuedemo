import request from '@/utils/request'
export function getControlList(params){
  return request({
    url:'/control/getcontrolList',
    method:'get',
    params:params
  })
}
