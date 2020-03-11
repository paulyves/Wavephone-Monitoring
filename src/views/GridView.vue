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
  props: ["dataInterval", "isActive", "searchVal"],
  components: {
    // Navbar,
    dataTable
  },
  data() {
    return {
      firstWave: "",
      numWave: "",
      // arraydata: [],
      // listExt: "",
      // selectedExt: "",
      // selectedWaveNum: "",
      // timeInterval: "2",
      // timeData: "",
      // searchNum: "",
      // num: "",
      waveData: []
    };
  },

  mounted() {
    this.myData();
    this.waveNumbers();
  },
  created() {
    this.timeData = setInterval(this.myData, this.dataInterval * 1000);
  },
  methods: {
    ...mapActions(["displaySample"]),

    waveNumbers() {
      /** */
      let cells = document.getElementsByClassName("wave-list");
      /**
       * @param cells = to get the html elements
       */
      this.firstWave = cells[0].id;
      /**
       * @param firstWave = first id in table cell
       */
      let cellLength = parseInt(cells.length);
      let firstNum = parseInt(this.firstWave);
      /**@param cellLength added to @param firstNum and subtract in 1 to get the last wave number */
      this.lastWave = cellLength + firstNum - 1;
      /**@param lastWave = last id in table cell */
      this.$emit("waveNum", this.firstWave, this.lastWave);
    },
    myData() {
      this.displaySample().then(response => {
        console.log(response);
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

    // "btnWave" responsible for highlighting but not include remove highlighting.
    btnWave(numWave) {
      //set param object from axios.
      let freeSwitch = document.getElementsByClassName("wave-list");

      for (let wave in freeSwitch) {
        //set param from the for loop.
        let newWave = freeSwitch[wave].id;
        let cell = document.getElementsByClassName(numWave)[0];
        let cell1 = cell.cellIndex;
        let newWave1 = Math.floor(numWave / 100 - 10000);
        let dataTag = document.getElementsByClassName("tr-colors")[newWave1];
        let dataTr = document.getElementsByClassName("tr-colors");

        //numWave - is a Current input search.
        //newWave - is a value from the for loop, from axios call.
        //if the current input search is Match from Wave number in axios
        if (numWave == newWave) {
          //numWave - current input value,
          //waveData - is a Array.
          //push new value to Array. if Match
          this.waveData.push(numWave);

          //2nd value of input search will highlight.
          if (this.waveData.length > 1) {
            for (let tr in dataTr) {
              dataTr[tr].cells[cell1].classList.add("border-color");
              cell.classList.add("highlight");
              dataTag.classList.add("horizontal-border");
            }
          } else {
            //1st value of input search will highlight.
            for (let tr in dataTr) {
              dataTr[tr].cells[cell1].classList.add("border-color");
              cell.classList.add("highlight");
              dataTag.classList.add("horizontal-border");
              // this.cell.scrollIntoView();
            }
          }
        }
      }
    }
  },
  watch: {
    /**dataInterval - setting a new interval */
    dataInterval: {
      handler: function(interval) {
        console.log(this.isActive, "is active ");
        localStorage.setItem("intervalData", interval);
        /**@params this.isActive - if this is equals to true the data will start*/
        if (this.isActive == true) {
          /**
           * clearInterval = clears the data and previous interval to set a new data and interval
           */
          clearInterval(this.timeData);
          this.timeData = setInterval(this.myData, interval * 1000);
          /**
           * @params this.timeData - this is where the data will refresh by the selected interval.
           */
        } else {
          /**
           * clearInterval = clears the data and previous interval to set a new data interval
           */
          clearInterval(this.timeData);
        }
      }
    },
    /**isActive - checks if the page is Active/true or Active/false */
    isActive: {
      handler: function(activeTab) {
        /**activeTab - if it's equal to true the data interval will start and if it's false the data interval will pause/stop. */
        if (activeTab == true) {
          this.timeData = setInterval(this.myData, this.dataInterval * 1000);
          /**
           * @params this.timeData - this is where the data will refresh by the selected interval.
           */
        } else {
          /**
           * clearInterval = clears the data and previous interval to set a new data interval
           */
          clearInterval(this.timeData);
        }
      }
    },

    searchVal: {
      // searchVal - responsible for the value of input search.
      handler: function(waveNumberVal) {
        if (waveNumberVal != "") {
          let firstThreeDigit = waveNumberVal.slice(0, 3);

          // if the "waveNumberVal" is exist. check if this "waveNumberVal" is starting value of 100 and lenght of
          // 7 digit.
          if (waveNumberVal.length == 7 && firstThreeDigit == 100) {
            //call the method for highlighting wave Number. "this.btnWave"
            this.btnWave(waveNumberVal);
          } else {
            // if "waveNumberVal" is existing but the starting value  of"waveNumberVal" is not 100 and
            // not 7 digit.

            //set param from arrays.
            let arrayOne = this.waveData[0];
            let arrayTwo = this.waveData[1];

            //if the previous input search is highlighted.
            // and if "arrayOne" is existing, the previous input search is remove.
            if (arrayOne != null && arrayTwo == null) {
              let freeSwitch = document.getElementsByClassName("wave-list");
              for (let wave in freeSwitch) {
                //set param for looping.
                let newWave = freeSwitch[wave].id;
                let cell = document.getElementsByClassName(arrayOne)[0];

                let cell1 = cell.cellIndex;

                let newWave1 = Math.floor(arrayOne / 100 - 10000);
                let dataTag = document.getElementsByClassName("tr-colors")[
                  newWave1
                ];
                let dataTr = document.getElementsByClassName("tr-colors");
                if (arrayOne == newWave) {
                  this.waveData.length = 0;

                  for (let tr in dataTr) {
                    dataTag.classList.remove("horizontal-border");
                    dataTr[tr].cells[cell1].classList.remove("border-color");
                    cell.classList.remove("highlight");
                  }
                }
              }
            }

            // if the previous input search is exist and current input search exist, from the Array.
            //  the current input search will remove.
            if (arrayTwo != null && arrayOne != null) {
              let freeSwitch = document.getElementsByClassName("wave-list");
              for (let wave in freeSwitch) {
                //set param for looping.
                let newWave = freeSwitch[wave].id;
                let cell = document.getElementsByClassName(arrayTwo)[0];

                let cell1 = cell.cellIndex;
                let newWave1 = Math.floor(arrayTwo / 100 - 10000);
                let dataTag = document.getElementsByClassName("tr-colors")[
                  newWave1
                ];
                let dataTr = document.getElementsByClassName("tr-colors");
                if (arrayTwo == newWave) {
                  this.waveData.length = 0;

                  for (let tr in dataTr) {
                    dataTag.classList.remove("horizontal-border");
                    dataTr[tr].cells[cell1].classList.remove("border-color");
                    cell.classList.remove("highlight");
                  }
                }
              }
            }
          }
        } else {
          // if the previous input seach is existing from the Array, And the Current input
          //Search is "null" or not exising. the previous input search will remove.
          let arrayOne = this.waveData[0];
          let freeSwitch = document.getElementsByClassName("wave-list");
          for (let wave in freeSwitch) {
            //set param for looping.
            let newWave = freeSwitch[wave].id;
            let cell = document.getElementsByClassName(arrayOne)[0];

            let cell1 = cell.cellIndex;
            let newWave1 = Math.floor(arrayOne / 100 - 10000);
            let dataTag = document.getElementsByClassName("tr-colors")[
              newWave1
            ];
            let dataTr = document.getElementsByClassName("tr-colors");
            if (arrayOne == newWave) {
              this.waveData.length = 0;

              for (let tr in dataTr) {
                dataTag.classList.remove("horizontal-border");
                dataTr[tr].cells[cell1].classList.remove("border-color");
                cell.classList.remove("highlight");
              }
            }
          }
        }
      }
    },

    waveData: {
      // waveData  - is an Array, this is a Responsible for removing highligted.
      handler: function(arrayValue) {
        //if "arrayValue" is lenght of 2. And the 1st Array or previous input search will do a
        // for loop to find the previous arrayValue and remove it.

        if (arrayValue.length == 2) {
          let freeSwitch = document.getElementsByClassName("wave-list");
          for (let wave in freeSwitch) {
            //set param for looping.
            let arrayOne = this.waveData[0];
            let arrayTwo = this.waveData[1];
            let newWave = freeSwitch[wave].id;
            let cell = document.getElementsByClassName(arrayOne)[0];
            let cellTwo = document.getElementsByClassName(arrayTwo)[0];
            let firstNum = cell.id.slice(5, 7);
            let secondNum = cellTwo.id.slice(5, 7);
            let thirdNum = cell.id.slice(3, 5);
            let fourthNum = cellTwo.id.slice(3, 5);

            let cell1 = cell.cellIndex;
            let newWave1 = Math.floor(arrayOne / 100 - 10000);
            let dataTag = document.getElementsByClassName("tr-colors")[
              newWave1
            ];
            let dataTr = document.getElementsByClassName("tr-colors");
            if (arrayOne == newWave) {
              for (let tr in dataTr) {
                if (firstNum == secondNum) {
                  dataTr[tr].cells[cell1].classList.add("border-color");
                  cell.classList.remove("highlight");
                  dataTag.classList.remove("horizontal-border");
                } else if (thirdNum == fourthNum) {
                  dataTag.classList.add("horizontal-border");
                  dataTr[tr].cells[cell1].classList.remove("border-color");
                  cell.classList.remove("highlight");
                } else {
                  dataTag.classList.remove("horizontal-border");
                  dataTr[tr].cells[cell1].classList.remove("border-color");
                  cell.classList.remove("highlight");
                }
              }
            }
          }
        }
        // if arrayValue.lenght > 2, the firts value of Array will remove.
        if (arrayValue.length > 2) {
          this.waveData.shift();
        }

        // this.arrayValData = arrayValue;
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
