<template>
  <div class="ramChar">
    <div class="ramChart">
      <CPUcharts :option="DataCall" :resizable="true" />
      <br />
      <h4 class="textCol">Memory</h4>
      <h5 class="textCol">{{memoryDataVal}}%</h5>
    </div>
  </div>
</template>

<script>
import CPUcharts from "vue-echarts-v3/src/full.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RamChart",
  props: [ "memoryData", "memoryTime"],

  components: {
    CPUcharts
  },

  computed: {
    ...mapGetters(["getRamData"])
  },

  data() {
    return {
        memoryDataVal: "",
      DataCall: {
        xAxis: {
          type: "category",
          data: this.memoryTime,
          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },

        yAxis: {
          type: "value",
          //  borderColor: "red",
          itemStyle: { borderColor: "red" },
         
          axisLine: {
            lineStyle: { color: "#B1B1B1" }
          }
        },
        series: {
          type: "line",
          data: this.memoryData,
          itemStyle: { color: "#ff7bac" },
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
    ...mapActions(["callRamData"])
  },

  mounted() {},

  watch: {
    //@desc need to get the value of "memoryData" and "memoryTime" Array from the vuex. because the library of vue-echarts-v3 have bug.
    //to Display the value.
    memoryData: {
      handler: function(value) {
        this.DataCall.series.data = value;
        this.memoryDataVal = value.slice(-1)[0];
      }
    },

    memoryTime: {
      handler: function(value) {
        this.DataCall.xAxis.data = value;
      }
    }
  }
};
</script>

<style scoped>
.ramChart {
  width: 90%;
  height: 260px;
  margin-right: 0%;
  margin-left: 5%;
  margin-top: 5%;
  border: #ff7bac solid 2px;
  background-color: #333333;
  /* background-color: #4d4d4d; */
}

.textCol {
  color: white;
}
</style>