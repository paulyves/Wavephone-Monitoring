<template>
  <div class="gridView">
    <Navbar  v-on:waveSearch="btnWave" :selectedTime="timeInterval"  />
    <dataTable  />
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
    let setTimer = this.timeInterval;
    console.log(this.timeInterval);
    if (setTimer == 2) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 2000);
      console.log(setTimer);
    }
    if (setTimer == 5) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 5000);
      console.log(setTimer);
    } else if (setTimer == 10) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 10000);
      console.log(setTimer);
    } else if (setTimer == 20) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 20000);
      console.log(setTimer);
    } else if (setTimer == 0) {
      clearInterval(setTimer);
    }
  },
  mounted() {
    this.myData();
    console.log(this.timeInterval)
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"])
  },
  methods: {
    ...mapActions(["displaySample"]),

    btnWave(numWave) {
      this.displaySample().then(response => {
        for (let wave in response) {
          let cell = document.getElementsByClassName(wave)[0];
          let newWave = Math.floor(numWave / 100 - 10000);
          let cell1 = document.getElementsByClassName("rowsNum")[newWave];
          let waveString = numWave.substring(5);
          let waveNumbers = wave.substring(5);
          let cellXruler = document.getElementsByClassName("ruler")[
            waveString * 1
          ];
          let newVal = this.arraydata[0];
          let newArr = this.waveData[0];
          let dataCell = document.getElementsByClassName("ruler")[newVal * 1];
          let dataRow = document.getElementsByClassName("rowsNum")[
            Math.floor(newArr / 100 - 10000)
          ];
          console.log(dataRow);
          if (numWave == wave) {
            this.waveData.push(wave);
            cell.classList.add("highlight");
            cell1.classList.add("highlight");
            if (this.waveData.length > 1) {
              dataRow.classList.remove("highlight");
              // cell.classList.remove("highlight");
              if (this.waveData[0] != this.waveData[1]) {
                dataRow.classList.remove("highlight");
                cell.classList.remove("highlight");
              } else {
                dataRow.classList.add("highlight");
              }
              this.waveData.shift();
            }
            console.log(this.waveData, numWave, wave);
          } else {
            cell.classList.remove("highlight");
          }

          
          if (numWave.length != 7) {
            if (this.arraydata.length != 0) {
              dataCell.classList.remove("highlight");
              console.log("hey");
            }
            if (this.waveData.length != 0) {
              dataRow.classList.remove("highlight");
              console.log("hey");
            }
          }

          if (waveString == waveNumbers) {
            this.arraydata.push(waveNumbers);
            cellXruler.classList.add("highlight");
            console.log(this.arraydata);
            if (this.arraydata.length > 1) {
              dataCell.classList.remove("highlight");

              if (this.arraydata[0] != this.arraydata[1]) {
                dataCell.classList.remove("highlight");
              } else {
                dataCell.classList.add("highlight");
              }
              this.arraydata.shift();
            }
          }

          
        }
      });
      this.num = "";
      console.log(numWave);
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
