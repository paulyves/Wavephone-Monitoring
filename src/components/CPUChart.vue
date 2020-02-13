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
  props: ["cpuData", "cpuTime"],

  components: {
    CPUcharts
  },

  data() {
    return {
      CPUDataVal: "",
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
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#B1B1B1"
            }
          },
          data: this.cpuTime
        },

        series: {
          type: "line",
          smooth: true,
          data: this.cpuData,
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

  methods: {},

  mounted() {},

  watch: {
    cpuData: {
      handler: function(value) {
        this.CPUdata.series.data = value;
        this.CPUDataVal = value.slice(-1)[0];
      }
    },

    cpuTime: {
      handler: function(value) {
        this.CPUdata.xAxis.data = value;
      }
    }
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