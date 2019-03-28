<template>
    <el-card class="from-container" shadow="never">
      <el-form :model="user" :rules="rules" ref="userFrom" label-width="150px">
        <el-form-item label="Telephone" prop="telephone">
          <el-input v-model="user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="StaffID" prop="staffID">
          <el-input v-model="user.staffid"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('userFrom')">提交</el-button>
          <el-button @click="resetForm('userFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
   const defaultUser={
     telephone:'',
     password:'',
     staffid:''

   };
    export default {
        name: "UserDetail",
      data(){
          return{
            user:Object.assign({},defaultUser),
            rules:{
              telephone:[
                {required:true,message:'电话号码不能为空',trigger:'blur'},
                {type:'string',min:7,trigger:'blur'},
              ],
              password:[
                {required:true,message:'密码不能为空',trigger:'blur'},
                {type:'string',min:6,message:'密码不能小于6位'},
              ],
              staffid:[
                {required:true,message:'工号不能为空',trigger:'blur'},
                {type:'string',min:7,message}
              ]
            }
          }
      }
    }
</script>

<style scoped>

</style>
