<template>
  <div class="gridView">
    <Navbar />
    <div class="row mt-2">
      <div class="col-1 ml-2">
        <select name="timeList" form="listForm" v-model="selectedTime" class="form-control" @click="timeButton" value="2">
  <option value="2">2s</option>
  <option value="5">5s</option>
  <option value="10">10s</option>
  <option value="20">20s</option>
</select>
        <!-- <select name="timeList" form="listForm" v-model="selectedTime" class="form-control" @click="timeButton" value="5"> -->
        <!-- <option value="0">Stop</option> -->
        <!-- <option value="5">5s</option>
        <option value="10">10s</option>
        <option value="20">20s</option>
      </select> -->
      </div>
      <div class="ml-1col-1">
      <!-- <b-button  @click="timeButton">Refresh</b-button> -->
      </div>
    </div>
    <div class="">
      <table class="table table-bordered waveList">
        <tbody>
          <tr v-for="row in 100" :key="row">
            <td
              v-for="column in 100"
              v.b.tooltip
              :title="waveNum(100, row, column)"
              :key="column"
              :class="waveNum(100, row, column)"
              class="unUsed"
              @click="showModal(waveNum(100, row, column))"
            ></td>
          </tr>
        </tbody>
      </table>

      <b-modal
        ref="modal-1"
        hide-footer
        :title="this.selectedWaveNum"
        id="bv-modal-example"
        size="lg"
      >
        <div class="container">
        <div class="row">
          <div class="col-0 colColor">
            <b><p>Register :</p></b>
          </div>
          <div class="col colColor">
            <p>{{this.selectedExt}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-0 colColor">
            <b><p>Registered Extensions :</p></b>
          </div>
          <div class="col colColor">
            <p>{{this.listExt}}</p>
          </div>
        </div>

        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "../components/Navbar";

export default {
  name: "gridView",
  components: {
    Navbar
  },
  data() {
    return {
      listInterval: [
        { time: 0, text: "Set timer" },
        { time: 5, text: "5s" },
        { time: 10, text: "10s" }
      ],
      listExt: "",
      selectedExt: "",
      selectedWaveNum: "",
      selectedTime: "2",
      timeData: ""
    };
  },
  created(){
    let setTimer = this.selectedTime;
      console.log(this.selectedTime);
        sessionStorage.setItem("loadTimer", setTimer);
      if(setTimer == 2){
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 2000);
        console.log(this.timeData);
      }
      if (setTimer == 5) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 5000);
        console.log(this.timeData);
      } 
      else if (setTimer == 10) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 10000);
        console.log(this.timeData);
      } 
      else if (setTimer == 20) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 20000);
        console.log(this.timeData);
      }
       else if (setTimer == 0) {
        clearInterval(this.timeData);
      }
  },
  mounted() {

    let loadData = sessionStorage.getItem("loadTimer");
    console.log(loadData);

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
        }else{
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

  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"]),
  },
  methods: {
    ...mapActions(["displaySample"]),

    waveNum(maxNum, row, column) {
      return `${(row - 1) * maxNum + column + 999999}`;
    },

    showModal(wave) {
      let freeSwitch = this.getFreeSwitch;
      let parsedSwitch = JSON.parse(JSON.stringify(freeSwitch));
      console.log(wave);
      this.$bvModal.show("bv-modal-example");
      this.selectedWaveNum = wave;
      
      for (let key in parsedSwitch) {
        if (key == wave) {
          this.$bvModal.show("bv-modal-example");
          this.showReg = false;
          let ext = parsedSwitch[key].registered_extension;
          let extensions = ext.toString();
          this.selectedWaveNum = wave;
          this.selectedExt = parsedSwitch[key].dock_registered;
          this.listExt = extensions;
          // console.log(key, wave);
        }
      }
      console.log(wave);
    },

    myData() {
      this.displaySample().then(response => {
        console.log(response, 'another one')
        // window.location.reload()
      });
    }

  }

};
</script>

<style scoped>
/* .colColor{
  border: #fa4d45 solid;
} */
.modal-header{
  background: #333333;
}
.col-1{
  padding: 1;
}
.btn{
  background: #333333;
}
.btn:hover{
  background: #1a1a1a;
}
.isRegistered {
  background: #6fc42c;
  color: black;
  font-weight: bold;
}
.yellow {
  background: yellow;
}
.form-control{
  width:100px;
}
.cellToolTip {
  display: none;
  border: black solid 1px;
  z-index: 100%;
  position: absolute;
}
td {
  background: red;
}
.unRegistered {
  background: red;
  color: black;
  font-weight: bold;
}
.unUsed {
  background: #000000;
  color: #ffffff;
}
p {
  padding: 0;
  margin: 0;
}
.black {
  background: black;
  color: white;
}
.green {
  background: green;
  color: #ffffff;
}
.red {
  background: #fa4d45;
  color: #ffffff;
}
.waveList {
  table-layout: fixed;
  cursor: pointer;
  border-color: #4f4f4f;
  margin-top: 20px;
  border-collapse: collapse;
  color: white;
  text-align: center;
}

table > tbody > tr > td {
  padding: 0;
  height: 15px;
  width: 15px;
  font-size: 8px;
  border-color: #4f4f4f;
  background: #666666;
}
p {
  text-align: justify;
}
.col-2 {
  padding: 0;
}
.col {
  padding: 0;
}
.modal-header{
  background: #333333;
}
</style>
