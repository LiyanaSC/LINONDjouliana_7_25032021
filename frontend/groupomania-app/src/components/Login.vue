<template>
        <form  @submit="login_submit" method="POST" name="login" id="login" class="form">
                <div class="form__inputs">
                    <label for="email">Email</label>
                    <input type="email" v-model="loginEmail" name="email" id="email" placeholder="Votre adress email" aria-label="taper votre adresse mail" pattern="[A-Za-z-0-9.@]{4,1000}" required>
                
                </div>
                <div class="form__inputs">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="loginPassword" name="password" id="password" placeholder="Votre mot de passe" aria-label="taper votre mot de passe" pattern="[ A-Za-z-0-9\p{L}]{8,100}" required>
                </div>

                <div><input @click="refreshTokenStart" type="submit" value="Connexion" class="form__btn"> </div>
           

            </form>
</template>

<script>
import axios from 'axios'


export default {
    name: 'Login',
       data(){
     return {
     loginPassword: "",
     loginEmail:""
     }
    },
    methods:{
            login_submit(e){
                e.preventDefault();
                axios.post('http://localhost:8080/api/auth/login',{
                     password: this.loginPassword,
                       email:this.loginEmail
                })
                .then(response=>{
                    
                    localStorage.setItem("Token", response.data.token );
                    localStorage.setItem("userId", response.data.userId )
                    localStorage.setItem("admin", response.data.admin )
                    this.$router.push({path:'/articles'})
                    this.$store.state.tokenList.push(response.data.token,response.data.refreshToken)
                    this.$store.state.userId=response.data.userId
                    this.$store.state.admin=response.data.admin
                    this.$store.state.token=response.data.token
                    this.$store.state.refreshToken=response.data.refreshToken

                    console.log("verif store",this.$store.state)


                })
                .catch(error=>{
                    console.log(error)
              
 

                })


            },

                 refreshTokenStart(){
             this.$store.dispatch("refreshMyToken")
              },

    },
  
  
}
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40;
            &__inputs{
                display: flex;
                flex-direction: column;
                align-items: center;
                            }
            &__btn {
                   width: 200px;
                    height: 40px;
                    opacity: 1;
                    background-color:#fff;
                    border-radius: 20px;
                    margin-top: 10px;
                    border: 1px #fff solid;
                    margin-bottom: 40px;
                    &:hover {
                        opacity: 0.9;
                    }
            }
}
</style>