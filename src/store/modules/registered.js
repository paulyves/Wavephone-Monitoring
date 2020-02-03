import axios from "axios";

const state = {
  timeStamp: "",
  statusArray: {},
  error: "",
  message: "",
  path: "",
  date: "",
  totalSession: "",
  session1: "",
  maxSession: "",
  minIdleCpu: "",
  currentStackSize: "",
  upTime: "",
  sesion2: "",
  status: ""
};

const getters = {
  getTimeStamp: state => state.timeStamp,
  getError: state => state.error,
  getMessage: state => state.message,
  getPath: state => state.path,
  getDate: state => state.date,
  getTotalSess: state => state.totalSession,
  getSess1: state => state.session1,
  getSess2: state => state.sesion2,
  getMaxSess: state => state.maxSession,
  getMinIdle: state => state.minIdleCpu,
  getCurrentStack: state => state.currentStackSize,
  getUpTime: state => state.upTime,
  getFreeSwitch: state => state.statusArray,
  getStatus: state => state.status
};

const mutations = {
  setTimeStamp(state, timeStamp) {
    state.timeStamp = timeStamp;
  },
  setSwitch(state, statusArray) {
    state.statusArray = statusArray;
  },
  setError(state, error) {
    state.error = error;
  },
  setMessage(state, message) {
    state.message = message;
  },
  setPath(state, path) {
    state.path = path;
  },
  setUpTime(state, upTime) {
    state.upTime = upTime;
  },
  setCurrentStack(state, currentStackSize) {
    state.currentStackSize = currentStackSize;
  },
  setStatus(state, Status) {
    state.status = Status;
  }
};

const actions = {
  displaySample({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://developer.bwddns.net:8080/fs-rest/fs/registered?waveNumber=10&details=false",
          { responseType: "json" }
        )
        .then(response => {
          commit("setSwitch", JSON.parse(JSON.stringify(response.data)));

          resolve(JSON.parse(JSON.stringify(response.data)));
        })
        .catch(error => {
          reject(error);
          console.log("error", error);
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
