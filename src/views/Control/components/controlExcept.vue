<template>
  <div style="margin-top:50px ;display:inline">
    <el-form :model="value" ref="controlUserForm" size="small">
      <div class="table-container">
        <div class="button" style="width:4%;float:left;">
          <p><el-button class="el-icon-plus" @click.prevent="dialogFormVisible=true"></el-button></p>
          <p><el-button class="el-icon-minus" @click.prevent="delData2()"></el-button></p>
        </div>
        <el-dialog title="新增加用户":visible.sync="dialogFormVisible">
          <el-form :model="ExceptUser" :rules="rules">
            <el-form-item label="Stafd ID" >
              <el-input v-model="ExceptUser.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="Except()">确定</el-button>
          </div>
        </el-dialog>
        <el-table
          border
          :data="ExceptionList"
          width="100"
          @selection-change='selectRow'
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column label="Staff ID" prop="StaffID">
            <template slot-scope="scope">
              <el-input v-model="scope.row"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form-item style="text-align:center;margin-top:30px">
        <el-button size="medium" @click="handlePrev">上一步，填写权限成员</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "controlExcept",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        dialogFormVisible:false,
        ExceptUser:{
          id:null
        },
        ExceptionList:[],
        selectRowList:[],
        rules:{
          id:[
            {required:true,message:'请输入正确工号',trigger:'blur'},
            {type: 'string', min: 7, message: '工号不能小于7位'},
          ]
        }
      }
    },
    created(){
      this.getExceptionList()
    },
    methods:{
      getExceptionList(){
        this.ExceptionList=this.value.ExceptionID
      },
      selectRow(val){
        this.selectRowList=val;
      },
      Except(){
        this.value.ExceptionID.push(this.ExceptUser.id);
        this.dialogFormVisible=false;
        this.getExceptionList();
      },
      delData2(){
        for(let i=0;i<this.selectRowList.length;i++){
          let val=this.selectRowList[i]
          this.value.ExceptionID.splice(this.value.ExceptionID.findIndex((v,index) => v === val),1)
          this.ExceptionList();
        }
      },
      handlePrev(){
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.$emit('finishCommit',this.isEdit)
      }
    }
  }
</script>

<style scoped>
  .table-container {
    margin-top: 20px;
    width: 300px;
  }
</style>
