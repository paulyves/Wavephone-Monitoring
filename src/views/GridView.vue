<template>
  <div class="gridView">
    <Navbar v-on:waveSearch="btnWave"  v-on:pickTime="setDataInterval" />
    <dataTable />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "../components/Navbar";
import dataTable from "../components/dataTable";
export default {
  name: "gridView",
  components: {
    Navbar,
    dataTable
  },
  data() {
    return {
      arraydata: [],
      listExt: "",
      selectedExt: "",
      selectedWaveNum: "",
      timeInterval: "2",
      timeData: "",
      searchNum: "",
      num: "",
      waveData: []
    };
  },
  created() {
    if (this.timeInterval == 2) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 2000);
      console.log(this.timeInterval);
    }
    if (this.timeInterval == 5) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 5000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 10) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 10000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 20) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 20000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 0) {
      clearInterval(this.timeInterval);
    }
  },
  mounted() {
    this.myData();
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"])
  },
  methods: {
    ...mapActions(["displaySample"]),
setDataInterval(val){
  this.timeInterval = val
  if (this.timeInterval == 2) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 2000);
      console.log(this.timeInterval);
    }
    if (this.timeInterval == 5) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 5000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 10) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 10000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 20) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 20000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 0) {
      clearInterval(this.timeInterval);
    }
},
    btnWave(numWave) {
      this.displaySample().then(response => {
        for (let wave in response) {
          let newWave = Math.floor(numWave / 100 - 10000);
          let cell = document.getElementsByClassName(wave)[0];
          let cell1 = document.getElementsByClassName("rows-ruler")[newWave];
          let cell2 = cell.cellIndex;
          // let newVal = this.arraydata[0];
          // let newArr = this.waveData[0];
          let waveString = numWave.substring(5);
          // let waveNumbers = wave.substring(5);
          let cellXruler = document.getElementsByClassName("ruler")[
            waveString * 1
          ];
          // let dataCell = document.getElementsByClassName("ruler")[newVal * 1];
          // let dataRow = document.getElementsByClassName("rows-ruler")[
          //   Math.floor(newArr / 100 - 10000)
          // ];
          let dataTag = document.getElementsByClassName("tr-colors")[newWave];
          let dataTr = document.getElementsByClassName("tr-colors");
console.log(wave, response[wave], numWave);
          
          if (numWave == wave) {
            this.waveData.push(wave);
            cell.classList.add("highlight");
            cell1.classList.add("arrowImg");
            dataTag.classList.add("horizontal-border");
            cellXruler.classList.add("border-color");
            cell.scrollIntoView();
            for(let tr in dataTr){
            dataTr[tr].cells[cell2].classList.add("border-color");
          }      
        }else{
          cell.classList.remove("highlight");
        }

        
        }
      });
      this.num = "";
      
    },

    myData() {
      this.displaySample().then(response => {
        // console.log(response)

        for (let wave in response) {
          let extensions = response[wave];
          let cell = document.getElementsByClassName(wave)[0];
          let regExt = extensions.registered_extension.length;
          let regDock = extensions.dock_registered;

          if (regDock == true) {
            cell.classList.remove("unRegistered", "unUsed");
            cell.classList.add("isRegistered");

            if (regExt != []) {
              cell.innerHTML = regExt;
            } else {
              cell.innerHTML = "";
            }
          } else {
            cell.classList.remove("isRegistered", "unUsed");
            cell.classList.add("unRegistered");
            if (regDock == false) {
              if (regExt != []) {
                cell.innerHTML = regExt;
              } else {
                cell.innerHTML = "";
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
/* .colColor{
  border: #fa4d45 solid;
} */
.gridView {
  height: 100vh;
  overflow-y: scroll;
}

.gridView::-webkit-scrollbar {
  display: none;
}
.gridView {
  -ms-overflow-style: none;
}
</style>
