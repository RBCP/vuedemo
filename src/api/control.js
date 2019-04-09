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
export function fetchLocation(){
  return request({
    url:'/location/listAll',
    method:'get'
  })
}
export function fetchRank(){
  return request({
    url:'/rank/listAll',
    method:'get'
  })
}
export function getroleList(params){
  return request({
    url:'/control/getroleList',
    method:'get',
    params:params
  })
}
export function addPermission(data){
  return request({
    url:'/control/addPermission',
    method:'post',
    data:data
  })
}
export function getManualList(params){
  return request({
    url:'/control/getManulList',
    method:'get',
    params:params
  })
}

