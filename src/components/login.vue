<template>
  <div class="login">
<div class="loginBlock">
    <h1>Login</h1>
    <input type="text" value="" placeholder="Username" id="username" class="form-control" />
    <input type="password" value="" placeholder="Password" id="password" class="form-control"  />
    <button>Sign In</button>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loginBlock {
    width: 320px;
    padding: 20px;
    border-radius: 5px;
    margin: 0 auto;
    border: #439EE4 solid 1px;
}

.loginBlock h1 {
    text-align: center;
    color: #000;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 20px;
    font-family:  sans-serif;
}

.loginBlock input {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;
    padding: 0 20px 0 50px;
    outline: none;
}
.loginBlock input:active, .loginBlock input:focus {
    border: #439EE4 solid 1px;
}
.loginBlock button {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    
    font-size: 15px;
    outline: none;
    cursor: pointer;
    font-family:  sans-serif;
}

</style>