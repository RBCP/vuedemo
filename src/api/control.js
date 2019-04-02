import request from '@/utils/request'
export function getControlList(params){
  return request({
    url:'/control/getcontrolList',
    method:'get',
    params:params
  })
}
export function getControlDetail(params){
 return request({
   url:'/control/getControlDetail',
   method:'get',
   params:params
 })
}
export function updateControl(data){
  return request({
    url:'/control/updateControl',
    method:'post',
    data:data
  })
}
export function createControl(data){
  return request({
    url:'/control/createControl',
    method:'post',
    data:data
  })
}
export function fetchListAll(){
  return request({
    url:'/location/listAll',
    method:'get'
  })
}
export function fetchList(){
  return request({
    url:'/rank/listAll',
    method:'get'
  })
}
