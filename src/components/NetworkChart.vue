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
  props: [ "networkData", "networkTime"],
  data() {
    return {
      netDataVal: "",
      NetworkData: {
        xAxis: {
          type: "category",
          data: this.networkTime,
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
          data: this.networkData,
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

  methods: {},

  components: {
    NetworkChart
  },

  mounted() {},

  watch: {
    //@desc need to get the value of "networkData" and "networkTime" Array from the vuex. because the library of vue-echarts-v3 have bug.
    //to Display the value.
    networkData: {
      handler: function(value) {
        this.NetworkData.series.data = value;
        this.netDataVal = value.slice(-1)[0];
      }
    },

    networkTime: {
      handler: function(value) {
        this.NetworkData.xAxis.data = value;
      }
    }
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