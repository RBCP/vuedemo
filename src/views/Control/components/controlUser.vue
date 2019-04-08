<template>
  <div style="margin-top:50px">
    <el-form :model="value" ref="controlUserForm" size="small">
      <div class="table-container">
        <div class="button" style="width:4%;float:left;">
          <p><el-button class="el-icon-plus" @click.prevent="dialogFormVisible=true"></el-button></p>
          <p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>
        </div>
        <el-dialog title="新增加用户":visible.sync="dialogFormVisible">
          <el-form :model="AddUser" :rules="rules">
            <el-form-item label="Stafd ID" >
              <el-input v-model="AddUser.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="add()">确定</el-button>
          </div>
        </el-dialog>
        <el-table
          border
          :data="UserList"
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
      <el-form-item style="text-align:center">
        <el-button size="medium" @click="handlePrev">上一步，填写权限属性</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "controlUser",
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
        AddUser:{
          id:''
        },
        ExceptUser:{
          id:''
        },
        UserList:[],
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
      this.getUserList();
      this.UserList=this.value.StaffID;
      console.log(this.UserList);
      console.log("hello")
    },
    methods:{
      getUserList(){
        this.UserList=this.value.StaffID;
      },
      selectRow(val){
        this.selectRowList=val;
      },
      add(){
        this.value.StaffID.push(this.AddUser.id);
        this.dialogFormVisible=false;
        this.getUserList();
      },
      delData(){
        for(let i=0;i<this.selectRowList.length;i++){
          let val=this.selectRowList[i]
          this.value.StaffID.splice(this.value.StaffID.findIndex((v,index) => v === val),1)
          this.getUserList();
        }
      },
      handlePrev(){
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep');
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
