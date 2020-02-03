<template>
  <div class="CPUchart">
    <CPUcharts :option="CPUdata" :resizable="true" />

    <br />
    <h4 class="textCol">CPU</h4>
    <h5 class="textCol">{{CPUDataVal}}%</h5>
  </div>
</template>

<script>
import CPUcharts from "vue-echarts-v3/src/full.js";
export default {
  name: "CPUChart",
  props: ["CallCPUchart", "CPUDataVal"],

  data() {
    return {
      value: [],
      CPUtext: "hello",
      CPUdata: {
        yAxis: {
            type: "value",
          lineStyle: { color: "#29aae2" },
          axisLine: {
            lineStyle: {
              color: "#B1B1B1"
            }
          },

          axisTick: {
            lineStyle: { color: "B1B1B1" }
          }
        },
        xAxis: {
          type: "time",
          axisLine: {
            lineStyle: {
              color: "#B1B1B1"
            }
          }
        },

        series: {
          type: "line",
          smooth: true,
          data: [],
          itemStyle: { color: "#29aae2" },
          label: {
            normal: {
              show: true,
              color: "yellow",
              position: "top"
            }
          }
        }
      }
    };
  },

  methods: {
    SendData() {
      let DataCPU = {
        YaxisData: this.CPUdata.xAxis,
        SeriesData: this.CPUdata.series.data,
        data: this.CPUdata.yAxis.type
      };
      this.$emit("SendDataCPU", DataCPU);
    }
  },

  mounted() {
    this.SendData();
  },

  components: {
    CPUcharts
  }
};
</script>

<style scoped>
.CPUchart {
  width: 90%;
  height: 260px;
  margin-right: 0%;
  margin-left: 5%;
  margin-top: 5%;
  border: #28abe3 solid 2px;

  background-color: #333333;
}
.cpUBorder {
  border: solid blue 2px;
  margin-top: 5%;
  margin-right: 5%;
  margin-left: 5%;
}

.textCol {
  color: white;
}
</style>