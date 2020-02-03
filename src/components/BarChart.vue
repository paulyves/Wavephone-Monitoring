<template>
  <div class="barSize">
   

    <Callcharts :option="BarData" :resizable="true" />
  </div>
</template>

<script>
import Callcharts from "vue-echarts-v3/src/full.js";
export default {
  props: ["SecTIme"],

  data() {
    return {
      
      

      changeSecond: [
       
        { item: "2s", name: "2s" },
        { item: "5s", name: "5s" },
        { item: "10s", name: "10s" },
        { item: "30s", name: "30s" },
        { item: "60s", name: "60s" }
      ],

      BarData: {
        title: {
          text: "Calls"
        },

        dataZoom: [
          {
           
          },
          
        ],

        yAxis: {
        //   type: "value"
        },

        xAxis: {
          type: "time",

          data: [],
          boundaryGap: false
        },

        series: {
          smooth: true,
          data: [],
          type: "line",
          areaStyle: {}
        }
      }
    };
  },

  methods: {
    sendData() {
      let CallData = {
        DataCall: this.BarData.series.data
      };
      this.$emit("EmitCallData", CallData);
    },

   
  },

  mounted() {
    this.sendData();
    
  },

  created() {},

  watch: {},

  components: {
    Callcharts
  }
};
</script>

<style>
.barSize {
  height: 400px;
  width: 100%;
  background-color: white;
  padding-left: 0px;
  padding-right: 0px;
}
.testWidth {
  width: 100%;
}

.borderCol {
  border: green solid 2px;
}

.Callcharts {
  width: 100%;
  height: 100%;
}
</style>