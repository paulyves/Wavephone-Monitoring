<template>
  <div class="dataTable">
    
    <div class="">
      <table class="table table-bordered waveList container-fluid">
        <tbody>
          <!-- <tr>
            <td>0</td>
            <td v-for="(row, index) in 100" :key="index" :title="rulerNum(1, row)" :class="rulerNum(1, row)" class="ruler" :id="rulerNum(1, row)" >
              {{row}}
            </td>
          </tr> -->
        
              <!-- <tr style=""> -->
                  <!-- <img src="../images/ruler_vertical.png" alt=""> -->
              
          <tr v-for="row in 100" :key="row" >
              
            <!-- <td :class="waveNum(100, row, 1)" v.b.tooltip class="rowsNum">
                <img src="http://placehold.it/20x20/fb235e/fb235e" alt="" />
              <div>{{row}}</div>
            </td> -->
            <td
              v-for="column in 100"
              v.b.tooltip
              :title="waveNum(100, row, column)"
              :key="column"
              :class="waveNum(100, row, column)"
              class="unUsed"
              @click="dataModal(waveNum(100, row, column))"
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
          <table class="table-bordered container-fluid">
            <tr>
              <td><b>Register Status</b></td>
              <td>
                <div v-show="selectedExt == true">True</div>
                <div v-show="selectedExt == false">False</div>
              </td>
            </tr>
            <tr>
              <td>
                <b>Registered Extensions</b>
              </td>
              <td class="dataClass">
                <div v-for="data in this.listExt" :key="data">
                  {{ data }}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dataTable",
  props: ["selectedTime"],
  data() {
    return {
      selectedWaveNum: "",
      listExt: "",
      selectedExt: "",
      dockTrue: true,
      dockFalse: true
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"])
  },
  methods: {
    waveNum(maxNum, row, column) {
      return `${(row - 1) * maxNum + column + 999999}`;
    },
     rulerNum(maxNum, row){
      return `${maxNum * row}`;
    },
    dataModal(wave) {
      this.listExt = "";
      let freeSwitch = this.getFreeSwitch;
      let parsedSwitch = JSON.parse(JSON.stringify(freeSwitch));
      this.selectedWaveNum = wave;
      for (let key in parsedSwitch) {
        let registeredDock = parsedSwitch[key].dock_registered;
        let registeredExt = parsedSwitch[key].registered_extension.reverse();
        let newArray = [];
        if (key == wave) {
          this.$bvModal.show("bv-modal-example");
          this.selectedExt = registeredDock;
          //   console.log(registeredExt);
          for (let i = 0; i < registeredExt.length; i++) {
            newArray.push(registeredExt[i].substring(7));
          }
          this.listExt = newArray.sort();
        }
      }
    }
  }
};
</script>

<style scoped>
.dataClass {
  border: none;
  display: table-row-group;
}
.col-1 {
  padding: 1;
}
.btn {
  background: #333333;
}
.btn:hover {
  background: #1a1a1a;
}
.isRegistered {
  background: #6fc42c;
  color: black;
  font-weight: bold;
}
.highlight {
  border: #ffffff solid 2px;
}
.highlights {
  border: #ffffff solid 2px;
}
.form-control {
  width: 100px;
}
.cellToolTip {
  display: none;
  border: black solid 1px;
  z-index: 100%;
  position: absolute;
}
.unRegistered {
  background: #eb2226;
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
table.waveList {
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
  font-size: 10px;
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
.modal-header {
  background: #333333;
}
.rowsNum {
  text-align: left;
}
</style>
