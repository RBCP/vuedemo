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
                  ref="userTable"
                  :data="list"
                  border>
          <el-table-column
            prop="userID"
            label="UserID"
            width="200">
            <template slot-scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column
            prop="staffID"
            label="StaffID"
            width="150">
            <template slot-scope="scope">
              {{scope.row.employee_id}}
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
              <template slot-scope="scope">
                {{scope.row.state}}
              </template>
            </el-table-column>
          <el-table-column
              prop="registration"
              label="Registration"
              width="150">
              <template slot-scope="scope">
                {{scope.row.registration}}
              </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="Operation">
            <template slot-scope="scope">
              <el-button size="mini" type="text">Modify</el-button>
              <el-button size="mini" type="text">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container" style="margin-left:350px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,sizes,prev,pager,next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :current-page.sync="listQuery.page"
          :total="total">
        </el-pagination>
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
              keyword:null,
              page:1,
              pageSize:10

            },
            list:[],
            listLoading:true,
            total:null
          }
      },
      created(){
          this.fetchData()
      },
      methods:{
          fetchData(){
            this.listLoading=true
            getuserList(this.listQuery).then(response=>{
              this.list=response.data.data.items
              this.total=response.data.data.count
              this.listLoading=false
              console.log(response.data.data.items)
            })
          },
        handleSizeChange(val) {
          this.listQuery.page = 1;
          this.listQuery.pageSize = val;
          this.fetchData();
        },
        handleCurrentChange(val) {
          this.listQuery.page = val;
          this.fetchData();
        },
        Search(){
            this.listQuery.page=1;
            this.fetchData()
        }
      }
    }
</script>

<style scoped>

</style>
