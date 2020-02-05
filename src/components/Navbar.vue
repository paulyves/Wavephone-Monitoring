<template>
  <nav class="navbar navbar-expand-lg">
    <img src="" alt="" height="50px;" width="200px;" />
    <div class="collapse navbar-collapse ml-3">
      <ul class="navbar-nav formMr">
        <li><b-nav-item to="/Registration">Registration</b-nav-item></li>
        <li><b-nav-item to="/Activities">Activities</b-nav-item></li>
      </ul>

      <ul class="navbar-nav formMr">
        <li>
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
        </li>
      </ul>
    </div>
    <!-- <ul>
      <li>
        <b-button @click="logOutbtn">logout</b-button>
      </li>
    </ul> -->
    <ul>
      <li>
        <b-nav-item class="formDate">{{ today }}</b-nav-item>
      </li>
    </ul>
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
    logOutbtn() {
      this.$router.push({
        path: "/"
      });
    },
    btnSearch(event) {
      this.searchWaveNum = event.target.value;
      this.$emit("waveSearch", this.search);
      this.search = "";
    },
    submit(event) {
      this.searchWaveNum = event.target.value;
      this.$emit("btnSubmit", { string: this.search, type: this.type });
    },

    dateTime() {
      let currentDate = new Date();
      if (currentDate) {
        this.today = currentDate;
        this.today = moment(this.today, 'M.DD.YYYY hh:mm:ss').format("L LT");

      }
    }
  },
  mounted() {
    this.dateTime();
    this.interval = setInterval(this.dateTime, 1000);
  },
  // beforeDestroy() {
  //   clearInterval(this.interval);
  // }
};
</script>

<style scoped>
.formMr {
  margin-right: 30%;
}
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
ul {
  list-style-type: none;
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
