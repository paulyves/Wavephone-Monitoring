<template>
<div>
  <nav class="navbar navbar-expand">
    <img src="../images/wavephone_logo_header-01.png" alt="" height="50px;" width="200px;" />
    <div class="collapse navbar-collapse" style="border-left: solid 1px;
  color: #ffffff;">
      <ul class="navbar-nav ml-5">
        <li><b-nav-item to="/Registration">Registration</b-nav-item></li>
        <li><b-nav-item to="/Activities">Activities</b-nav-item></li>
      </ul>

      <ul class="navbar-nav" style="margin-left:20%;">
        <li>
          <select
          name="timeList"
          form="listForm"
          :v-model="selectedTime"
          class="form-control formInput"
          value="2"
        >
          <option value="2">2s</option>
          <option value="5">5s</option>
          <option value="10">10s</option>
          <option value="20">20s</option>
        </select>
        </li>
        <li class="ml-3 ">
          <b-form >
      <b-input-group-append>
        <b-form-input id="colorFil" v-model="search" type="search"></b-form-input>
        <b-button class="material-icons"  @click="btnSearch">search</b-button>
      </b-input-group-append>
      </b-form>
        </li>
        <li class="ml-5">
          <p>Wave No.:</p>
        </li>
        <li class="ml-5">
          <p class="ml-5">Host Name:</p>
        </li>
        
      </ul>
        
    </div>
    <ul>
      <li>
        <b-nav-item class="formDate">{{ today }}</b-nav-item>
      </li>
    </ul>
  </nav>

  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Navbar",
  props: ["selectedTime"],
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
        this.today = moment(this.today, "M.DD.YYYY hh:mm:ss").format("L LT");
      }
    }
  },
  mounted() {
    this.dateTime();
    this.interval = setInterval(this.dateTime, 1000);
  }
  // beforeDestroy() {
  //   clearInterval(this.interval);
  // }
};
</script>

<style scoped>
.inputLi{
width:100%;
}
ul.navbar-nav{
  margin:0;
}
.material-icons {
  border-radius: 2px;
  border: 1px solid black;
  border-left: none;
  background: #cccccc;

}
.material-icons:hover {
  background-color: white;
  border: 1px solid black;
  background: #cccccc;

}

#colorFil {
  border-radius: 1px;
  border: 1px solid black;
  border-right: none;
  background: #cccccc; 

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
.formInput, .formInput:focus {
  border: black solid 1px;
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
.btn ,.btn:hover{
  background: #cccccc; 
  color: #1a1a1a;

 }
 .material-icons{
  color: #1a1a1a;
} 
</style>
