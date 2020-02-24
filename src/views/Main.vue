<template>
  <div class="main">
    <b-tabs pills class="">
      <template v-slot:tabs-start>
        <!-- <div style="border-right: #ffffff solid 1px; border-height:5px; "> -->
        <img
          src="../images/wavephone_logo_header-01.png"
          alt="Wavephone"
          height="40px;"
          width="200px;"
        />
        <!-- </div> -->
      </template>

      
      <b-tab title="Registration"  @click.prevent="pauseData1" active>
        <Registration
         />
      </b-tab>
      <b-tab title="Activities" @click.prevent="pauseData">
        <Activities  />
      </b-tab>
     <template v-slot:tabs-end>


        <b-nav-item class="select-form">
          <select
            name="timeList"
            form="listForm"
            class="form-control formInput"
            @click="selectInterval"
            v-model="timeInterval"
          >
            <option value="2">2s</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
            <option value="20">20s</option>
          </select>
        </b-nav-item>


        <b-nav-item class="search-form">
          <b-form>
            <b-input-group-append>
              <b-form-input
                id="colorFil"
                v-model="search"
                type="search"
              ></b-form-input>
              <b-button class="material-icons" @click="btnSearch"
                >search</b-button
              >
            </b-input-group-append>
          </b-form>
        </b-nav-item>
        <b-nav-item class="formDate ">{{ today }}</b-nav-item>
      </template>
    </b-tabs>
   
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Registration from "./GridView.vue";
import Activities from "./Activities.vue";
import moment from "moment";
export default {
  name: "Main",
  components: {
    Activities,
    Registration
  },
  data() {
    return {
      search: "",
      today: "",
      searchWaveNum: "",
      timeInterval: "2",
      timeData:"",
    };
  },

  mounted() {
    this.myData();
    this.dateTime();
    this.interval = setInterval(this.dateTime, 1000);
  },
  computed:{
  },
  methods: {
    ...mapActions(["displaySample"]),
    pauseData(){
      clearTimeout(this.timeData)
      /* Click event of Activities tab 
      *after clicked the Registration data will stop/pause
      */
    },
    pauseData1(){
      setTimeout(this.selectInterval())
      /*Click event
      *after clicked the Registration data interval will start
       */
    },
  btnSearch() {
    let numWave = this.search;
      console.log(numWave)
     
    },
   myData() {
      this.displaySample().then(response => {
        console.log(response)

        for (let wave in response) {
          let extensions = response[wave];
          let cell = document.getElementsByClassName(wave)[0];
          let regExt = extensions.registered_extension.length;
          let regDock = extensions.dock_registered;
           /*
            regDock = display true when dock is registered and false when dock is not registered.
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
    logOutbtn() {
      this.$router.push({
        path: "/"
      });
    },
    selectInterval() {
     
      if (this.timeInterval == 2) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 2000);
        console.log(this.timeInterval);
      }
      if (this.timeInterval == 5) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 5000);
        console.log(this.timeInterval);
      } else if (this.timeInterval == 10) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 10000);
        console.log(this.timeInterval);
      } else if (this.timeInterval == 20) {
        clearInterval(this.timeData);
        this.timeData = setInterval(this.myData, 20000);
        console.log(this.timeInterval);
      } else if (this.timeInterval == 0) {
        clearInterval(this.timeInterval);
      }
      console.log(this.timeInterval, this.timeData)
    },
    dateTime() {
      let currentDate = new Date();
      if (currentDate) {
        this.today = currentDate;
        this.today = moment(this.today, "M.DD.YYYY hh:mm:ss").format("L LT");
      }
    }
  },
  created() {


    if (this.timeInterval == 2) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 2000);
     
    }
    if (this.timeInterval == 5) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 5000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 10) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 10000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 20) {
      clearInterval(this.timeData);
      this.timeData = setInterval(this.myData, 20000);
      console.log(this.timeInterval);
    } else if (this.timeInterval == 0) {
      clearInterval(this.timeInterval);
    }
     console.log(this.timeInterval,this.timeData );
  }
};
</script>

<style>
.select-form{
  margin-left: 18% !important;
}
.search-form{
  margin-right: 30% !important;
}
.material-icons {
  border-radius: 2px !important;
  border: 1px solid black !important;
  border-left: none !important;
  background: #cccccc !important;
  color: #1a1a1a !important;
  height: 30px !important;
  padding:0 !important;
}
.material-icons:hover {
  background-color: white;
  border: 1px solid black;
  background: #cccccc !important;
}

#colorFil, #colorFil:focus {
  border-radius: 1px;
  border: 1px solid black;
  border-right: none;
  background: #cccccc;
  height: 30px !important;
}
.formInput,
.formInput:focus {
  border: black solid 1px;
  height: 30px !important;
  padding:2px !important;
}
.nav-link.active {
  background-color: #1a1a1a !important;
}
.nav-link.disabled {
  color: #ffffff !important;
}

.nav,
.nav-pills {
  background: #333333;
  height: 43px;
}
.nav-link,
.nav-link:hover,
.nav-link.active:hover {
  color: #ffffff;
}
.nav-item {
  color: #333333;
  margin-left: 0px;
}
a {
  background-color: none;
  margin-top: 0;
}
</style>
