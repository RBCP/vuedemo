<template>
  <div class="app-container">
    <div style="margin-top:15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
      </el-form>
    </div>
    <div class="table-container" style="width:1200px">
      <el-table v-loading="listLoading"
                ref="controlTable"
                :data="list"
                border>
        <el-table-column
          prop="id"
          label="Permission code"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateControl(scope.$index,scope.row)"> {{scope.row.id}}</el-button>
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
        <el-table-column :show-overflow-tooltip="true"
          prop="description"
          label="Description"
          width="150">
          <template slot-scope="scope">
            {{scope.row.description}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="Creation Time"
          width="150">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="Admin"
          width="150">
          <template slot-scope="scope">
            {{scope.row.admin}}
          </template>
        </el-table-column>
        <el-table-column
        prop="location"
        label="Location"
        width="150">
          <template slot-scope="scope">
            {{scope.row.location}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" type="text">Delete</el-button>
            <el-button size="mini" type="text">Show Member</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="margin-left:350px">
      <el-pagination
        border
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
  import {getControlList} from '@/api/control'
    export default {
      name: "controlist",
      data() {
        return {
          list: null,
          total: null,
          listLoading: true,
          listQuery: {
            page: 1,
            pageSize: 10
          }
        }
      },
      created() {
        this.getList()
      },
      methods: {
        getList() {
          this.listLoading = true
          getControlList(this.listQuery).then(response => {
            this.list = response.data.data.items
            this.total = response.data.data.count
            this.listLoading = false
          })
        },
        handleSizeChange(val) {
          this.listQuery.page = 1;
          this.listQuery.pageSize = val;
          this.getList();
        },
        handleCurrentChange(val) {
          this.listQuery.page = val;
          this.getList();
        },
        updateControl(index,row){
          this.$router.push({path:'/Control/updateControl',query:{id:row.id}})
        }
      }
    }

</script>

<style scoped>
.el-table{
  text-align: center!important;
}
</style>
