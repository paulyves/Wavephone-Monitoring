<template>
  <div class="Activities">
    <div>
  
      <br />
      <br />
      <br />
    </div>

    <b-container class="containerSyle">
      <b-row align-h="end" class>
        
        <b-col sm="1" class="colColor2">
          <!-- @desc: button of Refresh -->
          <b-button class="btnSyle" @click="btmRefresh">Refresh</b-button>
         
        </b-col>
      </b-row>
    </b-container>
    <b-container class="containerSyle">
      <!-- @desc: call the child Component of "Call" carts graph or BarChat.vue -->
      <Callactivity :callData="getCallArray" :callTime="getCallTime" />
    </b-container>
    <br />
    <b-container class="containerSyle">
      <b-row>
        <b-col class="colColor">
          <!-- @desc: call the child Component of "CPU" carts graph or CPUChart.vue -->
          <CPUactivity :cpuData="getCPUArray" :cpuTime="getCPUTime" :CPUDataVal="CPUDataVal" />
        </b-col>
        <b-col class="colColor1">2</b-col>
        <b-col class="colColor">
          <!-- @desc: call the child Component of "RAM/Memory" carts graph or RamChart.vue -->
          <RamActivity
            :memoryData="getMemoryArray"
            :memoryTime="getMemoryTime"
            :memoryDataVal="memoryDataVal"
          />
        </b-col>
        <b-col class="colColor1">4</b-col>
        <b-col class="colColor">
          <!-- @desc: call the child Component of "Network" carts graph or NetworkChart.vue -->
          <Networkactivity
            :networkData="getNetworkArray"
            :networkTime="getNetworkTime"
            :netDataVal="netDataVal"
          />
        </b-col>
        <b-col class="colColor1">6</b-col>
        <b-col class="colColor">
          <!-- @desc: call the child Component of "Disk" carts graph or DiskChart.vue -->
          <Diskactivity
            :diskData="getDiskArray"
            :diskTime="getDiskTime"
            :diskDataVal="diskDataVal"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Callactivity from "../components/BarChart.vue";
import CPUactivity from "../components/CPUChart.vue";
import RamActivity from "../components/RamChart.vue";
import Networkactivity from "../components/NetworkChart.vue";
import Diskactivity from "../components/DiskChart.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Activities",

  props: ["btnActive", "timeInterval"],

  components: {
    Callactivity,
    CPUactivity,
    RamActivity,
    Networkactivity,
    Diskactivity
  },

  data() {
    return {
      diskDataVal: "",
      memoryDataVal: "",
      CPUDataVal: "",
      netDataVal: "",


      varInterval: ""
    };
  },

  methods: {
    ...mapActions(["callAllDataActivity", "callData"]),

    myTimer() {
      //@desc call the vuex;
      this.callData();
      this.callAllDataActivity();
    },

    btmRefresh() {
      //@desc: All Arrays of "data" graph and "time" is = 0 ;
     
      this.getCallArray.length = 0;
      this.getCallTime.length = 0;

      this.getDiskArray.length = 0;
      this.getDiskTime.length = 0;

      this.getMemoryArray.length = 0;
      this.getMemoryTime.length = 0;

      this.getCPUArray.length = 0;
      this.getCPUTime.length = 0;

      this.getNetworkArray.length = 0;
      this.getNetworkTime.length = 0;

     
    }
  },

  mounted() {

  },

  computed: {
    ...mapGetters([
      "getCallArray",
      "getCallTime",
      "getCPUArray",
      "getCPUTime",
      "getMemoryArray",
      "getMemoryTime",
      "getNetworkArray",
      "getNetworkTime",
      "getDiskArray",
      "getDiskTime"
    ])
  },

  watch: {
    //@desc: btnActive - use for checking, if Activities Tab is 'Active' or not.
    //@return: varInterval = this.varInterval, btnActive - from props, timeInterval - from props
    btnActive: {
      handler: function(activeVal) {
        if (activeVal == true) {
          clearInterval(this.varInterval);
          this.varInterval = setInterval(this.myTimer, this.timeInterval*1000);
        } else {
          clearInterval(this.varInterval);
        }
      }
    },

    timeInterval:{
      handler: function (valData) {
        // console.log(valData, "valData");
       
        //  if (valData != null) {
          clearInterval(this.varInterval);
          this.varInterval = setInterval(this.myTimer, valData*1000);
        //  }
      }
    }
  }
};
</script>

<style scoped>
.marginBtnRefresh {
  padding-left: 0px;
  padding-right: 0px;
  /* border: solid brown 2px; */
}

.allDataColor {
  height: 105vh;
  background-color: #666666;
}

.colDisk1 {
  width: 95%;
}

.btnSyle {
  width: 100%;
}

.containerSyle {
  max-width: 89%;
}

.colColor {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 27%;
  background-color: #4d4d4d;
}

.colColor1 {
  max-width: 1%;
}
.colColor2 {
  padding-left: 0px;
}
</style>