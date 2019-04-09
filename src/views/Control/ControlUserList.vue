<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right"
                   @click="handleSearchList()"
                   type="primary"
                   size="small">
          查询结果
        </el-button>
        <el-button
          style="float:right;margin-right:15px"
          @click="handleRestSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top:15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索">
            <el-input style="width:203px" v-model="listQuery.keyword" placeholder="输入工号"></el-input>
          </el-form-item>
          <el-form-item label="权限代码">
            <el-input style="width:203px" v-model="listQuery.controlID" placeholder="输入权限代码"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="DataTable"
        :data="list"
        style="width:85%"
        v-loading="listLoading"
        border>
        <el-table-column label="Staff ID" width="120" align="center">
          <template slot-scope="scope">{{scope.row.StaffID}}</template>
        </el-table-column>
        <el-table-column label="Name" width="150" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="Permisson Name" width="200" align="center">
          <template slot-scope="scope">{{scope.row.controlName}}</template>
        </el-table-column>
        <el-table-column label="Permissoon Code" width="200" align="center">
          <template slot-scope="scope">{{scope.row.controlID}}</template>
        </el-table-column>
        <el-table-column label="Add Time"  align="center">
          <template slot-scope="scope">{{scope.row.time}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="position:absolute;margin-left:100px;">
      <el-pagination
        border
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total,sizes,prev,pager,next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.page"
        :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import {getroleList} from '@/api/control'
  export default {
    name: "ControlUserList",
    data(){
      return{
        total:null,
        list:null,
        listLoading:false,
        listQuery:{
          keyword:null,
          controlID:null,
          page:1,
          pageSize:10,
        }
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        getroleList(this.listQuery).then(response=>{
          this.listLoading=false;
          this.list=response.data.data;
          this.total=response.data.count;
        });
      },
      handleSearchList(){
        this.listQuery.page=1;
        this.listLoading=true;
        this.getList();
      },
      handleRestSearch(){
      },
      handleSizeChange(val){
        this.listQuery.page=1;
        this.listQuery.pageSize=val;
        this.getList()
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
  </style>
