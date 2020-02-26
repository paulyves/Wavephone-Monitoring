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
        <Registration :dataInterval="timeInterval" :isActive="isActive"
         />
      </b-tab>
      <b-tab title="Activities" @click.prevent="pauseData">
        <Activities :timeInterval ="timeInterval" :btnActive= "btnActive" />
      </b-tab>
     <template v-slot:tabs-end>


        <b-nav-item class="select-form">
          <select
            name="timeList"
            form="listForm"
            class="form-control formInput"
            v-model="timeInterval"
          >
            <option value="2">2s</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
            <option value="30">20s</option>
            <option value="30">30s</option>
            <option value="60">60s</option>


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
              <b-button class="material-icons"
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
      btnActive: false,
      isActive:true,
      search: "",
      today: "",
      searchWaveNum: "",
      timeInterval: "2",
      timeData:"",
    };
  },

  mounted() {
    this.dateTime();
    this.interval = setInterval(this.dateTime, 1000);
    /**
     * @param this.interval = sets the date/time interval
     */
  },
  computed:{
  },
  methods: {
    ...mapActions(["displaySample"]),
    pauseData(){
      //@param btnActive - set btnActive = true; if "pauseData" or activity Tab is Click;
      /*
      isActive = if 'isActive' equals false the data interval will pause/stop;
      */ 
      this.btnActive = true;
      this.isActive = false;
      /* Click event of Activities tab 
      *after clicked the Registration data will stop/pause
      */
    },
    pauseData1(){
      this.btnActive = false;
      this.isActive = true;
      /**
       * if isActive is equals to true the data interval will start.
       */
      /*Click event
      *after clicked the Registration data interval will start
       */
    },
    logOutbtn() {
      this.$router.push({
        path: "/"
      });
    },
    dateTime() {
      let currentDate = new Date();
      if (currentDate) {
        this.today = currentDate;
        this.today = moment(this.today, "M.DD.YYYY hh:mm:ss").format("L LT");
      }
    }
  },
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
