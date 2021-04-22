<template>
            <!-- _________________________ FORM: login ____________________________________ -->
             <form  @submit="login_submit" method="POST" name="login" id="login" class="form">


                <div class="form__inputs"><!-- input email -->
                    <label for="email">Email</label>
                    <input type="email" v-model="loginEmail" name="email" id="email" placeholder="Votre adress email" aria-label="taper votre adresse mail" pattern="[A-Za-z-0-9.@]{4,1000}" required>
                
                </div>
                <div class="form__inputs"><!-- input mdp -->
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="loginPassword" name="password" id="password" placeholder="Votre mot de passe" aria-label="taper votre mot de passe" pattern="[ A-Za-z-0-9\p{L}]{8,100}" required>
                </div>


                <!-- btn -->
                <div><input @click="refreshTokenStart" type="submit" value="Connexion" class="form__btn"> </div>
           

            </form>
</template>

<script>
import {logUser} from '../api/user.api'



export default {
    name: 'Login',
       data(){
     return {
     loginPassword: "",
     loginEmail:""
     }
    },
    methods:{
//METHOD login
            login_submit(e){
                e.preventDefault();
                //POST for login
                logUser(this.loginPassword, this.loginEmail)
                .then(response=>{
                    console.log(response)
                    
                    
                    this.$store.state.userId=response.data.userId
                    this.$store.state.admin=response.data.admin
                    this.$store.state.token=response.data.token
                    this.$store.state.refreshToken=response.data.refreshToken


                    this.$router.push({path:'/articles'})
                    console.log("verif store",this.$store.state)


                })
                .catch(error=>{
                    console.log(error)
                                                    window.alert('L’adresse e-mail ou le mot de passe que vous avez saisi(e) n’est associé(e) à aucun compte')

 

                })


            },

                 refreshTokenStart(){//refresh token
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