<template>
  <div class="gridView">
    <Navbar v-on:waveSearch="btnWave" v-on:pickTime="setDataInterval" v-model="timeInterval" />
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
      dataBolean: false,
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

  mounted() {
    this.myData();
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"])
  },
  methods: {
    ...mapActions(["displaySample"]),
    setDataInterval(val) {
      this.timeInterval = val;
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
      let freeSwitch = document.getElementsByClassName("wave-list");

      for (let wave in freeSwitch) {
        let newWave = freeSwitch[wave].id;
        let cell = document.getElementsByClassName(numWave)[0];
        let cell1 = cell.cellIndex;
        let newWave1 = Math.floor(numWave / 100 - 10000);
        let dataTag = document.getElementsByClassName("tr-colors")[newWave1];
        let dataTr = document.getElementsByClassName("tr-colors");

        if (numWave == newWave) {
          this.waveData.push(numWave);

          if (this.waveData.length > 1) {
            console.log("if", this.waveData);
            for (let tr in dataTr) {
              dataTr[tr].cells[cell1].classList.add("border-color");
              cell.classList.add("highlight");
              dataTag.classList.add("horizontal-border");
            }
          } else {
            console.log("else");
            for (let tr in dataTr) {
              dataTr[tr].cells[cell1].classList.add("border-color");
              cell.classList.add("highlight");
              dataTag.classList.add("horizontal-border");
              cell.scrollIntoView();
            }
          }
        }
      }
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
  },

  watch: {
    waveData: {
      handler: function(arrayValue) {
        if (arrayValue.length == 2) {
          console.log(arrayValue, "arrayValue");
          let freeSwitch = document.getElementsByClassName("wave-list");
          for (let wave in freeSwitch) {
            let newWave = freeSwitch[wave].id;
            let cell = document.getElementsByClassName(this.waveData[0])[0];
            let cell1 = cell.cellIndex;
            let newWave1 = Math.floor(this.waveData[0] / 100 - 10000);
            let dataTag = document.getElementsByClassName("tr-colors")[
              newWave1
            ];
            let dataTr = document.getElementsByClassName("tr-colors");
            if (this.waveData[0] == newWave) {
              for (let tr in dataTr) {
                dataTr[tr].cells[cell1].classList.remove("border-color");
                cell.classList.remove("highlight");
                dataTag.classList.remove("horizontal-border");
              }
            }
          }
        }

        if (arrayValue.length == 3) {
          this.waveData.shift();
        }
      }
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
