import axios from "axios";

const state = {

  allDataVal: [{ disk: "", memory: "", cpu: "", network: "" }],

  callDataArray: ""
};

const getters = {
  getDataAll: state => state.allDataVal,
  getCallData: state => state.callDataArray
};

const mutations = {
  setDataActivity: (state, dataAll) => {
    state.allDataVal = dataAll;
  },

  setCallData: (state, CallDataget) => {
    state.callDataArray = CallDataget;
  }
};

const actions = {
  callAllDataActivity({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://developer.bwddns.net:8080/fs-rest/fs/snmp")
        .then(response => {
          if (response.data) {
            commit("setDataActivity", response.data);

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
            commit("setCallData", response.data.current_call);
            resolve(response.data);
            // console.log(response.data,"what")
          }
        })
        .catch(function(erorr) {
          // console.log(erorr,  "What erorr")
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
