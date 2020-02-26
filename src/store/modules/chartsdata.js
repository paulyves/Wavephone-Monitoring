import axios from "axios";

const state = {
  allDataVal: [{ disk: "", memory: "", cpu: "", network: "" }],
 
//for X axis and Y axis data of the Graph "Call". 
  callArray: [],
  callTimeArray: [],

  //for X axis and Y axis data of the Graph "Disk". 
  diskArray: [],
  diskTime: [],

  //for X axis and Y axis data of the Graph "Memory". 
  memoryArray: [],
  memoryTimeArray: [],

  //for X axis and Y axis data of the Graph "CPU". 
  CPUArray: [],
  CPUTimeArray: [],

  //for X axis and Y axis data of the Graph "NEtwork". 
  networkArray: [],
  networkTime: []
};

const getters = {
  getCallArray: state => JSON.parse(JSON.stringify(state.callArray)),
  getCallTime: state => state.callTimeArray,

  getDiskArray: state => state.diskArray,
  getDiskTime: state => state.diskTime,

  getMemoryArray: state => state.memoryArray,
  getMemoryTime: state => state.memoryTimeArray,

  getCPUArray: state => state.CPUArray,
  getCPUTime: state => state.CPUTimeArray,

  getNetworkArray: state => state.networkArray,
  getNetworkTime: state => state.networkTime
};

const mutations = {
  setDataActivity: (state, dataFourGraph) => {
    let date = new Date();

    if (state.diskArray.length > 19) {
      state.diskArray.shift();
    }
    if (state.diskTime.length > 19) {
      state.diskTime.shift();
    }

    if (state.memoryArray.length > 19) {
      state.memoryArray.shift();
    }
    if (state.memoryTimeArray.length > 19) {
      state.memoryTimeArray.shift();
    }

    if (state.CPUArray.length > 19) {
      state.CPUArray.shift();
    }
    if (state.CPUTimeArray.length > 19) {
      state.CPUTimeArray.shift();
    }

    if (state.networkArray.length > 19) {
      state.networkArray.shift();
    }
    if (state.networkTime.length > 19) {
      state.networkTime.shift();
    }

     // @desc: push the "dataFourGraph.cpuData" into a array "CPUArray" from commit Axios call. 
    // @desc: push the "Current Time" into a array "CPUTimeArray" from commit Axios call. 
    state.CPUArray.push(dataFourGraph.cpuData);
    state.CPUTimeArray.push(date.toLocaleTimeString());

     // @desc: push the "dataFourGraph.memoryData" into a array "memoryArray" from commit Axios call. 
    // @desc: push the "Current Time" into a array "memoryTimeArray" from commit Axios call. 
    state.memoryArray.push(dataFourGraph.memoryData);
    state.memoryTimeArray.push(date.toLocaleTimeString());

     // @desc: push the "dataFourGraph.networkData" into a array "callArray" from commit Axios call. 
    // @desc: push the "Current Time" into a array "networkTime" from commit Axios call. 
    state.networkArray.push(dataFourGraph.networkData);
    state.networkTime.push(date.toLocaleTimeString());

     // @desc: push the "dataFourGraph.diskData" into a array "diskArray" from commit Axios call. 
    // @desc: push the "Current Time" into a array "diskTime" from commit Axios call. 
    state.diskArray.push(dataFourGraph.diskData);
    state.diskTime.push(date.toLocaleTimeString());
  },

  addCallData: (state, numOfCalls) => {
    // let value = [Math.random() * 100];
    //@param: date.toLocaleTimeString(); - return TIme in String.
    let date = new Date();
    if (state.callArray.length > 19) {
      state.callArray.shift();
    }

    if (state.callTimeArray.length > 19) {
      state.callTimeArray.shift();
    }

    // @desc: push the "numOfCalls" into a array "callArray" from commit Axios call. 
    // @desc: push the "Current Time" into a array "callTimeArray" from commit Axios call. 
    state.callArray.push(numOfCalls);
    state.callTimeArray.push(date.toLocaleTimeString());

   
  }
};

const actions = {
  callAllDataActivity({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://developer.bwddns.net:8080/fs-rest/fs/snmp")
        .then(response => {
          if (response.data) {
            //@desc: get the value disk, memory, cpu, and network, of axios call and commit to "setDataActivity"
            let fourGraphData = {
              diskData: response.data.disk,
              memoryData: response.data.memory,
              cpuData: response.data.cpu,
              networkData: response.data.network
            };
            commit("setDataActivity", fourGraphData);

            resolve(response.data);
          }
        })
        .catch(function(erorr) {
          reject(erorr);
        });
    });
  },

  callData({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://developer.bwddns.net:8080/fs-rest/fs/calls?waveNumber")
        .then(response => {
          if (response.data) {
            //@desc: get the integer value of axios call and commit to "addCallData"
            commit("addCallData", parseInt(response.data.call_count));
            resolve(response.data);
          }
        })
        .catch(function(erorr) {
          reject(erorr);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
