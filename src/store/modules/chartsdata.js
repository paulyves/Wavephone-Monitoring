import axios from "axios";

const state = {
  allDataVal: [{ disk: "", memory: "", cpu: "", network: "" }],

  callArray: [],
  callTimeArray: [],

  diskArray: [],
  diskTime: [],

  memoryArray: [],
  memoryTimeArray: [],

  CPUArray: [],
  CPUTimeArray: [],

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

    state.CPUArray.push(dataFourGraph.cpuData);
    state.CPUTimeArray.push(date.toLocaleTimeString());

    state.memoryArray.push(dataFourGraph.memoryData);
    state.memoryTimeArray.push(date.toLocaleTimeString());

    state.networkArray.push(dataFourGraph.networkData);
    state.networkTime.push(date.toLocaleTimeString());

    state.diskArray.push(dataFourGraph.diskData);
    state.diskTime.push(date.toLocaleTimeString());
  },

  addCallData: (state, numOfCalls) => {
    // let value = [Math.random() * 100];

    let date = new Date();
    if (state.callArray.length > 19) {
      state.callArray.shift();
    }

    if (state.callTimeArray.length > 19) {
      state.callTimeArray.shift();
    }

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
