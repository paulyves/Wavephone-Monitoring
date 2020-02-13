<template>
  <div class="diskchartdata">
    <div class="DiskBorder">
      <DiskChart :option="DiskData" :resizable="true" />
      <br />
      <h4 class="textCol">Disk</h4>
      <h5 class="textCol">{{diskDataVal}}%</h5>
    </div>
  </div>
</template>

<script>
import DiskChart from "vue-echarts-v3/src/full.js";
export default {
  name: "diskchartdata",
  props: [ "diskData", "diskTime"],

  components: {
    DiskChart
  },
  data() {
    return {
      diskDataVal: "",
      DiskData: {
        yAxis: {
          type: "value",

          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },
        xAxis: {
          type: "category",
          data: this.diskTime,
          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },
        series: {
          type: "line",
          data: this.diskData,
          itemStyle: { color: "#fbb03b" },
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
    diskData: {
      handler: function(value) {
        this.DiskData.series.data = value;
        this.diskDataVal = value.slice(-1)[0];
      }
    },

    diskTime: {
      handler: function(value) {
        this.DiskData.xAxis.data = value;
      }
    }
  }
};
</script>

<style scoped>
.diskchartdata {
  width: 96%;
  height: 400px;
  background-color: #4d4d4d;
}

.DiskBorder {
  width: 90%;
  height: 260px;
  margin-right: 0%;
  margin-left: 5%;
  margin-top: 5%;
  border: #fbb03b solid 2px;
  background-color: #333333;
}

.textCol {
  color: white;
}
</style>