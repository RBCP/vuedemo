<template>
    <div class="app-container">
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
            <span>筛选搜索</span>
            <el-button style="float:right"
            @click="handlerSearchList()"
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
            <el-form-item label="权限ID">
              <el-input style="width:203px" v-model="listQuery.StaffID"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="table-container">
        <el-table
          ref="DataTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          border>
          <el-table-column label="Staff ID" width="100" align="center">
            <template slot-scope="scope">{{scope.row.StaffID}}</template>
          </el-table-column>
          <el-table-column label="Name" width="100" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="Permisson Name" width="150" align="center">
            <template slot-scope="scope">{{scope.row.controlName}}</template>
          </el-table-column>
          <el-table-column label="Permissoon Code" width="150" align="center">
            <template slot-scope="scope">{{scope.row.controlID}}</template>
          </el-table-column>
          <el-table-column label="Add Time" width="120" align="center">
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          border
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,sizes,prev,pager,next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :current-page.sync="listQuery.page"
          :totol="total"></el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ControlUserList",
        data(){
         return{
           total:null,
           list:null,
           listLoading:true,
           listQuery:{
             keyword:null,
             staffID:null,
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

          },
        handleRestSearch(){

        },
        handleRestSearch(){

        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
      }
    }
</script>

<style scoped>

</style>
