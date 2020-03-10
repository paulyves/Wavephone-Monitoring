<template>
  <div class="dataTable">
    <div class="row ml-0">

      <div class="col mr-3">
        <table class="table table-bordered waveList container-fluid ">
          <tbody>
            <tr>
              <!-- <td></td>
              <td></td>
              <td v-for="row in 100" :key="row" :class="waveNum(100, row, 1)">
                <div class="arrowImg1"></div>
              </td> -->
            </tr>
            <tr>
              <td></td>
              <td>0</td>
              <td
                v-for="(row, index) in 100"
                :key="index"
                :class="rulerNum(1, row)"
                class="ruler"
                :id="rulerNum(1, row)"
              >
                {{ row }}
              </td>
            </tr>
            <tr v-for="(row, index) in 100" :key="index" class="tr-colors">
              <td  class="rows-ruler"></td>
              <td >
                <div>{{ row }}</div>
              </td>

              <td
                v-for="(column, index) in 100"
                v.b.tooltip
                :title="waveNum(100, row, column)"
                :key="index"
                :class="waveNum(100, row, column)"
                :id="waveNum(100, row, column)"
                class="unUsed wave-list"
                @click="dataModal(waveNum(100, row, column))" 
              >
                <!-- {{ index }} -->
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
    <div class="">
      <b-modal
        ref="modal-1"
        hide-footer
        :title="this.selectedWaveNum"
        id="bv-modal-example"
        size="lg"
        @hidden="onHidden"
      >
        <div class="container">
          <table class="table-bordered container-fluid">
            <tr>
              <td><b>Register Status</b></td>
              <td>
                <div v-if="selectedExt === true">True</div>
                <div v-if="selectedExt === false">False</div>
                <div v-if="selectedExt !== true && selectedExt !== false">Unused</div>
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
  data() {
    return {
      selectedWaveNum: "",
      listExt: "",
      selectedExt: "",
      value: 0
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getFreeSwitch"]),
    total: function() {
      return this.value * 1;
    }
  },
  methods: {
    waveNum(maxNum, row, column) {
      return `${(row - 1) * maxNum + column + 999999}`;
    },
    rulerNum(maxNum, row) {
      return `${maxNum * row}`;
    },
     onHidden () {
       /**event when closing the modal the params will be cleared. */
       this.listExt = '';
       this.selectedExt = '';
  },
    
    
    dataModal(wave) {
      /*@params {string}
    wave = available wavenumber in cells   */
      this.$bvModal.show("bv-modal-example");
      let freeSwitch = this.getFreeSwitch;
      let parsedSwitch = JSON.parse(JSON.stringify(freeSwitch));
      
      this.selectedWaveNum = wave;
      for (let key in parsedSwitch) {
        let registeredDock = parsedSwitch[key].dock_registered;
        /* registeredExt = list of registered extension */
        let registeredExt = parsedSwitch[key].registered_extension;
        let newArray = [];
        if (key === wave) {
          this.selectedExt = registeredDock;
          /* registeredDock = will display if dock is registered or not  */
          for (let i = 0; i < registeredExt.length; i++) {
            newArray.push(registeredExt[i].substring(7));
          }
          this.listExt = newArray.sort();
          /* newArray.sort() = list of registered extension and will be displayed in order. */
        }
      }
       
    }
  }
};
</script>

<style scoped>
.border-color {
  border-bottom: none;
  border-left: #b6cde5 solid 2px;
  border-right: #b6cde5 solid 2px;
}
.horizontal-border {
  border-top: #b6cde5 solid 2px;
  border-bottom: #b6cde5 solid 2px;
}
table.tableRule {
  width: 15px;
  height: 97%;
  table-layout: fixed;
}

.dataClass {
  border: none;
  display: table-row-group;
}
/* .col {
  margin-top: 13px;
} */
img {
  height: 99%;
}

.col-1 {
  padding-right: 0;
  max-width: 2%;
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
  border: red solid 2px;
  scroll-behavior: smooth;
}

.arrowImg::before {
  background-image: url("../images/arrow.png");
  background-size: 13px 13px;
  display: inline-block;
  width: 11px;
  height: 13px;
  content: "";
}

.arrowImg1::before {
  background-image: url("../images/arrow_down.png");
  background-size: 13px 13px;
  width: 11px;
  height: 13px;
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
  /* margin-top: 20px; */
  border-collapse: collapse;
  color: white;
  text-align: center;
}

table > thead > tr > th,
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
</style>
