<template>
    <div style="margin-top:50px">
      <el-form :model="value" :rules="rules" ref="controlInfoForm" label-width="120px" style="width:600px" size="small">
        <el-form-item label="Right Code" prop="id">
          <el-input v-model="value.id"></el-input>
        </el-form-item>
      <el-form-item label="Right Name" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="Right Description" prop="description">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Author" prop="author">
        <el-input v-model="value.author"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" size="medium" @click="handleNext('controlInfoForm')">Next</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {getControlDetail} from '@/api/control'
    export default {
        name: "controlInfo",
        props: {
          value: Object,
          isEdit: {
            type: Boolean,
            default: false
          }
        },
          data(){
            return{
              hasEditCreated:false,
              rules:{
                name:[
                  {required:true,message:'请输入权限名',trigger:'blur'}
                ],
                description:[
                  {required:true,message:'请输入权限的描述',trigger:'blur'}
                ]
              }
            };
          },
         created(){
          this.getControlList();
         },
      computed:{
          controlId(){
            return this.value.id;
          }
      },
      watch:{
          controlId:function(newValue){
            if(!this.isEdit) return;
            if(this.hasEditCreated) return ;
            if(newValue===undefined||newValue==null||newValue===0) return;
            this.handleEditCreated();
          }
      },
      methods:{
          handleEditCreated(){

          },
        getControlList(){

        },
        handleNext(formName){
            this.$refs[formName].validate((valid)=>{
              if(valid){
                this.$emit('nextStep');
              }else{
                this.$message({
                  message:'验证失败',
                  type:'error',
                  duration:1000
                });
                return false;
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
