<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写权限信息"></el-step>
      <el-step title="填写权限属性"></el-step>
      <el-step title="填写权限成员"></el-step>
      <el-step title="填写权限排除人员"></el-step>
    </el-steps>
    <control-info v-show="showStatus[0]"
                  v-model="controlParam"
                  :is-edit="isEdit"
                  @nextStep="nextStep">
    </control-info>
    <control-attr
      v-show="showStatus[1]"
      v-model="controlParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </control-attr>
    <control-user
      v-show="showStatus[2]"
      :is-edit="isEdit"
      v-model="controlParam"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </control-user>
    <control-except
      v-show="showStatus[3]"
      :is-edit="isEdit"
      v-model="controlParam"
      @prevStep="prevStep"
      @finshCommit="finishCommit">
    </control-except>
  </el-card>
</template>

<script>
  import ControlInfo from './controlInfo';
  import ControlAttr from './controlAttr';
  import ControlUser from './controlUser';
  import ControlExcept from './controlExcept'
  import {getControlDetail,updateControl,createControl} from '@/api/control'
const defaultControlParam={
  id:null,
  name:'',
  description:'',
  dept:'',
  author:'',
  locationList:[],
  rankList:[],
  StaffID:[],
  ExceptionID:[]
}
    export default {
        name: "ControlDetail",
        components:{ControlInfo,ControlAttr,ControlUser,ControlExcept},
        props:{
          isEdit: {
            type: Boolean,
            default: false
          }
        },
      data(){
          return{
            active:0,
            controlParam:Object.assign({},defaultControlParam),
            showStatus:[true,false,false,false],
          }
      },
      created(){
          if(this.isEdit){
            getControlDetail(this.$route.query).then(response=>{
              this.controlParam=response.data.data;
            });
          }
      },
      methods:{
          hideAll(){
            for(let i=0;i<this.showStatus.length;i++){
              this.showStatus[i]=false;
            }
          },
        prevStep(){
            if(this.active>0 && this.active<this.showStatus.length){
              this.active--;
              this.hideAll();
              this.showStatus[this.active]=true;
            }
        },
        nextStep(){
            if(this.active<this.showStatus.length-1){
              this.active++;
              this.hideAll();
              this.showStatus[this.active]=true;
            }
        },
        finishCommit(isEdit){
            this.$confirm('是否要提交产品','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'waring'
            }).then(()=>{
              if(isEdit){
                updateControl(this.$route.query,this.controlParam).then(response=>{
                  this.$message({
                    type:'success',
                    message:'提交成功',
                    duration:1000
                  });
                  this.$router.back();
                });
              }else{
                createControl(this.controlParam).then(response=>{
                  this.$message({
                    type:'success',
                    message:'提交成功',
                    duration:1000
                  });
                  location.reload();
                })
              }
            })
        }
      }
    }
</script>
<style scoped>

</style>
