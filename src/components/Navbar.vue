<template>
  <nav class="navbar navbar-expand-lg">
    <img
      src="../images/wavephone_logo1.png"
      alt=""
      height="50px;"
      width="200px;"
    />
    <div class="collapse navbar-collapse ml-3">
      <ul class="navbar-nav mr-auto">
        <li><b-nav-item to="/Registration">Registration</b-nav-item></li>
        <li><b-nav-item to="/Activities">Activities</b-nav-item></li>
      </ul>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search Wavenum"
          v-model="search"
          @input="submit"
          name="searchWaveNum"
          id="searchWaveNum"
        /><b-button
          class="btn btn-secondary my-2 my-sm-0"
          @click.prevent="btnSearch"
          >Search</b-button
        >
      </form>
      <ul class="navbar-nav">
        <li>
          <p class="formDate ml-5">{{ today }}</p>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import moment from "moment";
export default {
  name: "Navbar",
  props: ["value", "type"],
  data() {
    return {
      search: "",
      today: "",
      searchWaveNum: ""
    };
  },
  methods: {
    callFunction: function() {
      var currentDate = new Date();
      if (currentDate) {
        this.today = currentDate;
      }
    },
    btnSearch(event) {
      this.searchWaveNum = event.target.value;
      this.$emit("waveSearch", this.search);
    },
    submit(event) {
      this.searchWaveNum = event.target.value;
      this.$emit("btnSubmit", { string: this.search, type: this.type });
    },

    dateTime() {
      this.today = moment().format("L LT");
      console.log(this.today);
    }
  },
  mounted() {
    this.callFunction();
    this.interval = setInterval(this.dateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.router-link-exact-active {
  color: #ffffff;
  background: #1a1a1a;
  border-radius: 5px;
}
.router-link-active:hover {
  color: #ffffff;
}
p {
  color: #ffffff;
}
.formInput {
  height: 25px;
}
.navbar {
  background: #333333;
}
a.nav-link {
  color: #ffffff;
}
ul.nav {
  width: 100%;
}
</style>
