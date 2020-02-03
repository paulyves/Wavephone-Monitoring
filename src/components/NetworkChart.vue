<template>
  <div class="dataNetwork">
    <NetworkChart :option="NetworkData" :resizable="true" />
    <br />
    <h4 class="textCol">Network</h4>
    <h5 class="textCol">{{netDataVal}}%</h5>
  </div>
</template>

<script>
import NetworkChart from "vue-echarts-v3/src/full.js";

export default {
  name: "NetworkCharts",
  props: ["netDataVal"],
  data() {
    return {
      NetworkData: {
        xAxis: {
          type: "time",
          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },
        yAxis: {
          type: "value",

          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },
        series: {
          type: "line",
          data: [],
          itemStyle: { color: "#3ab54a" },
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
    NetData() {
      let DataNet = {
        Searies: this.NetworkData.series.data
      };
      this.$emit("EmitDataNet", DataNet);
    }
  },

  components: {
    NetworkChart
  },

  mounted() {
    this.NetData();
  }
};
</script>

<style scoped>
.dataNetwork {
  width: 90%;
  height: 260px;
  margin-right: 0%;
  margin-left: 5%;
  margin-top: 5%;
  border: #3ab54a solid 2px;
  background-color: #333333;
}

.textCol {
  color: white;
}
</style>