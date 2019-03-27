<template>
    <div class="app-container">
      <div style="margin-top:15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-input style="width:203px" v-model="listQuery.keyword" placeholder="Staff ID"></el-input>
          <el-button type="primary" @click="Search()">搜索</el-button>
          <el-button type="primary" @click="addUser()">新增用户</el-button>
        </el-form>
      </div>
      <div class="table-container" style="width:960px">
        <el-table v-loading="listLoading"
                  :data="list"
                  border>
          <el-table-column
            prop="userID"
            label="UserID"
            width="150">
            <template slot-scope="scope">
              {{scope.row.userid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="staffID"
            label="StaffID"
            width="150">
            <template slot-scope="scope">
              {{scope.row.staffid}}
            </template>
          </el-table-column>
            <el-table-column
            prop="name"
            label="Name"
            width="150">
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column
            prop="state"
            label="State"
            width="150">
              <template>
                {{scope.row.state}}
              </template>
            </el-table-column>
          <el-table-column
            prop="operation"
            label="Operation">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import {getuserList} from '@/api/userList'
    export default {
        name: "userList",
      data(){
          return{
            listQuery:{
              keyword:null
            },
            list:null,
            listLoading:true
          }
      },
      created(){
          this.fetchData()
      },
      methods:{
          fetchData(){
            this.listLoading=true
            getuserList().then(response=>{
              this.list=response.data.items
              this.listLoading=false
            })
          }
      }
    }
</script>

<style scoped>

</style>
