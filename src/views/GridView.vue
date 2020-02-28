<template>
  <div class="gridView">
    <dataTable />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dataTable from "../components/dataTable";
export default {
  name: "gridView",
  props:['dataInterval', 'isActive'],
  components: {
    // Navbar,
    dataTable
  },
  data() {
    return {
      firstWave: ''
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

  mounted() {
    this.myData();
    this.waveNumbers();
  },
   created() {
      this.timeData = setInterval(this.myData, this.dataInterval*1000);
  },
  methods: {
    ...mapActions(["displaySample"]),
    waveNumbers(){
      let cells = document.getElementsByClassName('wave-list');
      this.firstWave = cells[0].id;
      let cellLength = parseInt(cells.length)
      let firstNum = parseInt(this.firstWave)
      this.lastWave = cellLength + firstNum - 1
      this.$emit('waveNum', this.firstWave ,this.lastWave)
     
      
    },
     myData() {
      this.displaySample().then(response => {
        for (let wave in response) {
          let extensions = response[wave];
          let cell = document.getElementsByClassName(wave)[0];
          let regExt = extensions.registered_extension.length;
          let regDock = extensions.dock_registered;
           /*
            regDock = display true when dock is registered and false when dock is not registered.
            cell = where the registered and unregistered wavenumbers will be place in there same num cells.
            */
          if (regDock == true) {
            /**if regDock is true
             * add classlist 'isRegistered'(highlight when dock is registered)
             */
            cell.classList.remove("unRegistered", "unUsed");
            cell.classList.add("isRegistered");

            if (regExt != []) {
              cell.innerHTML = regExt;
              /*
              regExt = length of extension numbers
              *will be displayed when there are registered extension
              */
            } else {
              cell.innerHTML = "";
              /**
               * when there is no registered extension
               */
            }
          } else {
            /**
             * else if regDock is false
             * add classlist 'unRegistered' and removed class 'isRegistered'
             */
            cell.classList.remove("isRegistered", "unUsed");
            cell.classList.add("unRegistered");
            if (regDock == false) {
              if (regExt != []) {
                cell.innerHTML = regExt;
                /*
              regExt = length of extension numbers
              *will be displayed when there are registered extension
              */
              } else {
                cell.innerHTML = "";
                /**
               * when there is no registered extension
               */
              }
            }
          }
        }
      });
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
          for(let tr in dataTr){
             dataTr[tr].cells[cell1].classList.add("border-color");
               cell.classList.add("highlight");
              dataTag.classList.add("horizontal-border");
              console.log('first' + newWave, + newWave1);
              if(this.waveData.length > 1){
             let shiftArray = this.waveData.shift();
             let prev = document.getElementsByClassName(shiftArray)[0];
             let prevCell = prev.cellIndex;
             let newWave2 = Math.floor(shiftArray / 100 - 10000);
        let dataTagPre = document.getElementsByClassName("tr-colors")[newWave2];
              let dataPrev = document.getElementsByClassName("tr-colors");
        // let newWave1 = Math.floor(newWave / 100 - 10000);
        // let dataTag = document.getElementsByClassName("tr-colors")[newWave1];
        let tableTrs = document.getElementsByClassName("tr-colors");
                console.log('second' + shiftArray,+ prev, + newWave2)
             for(let prevTr in dataPrev){
               if(shiftArray !== numWave){
                 dataPrev[prevTr].cells[prevCell].classList.remove("border-color");
                prev.classList.remove("highlight");
                dataTagPre.classList.remove("horizontal-border");
                for(let tr1 in tableTrs){
             tableTrs[tr1].cells[cell1].classList.add("border-color");
             }
             console.log('third' + shiftArray, numWave, newWave)
               }
             
             }
             

              }
          }
          
          
          //    if(this.waveData.length > 1){
          //    let shiftArray = this.waveData.shift();
          //    console.log(shiftArray, numWave)

          //  }
        }
      }
     
    },

  
  },
  watch:{
    /**dataInterval - setting a new interval */
    dataInterval:{
      handler:function(interval){
        console.log(this.isActive,"is active ")
        /**@params this.isActive - if this is equals to true the data will start*/
        if(this.isActive == true){
          /**
           * clearInterval = clears the data and previous interval to set a new data and interval
           */
          clearInterval(this.timeData);
          this.timeData = setInterval(this.myData, interval*1000);
          /**
           * @params this.timeData - this is where the data will refresh by the selected interval.
           */
          
        }else {
          /**
           * clearInterval = clears the data and previous interval to set a new data interval
           */
          clearInterval(this.timeData);

        }
      }
    },
    /**isActive - checks if the page is Active/true or Active/false */
    isActive:{
      handler:function(activeTab){
        /**activeTab - if it's equal to true the data interval will start and if it's false the data interval will pause/stop. */
        if(activeTab == true){
          this.timeData = setInterval(this.myData, this.dataInterval*1000);
          /**
           * @params this.timeData - this is where the data will refresh by the selected interval.
           */
         
        }else {
          /**
           * clearInterval = clears the data and previous interval to set a new data interval
           */
          clearInterval(this.timeData);
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
