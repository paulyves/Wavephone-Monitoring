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
      // @desc:
      //  btmRefresh is method for 'Refresh' button of Activities tab, When you Click Refresh,
      // the Current "timeInterval" will save into "sessionStorage", to avoid Refresh "timeInterval"

      //@param:
      // "SecVal" - the value of timeInterval from the dropdown list of Navbar;
      let SecVal = this.timeInterval;
      sessionStorage.setItem("saveLoad", SecVal);
      document.location.reload(false);
    }
  },

  mounted() {

    //@desc: if the loadFunc have item inside 'essionStorage.getItem("saveLoad");', 
    // it will run condition statement, if not. it will not run the condition statement.

    //@param: loadFunc - value of "getItem" from the session
    let loadFunc = sessionStorage.getItem("saveLoad");
    if (loadFunc != null) {
      sessionStorage.removeItem("saveLoad");
      if (loadFunc == "2s") {
        this.setSec = "2s";
        this.startOn();
      }
      if (loadFunc == "5s") {
        this.setSec = "5s";
      }
      if (loadFunc == "10s") {
        this.setSec = "10s";
      }
      if (loadFunc == "30s") {
        this.setSec = "30s";
      }
      if (loadFunc == "60s") {
        this.setSec = "60s";
      }
    }

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
    //@param: btnActive - from props.
    //@return: varInterval = this.varInterval.
    btnActive: {
      handler: function(activeVal) {
        if (activeVal == true) {
          if (this.timeInterval == 2) {
            this.varInterval = setInterval(this.myTimer, 2000);
            // console.log("2 watch");
          } else if (this.timeInterval == 5) {
            this.varInterval = setInterval(this.myTimer, 5000);
            // console.log("5 watch ");
          } else if (this.timeInterval == 10) {
            this.varInterval = setInterval(this.myTimer, 10000);
            // console.log("10 watch ");
          } else if (this.varInterval == 30) {
            this.varInterval = setInterval(this.myTimer, 30000);
            // console.log("30 watch ");
          } else if (this.varInterval == 60) {
            this.varInterval = setInterval(this.myTimer, 60000);
            // console.log("60 watch ");
          }
        } else {
          clearInterval(this.varInterval);
        }
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