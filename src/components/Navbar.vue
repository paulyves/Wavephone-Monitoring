<template>
  <div class="navbar">
  
  <b-nav pills>
    <!-- <b-nav-item to="/">Registration</b-nav-item> -->
    <!-- <b-nav-item to="/login">Activities</b-nav-item> -->
    <router-link class="links" to="/gridView">Activities</router-link>
    <router-link class="links" to="/Activities">Activities</router-link>
    <b-nav-item ><b-form-input class="formInput"></b-form-input></b-nav-item>
    <b-nav-item class="formDate">{{today | formatDate}}</b-nav-item>
  </b-nav>
      
  </div>
</template>

<script>
import moment from 'moment';
export default {
name: 'Navbar',
data(){
  return{
today: ""
  }
},
methods:{
   callFunction: function () {
            var currentDate = new Date();
             if(currentDate){
               this.today = currentDate
             }
        }
},
mounted(){
  this.callFunction();
},
filters:{
formatDate: function(today) {
      return moment(today, 'YYYY-MM-DD h:mm:ss a').format('DD/MM/YYYY h:mm a');
       }
          }
}
</script>

<style scoped>
.router-link-exact-active {
  color: #ffffff;
  background: #1a1a1a;

}
.router-link-active:hover {
  color:#ffffff;
}
.formDate{
  margin-left:40%;

}
.formInput{
  margin-left:400px;
   height:25px;
}
.navbar{
  background: #333333;
}
a.nav-link{
  color: #ffffff;
}
ul.nav{
  width:100%;
}
</style>