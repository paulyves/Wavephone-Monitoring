<template>
  <div class="gridView">
    <Navbar type="inputWaveNum" v-on:waveSearch="btnWave" />
    <dataTable :selectedTime="timeInterval" />
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
      arraydata:[],
      listExt: "",
      selectedExt: "",
      selectedWaveNum: "",
      timeInterval: "2",
      timeData: "",
      searchNum: "",
      num: ""
    };
  },
  created() {
    let setTimer = this.timeInterval;
    console.log(this.timeInterval);
    if (setTimer == 2) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 2000);
      console.log(this.timeData);
    }
    if (setTimer == 5) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 5000);
      console.log(this.timeData);
    } else if (setTimer == 10) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 10000);
      console.log(this.timeData);
    } else if (setTimer == 20) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 20000);
      console.log(this.timeData);
    } else if (setTimer == 0) {
      clearInterval(this.timeData);
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

    btnWave(numWave) {
      this.displaySample().then(response => {
        for (let wave in response) {
          let cell = document.getElementsByClassName(wave)[0];
          let newWave = Math.floor(numWave / 100 - 10000);
          let cell1 = document.getElementsByClassName("rowsNum")[newWave];

          let waveString =  numWave.substring(5);
          let waveNumbers = wave.substring(5);
          let cellXruler = document.getElementsByClassName('ruler')[waveString * 1];
          let newVal = this.arraydata[0]
          let dataCell = document.getElementsByClassName ('ruler' )[newVal * 1];

          if (numWave.length != 7) {
             if (this.arraydata.length != 0) {
             dataCell.classList.remove("highlight");
               
             }
          }

          if (waveString == waveNumbers ) {
            this.arraydata.push(waveNumbers)
            cellXruler.classList.add("highlight");

            if (this.arraydata.length > 1) {
                dataCell.classList.remove("highlight");
               
                if (this.arraydata[0] != this.arraydata[1]) {
                   dataCell.classList.remove("highlight");
                }else{
                  dataCell.classList.add("highlight");
                  
                }
                this.arraydata.shift()
            }
           
          }




          

          if (numWave == wave) {
            cell.classList.add("highlight");
            cell1.classList.add("highlight");
            console.log(cell1, numWave, wave);
          } else {
            cell.classList.remove("highlight");
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
