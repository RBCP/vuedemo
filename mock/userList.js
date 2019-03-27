import Mock from 'mockjs'
export default{
  list:()=>{
    const items=Mock.mock({
      'items|30':[{
        userid:'i@d',
        staffid:'/[M,R]{5}[0-9]/',
        name:'name',
        state:['online','offline']
      }]
    })
    return{
      code:2000,
      data:items
    }
  },
}
