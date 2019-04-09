<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="margin-top:30px">
      <el-form :model="listQuery" :inline="true" size="small" ref="GroupchatForm" :rules="rules">
        <el-form-item label="群组ID" prop="GroupID">
          <el-input style="width:203px" v-model="listQuery.GroupID" placeholder="请输入房间ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleMessage('GroupchatForm')">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="table-container">
      <el-table
        border
        :data="list"
        v-loading="listLoading"
        width="100%">
        <el-table-column label="Group ID" width="200">
          <template slot-scope="scope">
            {{scope.row.GroupID}}
          </template>
        </el-table-column>
        <el-table-column label="Group Name" width="150">
          <template slot-scope="scope">
            {{scope.row.GroupName}}
          </template>
        </el-table-column>
        <el-table-column label="Senders Staff ID" width="150">
          <template slot-scope="scope">
            {{scope.row.senderID}}
          </template>
        </el-table-column>
        <el-table-column label="Sender Name" width="150">
          <template slot-scope="scope">
            {{scope.row.senderName}}
          </template>
        </el-table-column>
        <el-table-column label="Send Time" :show-overflow-tooltip="true" width="150">
          <template slot-scope="scope">
            {{scope.row.sendtime}}
          </template>
        </el-table-column>
        <el-table-column label="Content" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.content}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="position:absolute;margin-left:100px">
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
  import {getGroupChatLogs} from '@/api/message';
  export default {
    name: "GroupChatLog",
    data() {
      return {
        total: null,
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          pageSize: 10,
          GroupID:null
        },
        rules:{
          GroupID:[
            {required:'true',message:'群组的ID不能为空',trigger:'blur'}
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        console.log(this.$route.query)
        if(this.$route.query.GroupID)
          this.listQuery.GroupID=this.$route.query.GroupID
        this.listLoading = false;
        getGroupChatLogs(this.listQuery).then(response => {
          this.list = response.data.data;
          this.total = response.data.count;
        })
      },
      handleMessage(formName) {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSizeChange(val){
        this.listQuery.page=1;
        this.listQuery.pageSize=val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page=val;
        this.getList();
      }
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
    text-align: center;
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
</style>
