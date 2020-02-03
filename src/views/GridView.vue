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
          // let extensions = response[wave];
          let cell = document.getElementsByClassName(wave)[0];
          // let regExt = extensions.registered_extension.length;
          // let regDock = extensions.dock_registered;
          if (numWave == wave) {
            // cell.classList.remove("unRegistered", "unUsed");
            cell.classList.add("highlight");
            console.log(numWave, wave);
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
}
</style>
