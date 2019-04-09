<template>
  <el-card class="from-container" shadow="never">
    <el-form :model="group" :rules="rules" ref="groupFrom" label-width="150px">
      <el-form-item label="GroupName" prop="name">
        <el-input v-model="group.name"></el-input>
      </el-form-item>
      <el-form-item label="Group Description" prop="des">
        <el-input v-model="group.des"></el-input>
      </el-form-item>
      <el-form-item label="Group Theme" prop="theme">
        <el-input v-model="group.theme"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('groupFrom')">提交</el-button>
        <el-button @click="resetForm('groupFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createGroup} from '@/api/groupList'
  const  defaultGroup={
    name:'',
    des:'',
    theme:''
  };
    export default {
        name: "CreateGroup",
        data(){
          return {
            group:Object.assign({},defaultGroup),
            rules:{
              name:[{required:true,message:'群组名不能为空',trigger:blur,type:'string'}],
              des:[{required:true,message:'群描述不能为',trigger:blur,type:'string'}],
              theme:[{required:true,message:'群主题不能为空',trigger:blur,type:'string'}]
            }
          }
        },
      created(){
          this.group=Object.assign({},defaultGroup);
      },
      methods:{
        onSubmit(fromName){
          console.log("正在提交");
          this.$refs[fromName].validate(valid=>{
            if(valid) {
              this.$confirm('是否提交数据', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'waring'
              }).then(() => {
                createGroup(this.group).then(response => {
                  this.$refs[fromName].resetFields();
                  this.group = Object.assign({}, defaultGroup);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  })
                });
              });
            }
          })
        },
        resetForm(fromName){
          this.$refs[fromName].resetFields();
          this.group=Object.assign({},defaultGroup);
        }
      }
    }
</script>

<style scoped>

</style>
<style>
  .el-form-item{
    width:600px;
  }
</style>
