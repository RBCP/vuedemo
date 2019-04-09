<template>
    <div class="app=container">
      <div style="margin-top:15px">
        <el-form :inline="true" ref="listQuery" :model="listQuery" label-width="200px">
         <el-input style="width:100px" v-model="listQuery.keyword" placeholder="Group ID"></el-input>
          <el-button type="primary" @click="Search()">Search</el-button>
        </el-form>
      </div>
      <div class="table-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          style="width:691px">
          <el-table-column label="Staff ID" prop="id" width="130">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="Name" prop="name" width="200">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="Join Time" prop="time" width="200">
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
          <el-table-column
            label="Action" width="160">
            <template slot-scope="scope">
              <el-button @click.native.prevent="Delete(scope.$index,scope.row)" type="text" size="small">Delete</el-button>
              <el-button @click.native.prevent="Modify(scope.$index,scope.row)" type="text" size="small">Modify</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,sizes,prev,pager,next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :current-page-sync="listQuery.page"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {getMembers} from '@/api/groupList'
    export default {
        name: "Paricipant",
        data(){
          return{
            list:null,
            total:null,
            listLoading:false,
            listQuery:{
              keyword:null,
              page:1,
              pageSize:10
            }
          }
        },
      created(){
          this.getList();
      },
      methods:{
          getList(){
            this.listLoading=false
            getMembers(this.listQuery).then(response=>{
              this.list=response.data.data.items;
              this.total=response.data.data.count;
              this.listLoading=false
            }).catch(()=>{
              console.log('请求失败');
              this.listLoading=false
            })
          },
          Search(){
            console.log(this.listQuery.keyword)
           this.getList();
          },
        Delete(index,row){

        },
        Modify(index,row){
          this.$router.push({path:'/Users/UpdateUser',query:{id:row.id}})
        },
        handleSizeChange(val) {
          this.listQuery.page = 1;
          this.listQuery.pageSize = val;
          this.getList();
        },
        handleCurrentChange(val) {
          this.listQuery.page= val;
          this.getList();
        }
      }
    }
</script>

<style scoped>

</style>
<style>
  .el-table td, .el-table th {
    padding:  0;
    min-width: 0;
    margin:0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }
  .el-input__inner{
    height:35px;
    margin-right:25px;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-left: 15px;
  }
  .pagination-container{
    position:absolute;
    margin-left:100px;
  }
</style>

