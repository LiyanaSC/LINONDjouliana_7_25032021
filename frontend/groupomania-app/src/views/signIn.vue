<template>
  <section class="auth">
    
     <figure class="box_decoration auth__pic">
            <img src="../assets/welcome.jpg" class="box_decoration__pic" alt="photo de deux collègues portant un masque, si disant bonjour avec le coude">
    </figure>
     
<div class="login_box auth_box">
  <h1 class="login_box__title">Pagemania</h1>
  <p class="login_box__slogan">Inscription Rapide!</p>
  <p class="login_box__text">En moins d'une minute...</p>
  <SignUp />
</div>
  </section>
</template>
<script>
import SignUp from '../components/SignUp.vue'
// @ is an alias to /src

export default {
  name: 'singIn',
  components: {
    SignUp
  }
}
</script>

<style lang="scss" scoped>
.auth{
      @media (max-width: 900px) {
         display: flex;
         flex-direction: column-reverse;
        &__pic{
          display: none;
        }
        &_box{
          width: 90%;
        }
        }
}
</style>

