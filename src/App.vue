<template>
  <div id="app">   
 <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>

/* .loginPage{
  margin-top:10%;
}
.size{
  margin-right: 50%;
}*/ 
#app{
  height: 100vh;
  background: #4d4d4d;
  overflow-x: hidden;
  overflow-y: scroll;

} 
#app::-webkit-scrollbar {
    display: none;
}
#app{
    -ms-overflow-style: none;
}
</style>
