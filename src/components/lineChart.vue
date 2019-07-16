<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="line-Layout">
        <el-col :span="10">
          <div id="lineChart" style="width:600px;height:300px"></div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "LineChart",
    mounted(){
      this.drawLine();
    },
    methods:{
      drawLine(){
        var data=[
          {name:'"07-05"',value:["2018-07-05",80]},
          {name:'"07-06"',value:["2018-07-06",90]},
          {name:'"07-07"',value:["2018-07-07",70]},
          {name:'"07-08"',value:["2018-07-08",100]},
          {name:'"07-09"',value:["2018-07-09",120]},
          {name:'"07-10"',value:["2018-07-10",88]},
        ]
        let myChart=this.$echarts.init(document.getElementById("lineChart"));
        myChart.setOption({
          title:{
            text:'用户变化趋势',
            textStyle:{

            }
          },
          lineStyle:{
            color:'#87CEFA'
          },
          xAxis:{
            type:'time',
            name:'日期',
            axisTick:{
              show:true,
              inside:true
            },
            axisLabel:{
              formatter:function(value,index){
                var date=new Date(value);
                var texts=[(date.getMonth()+1),date.getDate()];
                if(index===0){
                  texts.unshift(date.getFullYear())
                }
                return texts.join('-')
              }
            },
            splitLine:{
              show:false,
            }
          },
          yAxis:{
            type:'value',
            name:'人数',
            axisLine:{
              show:false,
            },
            axisTick:{
              show:false
            },
            splitLine:{
              lineStyle: {
                width: 1,
                type:'dashed'
              }

            }

          },
          series:[
            {
              type:'line',
              data:data,
              itemStyle:{
                color:'#A9A9A9'
              }
            }
          ]
        })
      }
    }
  }

</script>

<style scoped>


</style>
