<template>
  <div class="barSize">
    <Callcharts :option="BarData" :resizable="true" />
  </div>
</template>

<script>
import Callcharts from "vue-echarts-v3/src/full.js";
export default {
  props: ["SecTIme", "callData", "callTime"],

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
            type: "slider",

            // start: 100,
            // end: 50
          }
        ],

        yAxis: {
          //   type: "value"
        },

        xAxis: {
          type: "category",
          data: this.callTime,
          boundaryGap: false
        },

        series: {
          smooth: true,
          data: this.callData,
          type: "line",
          areaStyle: {}
        }
      }
    };
  },

  methods: {},

  mounted() {},

  created() {},

  watch: {
    //@desc need to get the value of "callData" and "callTime" Array from the vuex. because the library of vue-echarts-v3 have bug.
    //to Display the value.
    callData: {
      handler: function(value) {
        this.BarData.series.data = value;
      }
    },

    callTime: {
      handler: function(value) {
        this.BarData.xAxis.data = value;
      }
    }
  },

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