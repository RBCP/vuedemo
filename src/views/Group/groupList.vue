<template>
  <div class="app-container">
    <div style="margin-top:15px">
      <el-form :inline="true" ref="listQuery" :model="listquery"  label-width="200px">
        <el-input style="width:100px" v-model="listquery.keyword" placeholder="Staff ID"></el-input>
        <el-button type="primary" @click="SearchRoom()" size="mini">Search</el-button>
        <el-button type="primary" @click="AddRoom()" size="mini">Create Room</el-button>
      </el-form>
    </div>
    <div class="table-container">
      <el-table  style="text-align:center"
                 :data="list"
                 border
                 v-loading="listLoading"
                 width="700">
        <el-table-column
          prop="groupName"
          label="Group Name"
          width="150">
          <template slot-scope="scope">
            {{scope.row.roomName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="200">
          <template slot-scope="scope">
            {{scope.row.description}}
          </template>
        </el-table-column>
        <el-table-column
          prop="adminID"
          label="Admin Staff ID"
          width="150">
          <template slot-scope="scope">
            {{scope.row.admin}}
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
          prop="createTime"
          label="Creation Time"
          width="120">
          <template slot-scope="scope">
            {{scope.row.creatTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="Action">
          <template slot-scope="scope">
            <el-button @click.native.prevent="Delete(scope.$index,scope.row)" type="text" size="small">Delete</el-button>
            <el-button @click.native.prevent="showChatLog(scope.$index,scope.row)" type="text" size="small">Detail</el-button>
            <el-button @click.native.prevent="ShowMembers(scope.$index,scope.row)" type="text" size="small">Participants</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="margin-left:100px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total,sizes,prev,pager,next,jumper"
        :page-size="listquery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listquery.page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getGroupList} from "@/api/groupList";

  export default {
        name: "groupList",
        data(){
          return {
            list:null,
            total:null,
            listLoading:true,
            listquery:{
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
              getGroupList(this.listquery).then(response=>{
                this.list=response.data.data.items;
                this.total=response.data.data.count;
                this.listLoading=false
              }).catch(()=>{
                console.log("请求失败")
                this.listLoading=false
              })
            },
        /*SearchRoom(){
          this.$router.push({'/Chat_log/group_chat_log',query:{GroupID:row}})
        },*/
        AddRoom(){
          this.$router.push({path:'/Group/CreateGroup'})
        },
       showChatLog(index,row){
        this.$router.push({path:'/Chat_log/group_Chat_log',query:{'GroupID':row.id}});
       },
        ShowMembers(index,row){
          this.$router.push({path:'/Group/Participants',query:{'GroupID':row.id}});
        },
        handleSizeChange(val) {
          this.listquery.page = 1;
          this.listquery.pageSize = val;
          this.getList();
        },
        handleCurrentChange(val) {
          this.listquery.page= val;
          this.getList();
        },
      }
    }
</script>

<style scoped>

</style>
<style>
  .el-table td, .el-table th {
    padding: 4px 0;
    min-width: 0;
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
