<template>
    <div class="app-container">
      <el-card class="filter-container" shadow="never" style="margin-top:30px">
        <el-form :model="listQuery" :inline="true" size="small" ref="manualForm" :rules="rules" label-width="120px">
          <el-form-item label="添加的用户" prop="StaffID">
            <el-input style="width:203px" v-model="listQuery.StaffID" placeholder="请输入工号">
            </el-input>
          </el-form-item>
          <el-form-item label="添加的权限" prop="PermissionID">
            <el-input style="width:203px" v-model="listQuery.PermissionID" placeholder="请输入权限代码">
            </el-input>
          </el-form-item>
          <el-button type="primary"  @click="handleSubmit('manualForm')">添加</el-button>
        </el-form>
      </el-card>
      <div class="table-container">
        <el-table
          border
          width="80%"
          :data="list"
          v-loading="listLoading">
          <el-table-column label="Permission Code">
            <template slot-scope="scope">
              {{scope.row.permissionID}}
            </template>
          </el-table-column>
          <el-table-column label="Permission Name">
            <template slot-scope="scope">
              {{scope.row.permissionName}}
            </template>
          </el-table-column>
          <el-table-column label="Staff ID">
            <template slot-scope="scope">
              {{scope.row.StaffID}}
            </template>
          </el-table-column>
          <el-table-column label="Staff Name">
            <template slot-scope="scope">
              {{scope.row.Name}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import {addPermission,getManualList} from "../../api/control";

  export default {
        name: "ManualControl",
        data(){
          return {
            list:[],
            listLoading:false,
            listQuery:{
              StaffID:null,
              PermissionID:null
            },
            rules:{
              StaffID:[
                {required:true,message:'工号不能为空',trigger:'blur'},
                {type:'string',min:7,trigger:'blur'}
              ],
              PermissionID:[
                {required:true,message:'权限代码不能为空',trigger:'blur'},
              ]
            }
          }
        },
      methods:{
          handleSubmit(formName){
            this.$confirm('是否提交','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              addPermission(this.listQuery).then(response=>{
                this.$message({
                  type:'success',
                  message:'提交成功',
                  duration:1000
                });
              })
              this.getList();
            });
          },
        getList(){
            getManualList(this.listQuery).then(response=>{
              this.list.push(response.data.data)
              console.log(this.list);
            })
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
