<template>
  <section class="auth">
<div class="login_box">
  <h1 class="login_box__title">Pagemania</h1>
  <p class="login_box__slogan">Keep in touch*</p>
  <p class="login_box__text">*garder le contact</p>
  <Login/>
</div>
 
 <figure  class="box_decoration ">
            <img src="../assets/coude_masque.jpg" class="box_decoration__pic" alt="photo de deux collègues portant un masque, si disant bonjour avec le coude">
    </figure>
     
 

  </section>
</template>

<script>
import Login from '../components/Login.vue'
// @ is an alias to /src

export default {
  name: 'auth',
  components: {
    Login,

  }
}
</script>

<style lang= 'scss'>

.auth{
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 50px;  

  @media (max-width: 900px) {
      display: flex;
      flex-direction: column;

    }



  }
.login_box{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #fff solid;
  width: 35%;
  height: 70%;
  color: #fff;
  font-family:'Roboto',
  sans-serif;
 @media (max-width: 900px) {
    
width: 90%;
    }

          &__title{
            font-family: 'Fjalla One',
            sans-serif;
          }
          &__slogan{
            font-family: 'Fjalla One',
            sans-serif;
            margin: 0;
            font-size: 2rem;
          }
          &__text{
            box-sizing: border-box;
            margin-bottom: 30px;
          }
}
  .box_decoration {
    width: 45%;
       @media (max-width: 900px) {
      display: none

    }
    &__pic {
        width: 100%;
        border-radius: 20px;
        border: 1px #fff solid;
     
    }
 
}
</style>