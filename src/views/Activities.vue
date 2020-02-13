<template>
  <div class="Activities">
      <div>
      <NewNavbar :dateToday="dateNow"  :navBarTime="navBarTime" />
     
      <br />
      <br />
      <br />
    </div>

    <b-container class="containerSyle">
      <b-row align-h="end" class>
        <b-col sm="1" class="colDisk1 text-xs-center marginBtnRefresh">
          <b-button class="btnSyle" @click="btmRefresh">Refresh</b-button>
        </b-col>
        <b-col sm="1" class="colColor2">
          <b-form-select
            class
            v-model="setSec"
            :options="changeSecond"
            value-field="item"
            text-field="name"
          ></b-form-select>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="containerSyle">
      <Callactivity :callData = "getCallArray" :callTime = "getCallTime" />
    </b-container>
    <br />
    <b-container class="containerSyle">
      <b-row>
        <b-col class="colColor">
          <CPUactivity  :cpuData = "getCPUArray" :cpuTime = "getCPUTime" :CPUDataVal="CPUDataVal" />
        </b-col>
        <b-col class="colColor1">2</b-col>
        <b-col class="colColor">
          <RamActivity :memoryData = "getMemoryArray" :memoryTime = "getMemoryTime" :memoryDataVal="memoryDataVal" />
        </b-col>
        <b-col class="colColor1">4</b-col>
        <b-col class="colColor">
          <Networkactivity :networkData = "getNetworkArray" :networkTime = "getNetworkTime" :netDataVal="netDataVal" />
        </b-col>
        <b-col class="colColor1">6</b-col>
        <b-col class="colColor">
          <Diskactivity :diskData = "getDiskArray" :diskTime = "getDiskTime" :diskDataVal="diskDataVal" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import Callactivity from "../components/BarChart.vue";
import Callactivity from "../components/BarChart.vue";
import CPUactivity from "../components/CPUChart.vue";
import RamActivity from "../components/RamChart.vue";
import Networkactivity from "../components/NetworkChart.vue";
import Diskactivity from "../components/DiskChart.vue";
import NewNavbar from "../components/Navbar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    name:'Activities',

     components: {
    Callactivity,
    CPUactivity,
    RamActivity,
    Networkactivity,
    Diskactivity,
    NewNavbar
  },

    data(){
        return{
            dataCall: "",
      navBarTime: "",
      SecTIme: "",

      diskDataVal: "",
      memoryDataVal: "",
      CPUDataVal: "",
      netDataVal: "",

      setSec: "2s",

      changeSecond: [
        { item: "2s", name: "2s" },
        { item: "5s", name: "5s" },
        { item: "10s", name: "10s" },
        { item: "30s", name: "30s" },
        { item: "60s", name: "60s" }
      ],

      dateNow: "",
      dataVar: "",
      timeToday: "",

      
    
        }





    },

    methods:{
        ...mapActions(["callAllDataActivity", "callData"]),


  

    startOn() {
      if (this.setSec == "2s") {
        clearInterval(this.dataVar);
        this.dataVar = setInterval(this.myTimer, 2000);
      }
    },

    myTimer() { 
      this.callData()
      this.callAllDataActivity()
    },

  

    btmRefresh() {
      let SecVal = this.setSec;
      sessionStorage.setItem("saveLoad", SecVal);
      document.location.reload(false);
    },

   
    },

    mounted(){
     
     this.startOn();
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
    ...mapGetters(["getCallArray", "getCallTime", "getCPUArray", "getCPUTime",
    "getMemoryArray", "getMemoryTime", "getNetworkArray", "getNetworkTime", "getDiskArray",
    "getDiskTime"])
  },


  watch: {
    setSec: {
      handler: function(objVal) {
        if (objVal == "2s") {
          clearInterval(this.dataVar);
          this.dataVar = setInterval(this.myTimer, 2000);
        }
        if (objVal == "5s") {
          clearInterval(this.dataVar);
          console.log("tests Watch")
          this.dataVar = setInterval(this.myTimer, 5000);
        }
        if (objVal == "10s") {
          clearInterval(this.dataVar);

          this.dataVar = setInterval(this.myTimer, 10000);
        }

        if (objVal == "30s") {
          clearInterval(this.dataVar);

          this.dataVar = setInterval(this.myTimer, 30000);
        }

        if (objVal == "60s") {
          clearInterval(this.dataVar);

          this.dataVar = setInterval(this.myTimer, 60000);
        }
      }
    }
  },

  beforeDestroy(){
    clearInterval(this.dataVar);
  }


}
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