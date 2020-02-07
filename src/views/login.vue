<template>
  <div class="login">
    <!-- <Navbar /> -->
    <!-- <h1>konnichiwaaaa!!!!</h1> -->
    <b-container fluid class="containerSyle ">
      <!-- <h1>hello</h1> -->
          <b-container fluid class="containerSyle1">

          <img src="../images/wavephone_logo.png" alt="wavephone">
          <br>
          <b-container class="containerSyle2">

          <b-form >
              <!-- <b-form-group></b-form-group> -->
              <b-form-input
              type="text"
              placeholder="Host Name"
              v-model="inputHostName"
              >     
              </b-form-input>
              <br>
              <b-form-input
              type="text"
              placeholder="Username"
              v-model="inputUserName"
              >     
              </b-form-input>
              <br>
              <b-form-input
              type="password"
              placeholder="Password"
              v-model="inputPassword"
              >
                  
              </b-form-input>
              <br>  
              <b-button @click.prevent="loginFunc" type="submit" id="btnColor">login</b-button>
          
          </b-form>
          <br>
          <b-alert :show="ValidData" class="textAlign" variant="danger">Invalid login credentials.</b-alert>
          </b-container>
          
          </b-container>
          
      </b-container>
  </div>
</template>

<script>
// import Navbar from '../components/Navbar'
export default {
name: 'login',
components: {
// Navbar
},
data(){
  return{
      inputHostName:"",
    dataVal: false,
        inputUserName: '',
        inputPassword: '',
        ValidData: false
}
},

methods:{
  loginFunc(){
        // console.log("test")
        this.dataVal = true;
        if (this.inputUserName == 'admin' && this.inputPassword == 'bluewave888' && this.inputHostName.length != 0) {
            console.log("login Success")
             this.ValidData = false;
             this.$router.push({
              path: "/Registration"
            });
        }else{
            this.ValidData = true;
            this.inputUserName = '',
            this.inputPassword = '',
            this.inputHostName = ''
            // console.log("Invalid Credintials", this.calingBolean)
        }
    }
}

}



</script>

<style scoped>



.login{
    background-image: url('../images/login_screen_bg.png');
    /* background-color: blue; */
    /* width: 100%; */
    /* height: 100%; */
    height: 100vh;
    background-size: cover;
    overflow:hidden;
}

.containerSyle{
    margin-top: 3%;
    background-color: white;
    /* width: 100%; */
    /* max-width: 40%; */
     /* max-width: 100%; */
     /* height: 100vh; */
     max-width: 68vh;
     /* border: 2px solid green; */
     /* height: 100%; */

}

.containerSyle1{
    
   max-width: 90%;
    /* border: 3px solid yellow; */
    
}

.containerSyle2{
    margin-top: 8%;
    /* border: 3px solid green; */
    padding-bottom: 20%;
}

img{
    margin-top: 15%;
    margin-left: 27%;
    max-width: 50%;
    height: 70px;
    
   
}



#btnColor{
    background-color: #1946ba;
    width: 26%;
    margin-left: 35%;
}

.textAlign{
  text-align: center;
}

</style>
