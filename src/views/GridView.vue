<template>
  <div class="gridView">
    <dataTable />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dataTable from "../components/dataTable";
export default {
  name: "gridView",
  components: {
    // Navbar,
    dataTable
  },
  data() {
    return {
      // arraydata: [],
      // listExt: "",
      // selectedExt: "",
      // selectedWaveNum: "",
      // timeInterval: "2",
      // timeData: "",
      // searchNum: "",
      // num: "",
      // waveData: []
    };
  },
  // created() {
  //   if (this.timeInterval == 2) {
  //     clearInterval(this.timeData);
  //     this.timeData = setInterval(this.myData, 2000);
  //     console.log(this.timeInterval);
  //   }
  //   if (this.timeInterval == 5) {
  //     clearInterval(this.timeData);
  //     this.timeData = setInterval(this.myData, 5000);
  //     console.log(this.timeInterval);
  //   } else if (this.timeInterval == 10) {
  //     clearInterval(this.timeData);
  //     this.timeData = setInterval(this.myData, 10000);
  //     console.log(this.timeInterval);
  //   } else if (this.timeInterval == 20) {
  //     clearInterval(this.timeData);
  //     this.timeData = setInterval(this.myData, 20000);
  //     console.log(this.timeInterval);
  //   } else if (this.timeInterval == 0) {
  //     clearInterval(this.timeInterval);
  //   }
  // },
  mounted() {
    // this.myData();
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"])
  },
  methods: {
    ...mapActions(["displaySample"]),
    // setDataInterval(val) {
    //   this.timeInterval = val;
    //   if (this.timeInterval == 2) {
    //     clearInterval(this.timeData);
    //     this.timeData = setInterval(this.myData, 2000);
    //     console.log(this.timeInterval);
    //   }
    //   if (this.timeInterval == 5) {
    //     clearInterval(this.timeData);
    //     this.timeData = setInterval(this.myData, 5000);
    //     console.log(this.timeInterval);
    //   } else if (this.timeInterval == 10) {
    //     clearInterval(this.timeData);
    //     this.timeData = setInterval(this.myData, 10000);
    //     console.log(this.timeInterval);
    //   } else if (this.timeInterval == 20) {
    //     clearInterval(this.timeData);
    //     this.timeData = setInterval(this.myData, 20000);
    //     console.log(this.timeInterval);
    //   } else if (this.timeInterval == 0) {
    //     clearInterval(this.timeInterval);
    //   }
    // },

    // btnWave(numWave) {
    //   let freeSwitch = document.getElementsByClassName("wave-list");
    //   for (let wave in freeSwitch) {
    //     let newWave = freeSwitch[wave].id;
    //     let cell = document.getElementsByClassName(numWave)[0];
    //     let cell1 = cell.cellIndex;
    //     let newWave1 = Math.floor(numWave / 100 - 10000);

    //     let dataTag = document.getElementsByClassName("tr-colors")[newWave1];
    //     let dataTr = document.getElementsByClassName("tr-colors");

    //     if (numWave == newWave) {
    //       this.waveData.push(numWave);
    //       for(let tr in dataTr){
    //          dataTr[tr].cells[cell1].classList.add("border-color");
    //            cell.classList.add("highlight");
    //           dataTag.classList.add("horizontal-border");
    //           console.log('first' + newWave, + newWave1);
    //           if(this.waveData.length > 1){
    //          let shiftArray = this.waveData.shift();
    //          let prev = document.getElementsByClassName(shiftArray)[0];
    //          let prevCell = prev.cellIndex;
    //          let newWave2 = Math.floor(shiftArray / 100 - 10000);
    //     let dataTagPre = document.getElementsByClassName("tr-colors")[newWave2];
    //           let dataPrev = document.getElementsByClassName("tr-colors");
    //     // let newWave1 = Math.floor(newWave / 100 - 10000);
    //     // let dataTag = document.getElementsByClassName("tr-colors")[newWave1];
    //     let tableTrs = document.getElementsByClassName("tr-colors");
    //             console.log('second' + shiftArray,+ prev, + newWave2)
    //          for(let prevTr in dataPrev){
    //            if(shiftArray !== numWave){
    //              dataPrev[prevTr].cells[prevCell].classList.remove("border-color");
    //             prev.classList.remove("highlight");
    //             dataTagPre.classList.remove("horizontal-border");
    //             for(let tr1 in tableTrs){
    //          tableTrs[tr1].cells[cell1].classList.add("border-color");
    //          }
    //          console.log('third' + shiftArray, numWave, newWave)
    //            }
             
    //          }
             

    //           }
    //       }
          
          
    //       //    if(this.waveData.length > 1){
    //       //    let shiftArray = this.waveData.shift();
    //       //    console.log(shiftArray, numWave)

    //       //  }
    //     }
    //   }
     
    // },

    // myData() {
    //   this.displaySample().then(response => {
    //     // console.log(response)

    //     for (let wave in response) {
    //       let extensions = response[wave];
    //       let cell = document.getElementsByClassName(wave)[0];
    //       let regExt = extensions.registered_extension.length;
    //       let regDock = extensions.dock_registered;

    //       if (regDock == true) {
    //         cell.classList.remove("unRegistered", "unUsed");
    //         cell.classList.add("isRegistered");

    //         if (regExt != []) {
    //           cell.innerHTML = regExt;
    //         } else {
    //           cell.innerHTML = "";
    //         }
    //       } else {
    //         cell.classList.remove("isRegistered", "unUsed");
    //         cell.classList.add("unRegistered");
    //         if (regDock == false) {
    //           if (regExt != []) {
    //             cell.innerHTML = regExt;
    //           } else {
    //             cell.innerHTML = "";
    //           }
    //         }
    //       }
    //     }
    //   });
    // }
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
