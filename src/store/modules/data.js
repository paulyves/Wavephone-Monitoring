import axios from "axios";

const state = {
  username: "",
  password: "",
  token: localStorage.getItem("token") || ""
};

const getters = {
  getUsername: state => state.username,
  getPassword: state => state.password,
  getToken: state => state.token,
  isLoggedIn: state => state.token !== ""
};
const mutations = {
  logout(state) {
    state.token = "";
  },
  setUsername(state, uname) {
    state.username = uname;
  },
  setPassword(state, psswrd) {
    state.password = psswrd;
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = null;
  }
};

const actions = {
  loginAuth({ commit }, data) {
    let loginObj = {
      username: data.username,
      password: data.password
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://developer.bwddns.net:8080/fs-rest/authenticate", loginObj)
        .then(response => {
          console.log(response.data);
          commit("setToken", response.data.token);
          resolve(JSON.parse(JSON.stringify(response.data)));
        })
        .catch(error => {
          commit("logout");
          localStorage.removeItem("token");
          reject(error.response);
        });
    });
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
