<template>
  <div class="Activities">
      <div>
      <NewNavbar :dateToday="dateNow"  :navBarTime="navBarTime" />
      <!-- <NewNavbar :dateToday="dateNow" v-on:callBtn="startOn" :navBarTime="navBarTime" /> -->
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
      <Callactivity @EmitCallData="barData" />
    </b-container>
    <br />
    <b-container class="containerSyle">
      <b-row>
        <b-col class="colColor">
          <CPUactivity @SendDataCPU="CpuData" :CPUDataVal="CPUDataVal" />
        </b-col>
        <b-col class="colColor1">2</b-col>
        <b-col class="colColor">
          <RamActivity @dataSendRam="dataRam" :memoryDataVal="memoryDataVal" />
        </b-col>
        <b-col class="colColor1">4</b-col>
        <b-col class="colColor">
          <Networkactivity @EmitDataNet="NetData" :netDataVal="netDataVal" />
        </b-col>
        <b-col class="colColor1">6</b-col>
        <b-col class="colColor">
          <Diskactivity @emitArrayDisk="DiskData" :diskDataVal="diskDataVal" />
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

      CallData: "",
      dataCPU: "",
      netData: "",
      ramData: "",
      diskDataObj: ""
        }





    },

    methods:{
        ...mapActions(["callAllDataActivity", "callData"]),

    barData(objVal) {
      this.CallData = objVal;
    },

    CpuData(objVal) {
      this.dataCPU = objVal;
    },

    dataRam(objValRam) {
      this.ramData = objValRam;
    },

    NetData(objVal) {
      this.netData = objVal;
    },

    DiskData(objVal) {
      this.diskDataObj = objVal;
    },

    startOn() {
      if (this.setSec == "2s") {
        clearInterval(this.dataVar);
        this.dataVar = setInterval(this.myTimer, 2000);
      }
    },

    myTimer() { 
      this.callData()
      .then(response => {
        if (response) {
          this.dataCall = response;
        }
      });
      // console.log(this.getCallData, "tset")

      var getTime = new Date();
      var amOrPm = getTime.getHours() < 12 ? "AM" : "PM";

      var nowDate =
        getTime.getDate() +
        "-" +
        (getTime.getMonth() + 1) +
        "-" +
        getTime.getFullYear();
      (this.timeToday = getTime),
        (this.dateNow = nowDate),
        (this.SecTIme =
          getTime.getHours() +
          ":" +
          getTime.getMinutes() +
          ":" +
          getTime.getSeconds() +
          " " +
          amOrPm);

      this.callAllDataActivity().then(response => {
        if (response) {
          this.diskDataVal = this.getDataAll.disk;
          this.memoryDataVal = this.getDataAll.memory;
          this.CPUDataVal = this.getDataAll.cpu;
          this.netDataVal = this.getDataAll.network;

          if (this.dataCPU) {
            if (this.dataCPU.SeriesData.length > 20) {
              this.dataCPU.SeriesData.shift(this.dataCPU.SeriesData[0]);
            }
            this.dataCPU.SeriesData.push(this.CPUDataFunc());
          }

          if (this.ramData) {
            if (this.ramData.Searies.length > 20) {
              this.ramData.Searies.shift(this.ramData.Searies[0]);
            }
            this.ramData.Searies.push(this.memoryDataFunc());
          }

          if (this.netData) {
            if (this.netData.Searies.length > 20) {
              this.netData.Searies.shift(this.netData.Searies[0]);
            }

            this.netData.Searies.push(this.Networkfunc());
          }

          if (this.diskDataObj) {
            if (this.diskDataObj.diskArray.length > 20) {
              this.diskDataObj.diskArray.shift(this.diskDataObj.diskArray[0]);
            }
            this.diskDataObj.diskArray.push(this.diskDataFunc());
          }

          if (this.CallData) {
            if (this.CallData.DataCall.length > 20) {
              this.CallData.DataCall.shift(this.CallData.DataCall[0]);
            }

            this.CallData.DataCall.push(this.callDataFunc());
          }
        }
      });

      //
    },

    diskDataFunc() {
      return {
        value: [this.timeToday.getTime(), Math.round(this.diskDataVal)]
      };
    },

    memoryDataFunc() {
      // let now = new Date();
      return {
        value: [this.timeToday.getTime(), Math.round(this.memoryDataVal)]
      };
    },

    CPUDataFunc() {
      return {
        value: [this.timeToday.getTime(), Math.round(this.CPUDataVal)]
      };
    },

    Networkfunc() {
      return {
        value: [this.timeToday.getTime(), Math.round(this.netDataVal)]
      };
    },

    callDataFunc() {
      let value = [Math.random() * 100];
      // console.log(value)
      return {
        value: [this.timeToday.getTime(), Math.round(value)]
      };
    },

    btmRefresh() {
      let SecVal = this.setSec;
      sessionStorage.setItem("saveLoad", SecVal);
      document.location.reload(false);
    },

    myCurrentTime() {
      var getTime = new Date();
      var now = getTime.toLocaleTimeString();
      this.navBarTime = now;
      
    }
    },

    mounted(){
        this.callData().then(response => {
      if (response) {
        this.dataCall = response;
      }
    });

    this.myCurrentTime();
    this.callAllDataActivity();
     this.startOn();
    let loadFunc = sessionStorage.getItem("saveLoad");
      console.log(loadFunc, "loadFunc")
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
    ...mapGetters(["getDataAll", "getCallData"])
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