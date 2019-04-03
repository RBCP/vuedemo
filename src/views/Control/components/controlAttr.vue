<template>
<div style="margin-top:50px">
  <el-form :model="value"
           ref="controlAttrForm"
           label-width="120px"
           style="width:680px"
           size="small">
    <el-form-item label="Dept Code:" prop="dept" style="width:500px">
      <el-input v-model="value.dept"></el-input>
    </el-form-item>
    <el-form-item label="Location" prop="location">
      <el-transfer
        style="display:inline-block"
        filterable
        :fileter-method="filterMethod"
        filter-placeholder="请输入地址"
        v-model="selectLocation"
        :titles="LocationTitles"
        :data="LocationList">
      </el-transfer>
    </el-form-item>
      <el-form-item label="Rank:">
        <el-transfer
          style="display:inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入级别"
          v-model="selectRank"
          :titles="RankTitles"
          :data="RankList">
        </el-transfer>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button size="medium" @click="handlePrev">上一步，填写权限信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext('controlInfoForm')">下一步</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
  import {fetchLocation,fetchRank} from '@/api/control'
    export default {
        name: "controlAttr",
        props:{
          value:Object,
          isEdit:{
            type:Boolean,
            default:false
          }
        },
      data(){
          return{
            LocationList:[],
            LocationTitles:['待选择','已选择'],
            RankList:[],
            RankTitles:['待选择','已选择']
          };
      },
      created(){
          this.getLocationList();
          this.getRankList();
      },
      computed:{
        selectLocation:{
          get:function(){
            let locations=[];
            if(this.value.locationList==null||this.value.locationList.length<=0){
              return locations;
            }
            for(let i=0;i<this.value.locationList.length;i++){
              locations.push(this.value.locationList[i].locationID);
            }
            return locations;
          },
          set:function(newValue){
            this.value.locationList=[];
            for(let i=0;i<newValue.length;i++){
              this.value.locationList.push({locationID:newValue[i]});
            }
          }
        },
        selectRank:{
          get:function(){
            let ranks=[];
            if(this.value.rankList==null||this.value.rankList.length<=0){
              return ranks;
            }
            for(let i=0;i<this.value.rankList.length;i++){
              ranks.push(this.value.rankList[i].rankID);
            }
            return ranks;
          },
          set:function(newValue){
            this.value.rankList=[];
            for(let i=0;i<newValue;i++){
              this.value.rankList.push({rankID:newValue[i]});
            }
          }
        }
      },
      methods:{
          filterMethod(query,item){
            return item.label.indexOf(query)>-1;
          },
        getLocationList(){
            fetchLocation().then(response=>{
              let list=response.data.data;
              for(let i=0;i<list.length;i++){
                this.LocationList.push({
                  label:list[i].title,
                  key:list[i].id
                });
              }
            });
        },
        getRankList(){
            fetchRank().then(response=>{
              let list=response.data.data;
              for(let i=0;i<list.length;i++){
                this.RankList.push({
                  label:list[i].title,
                  key:list[i].id
                });
              }
            });
        },
        handlePrev(){
            this.$emit('prevStep')
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
