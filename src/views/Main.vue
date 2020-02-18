<template>
  <div class="main">
    <b-tabs pills v-model="btabs">
      <b-tab disabled class="date-class">
        <template v-slot:title>
          <img
            src="../images/wavephone_logo_header-01.png"
            alt="Wavephone"
            width="180px;"
          />
        </template>
      </b-tab>

      <b-tab
        title="Registration"
        class="nav-link mr-5"
        :title-link-class="linkClass(1)"
      >
        <GridView
      /></b-tab>
      <b-tab
        title="Activities"
        class="nav-link mr-5"
        :title-link-class="linkClass(2)"
      >
        <Activities
      /></b-tab>
      <b-tab align="right" :title="today" :class="date(today)" disabled></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import GridView from "./GridView.vue";
import Activities from "./Activities.vue";
import moment from "moment";
export default {
  name: "Main",
  components: {
    Activities,
    GridView
  },
  data() {
    return {
      btabs: 0,
      today: ""
    };
  },

  mounted() {
    this.dateTime();
    this.interval = setInterval(this.dateTime, 1000);
  },
  methods: {
    selectInterval(event) {
      this.$emit("pickTime", event.target.value);
    },
    btnSearch(event) {
      this.searchWaveNum = event.target.value;
      this.$emit("waveSearch", this.search);
      this.search = "";
    },
    date(today) {
      if (today) {
        return ["text-light"];
      }
    },
    dateTime() {
      let currentDate = new Date();
      if (currentDate) {
        this.today = currentDate;
        this.today = moment(this.today, "M.DD.YYYY hh:mm:ss").format("L LT");
      }
    },
    linkClass(idx) {
      let newTab = document.getElementsByClassName("active")[idx];
      if (this.btabs === idx) {
        console.log(idx, newTab);
        return ["bg-dark", "text-light"];
      }
    }
  }
};
</script>

<style>
.nav-link.disabled {
  color: #ffffff;
}
.dateClass {
  background-color: none;
}
.tabs.foobar .nav .nav-item.active {
  /* custom styles here */
  color: aqua;
}
.nav,
.nav-pills{
  background: #333333;
  height:45px;
}
.tab-content > .active {
  padding: 0;
}
.dateClass {
  margin-left: 50%;
}
.nav-link,
.nav-link:hover , .nav-link.active:hover{
  color: #ffffff;
}
/* .nav-item {
  color: #333333;
  margin-left:0px;
}
a{
  background-color: none;
}





li.nav-item {
  height: 60px;
}
a.router-link {
  margin-top: 5px;
} */
</style>
