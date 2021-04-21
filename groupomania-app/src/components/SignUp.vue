<template>
                   <!-- _________________________ FORM: sign up ____________________________________ -->

        <form @submit="form_submit" method="POST" name="signup" id="signup" class="form">
           
             
            <div class="form__inputs"><!-- input lastname -->
                    <label for="firstname">Nom</label>
                    <input type="text" v-model="lastname" name="firstname" id="firstname" placeholder="Votre nom" aria-label="taper votre nom" pattern="[A-Za-z-0-9\p{L}]{2,200}" required>
                </div>

                 
                 <div class="form__inputs"> <!-- input firstname -->
                    <label for="firstname">Prénom</label>
                    <input type="text" v-model="firstname" name="lastname" id="lastname" placeholder="Votre prénom" aria-label="taper votre prénom" pattern="[A-Za-z-0-9\p{L}]{2,100}" required>
                </div>
                
                
                <div class="form__inputs"><!-- input email -->
                    <label for="username">Email</label>
                    <input type="email" v-model="email" name="email" id="email" placeholder="Votre adress email" aria-label="taper votre adresse mail" pattern="[A-Za-z-0-9.@]{4,1000}" required>
                </div>

                <div class="form__inputs"><!-- input mdp -->
                    <label for="password">Mot de passe<br/>(8 caractères min, 1 minuscule, 1 majuscule, 1chiffre)</label>
                    <input type="password" v-model="password" name="password" id="password" placeholder="Votre mot de passe" aria-label="taper votre mot de passe" pattern="[ A-Za-z-0-9\p{L}]{8,100}" required>
                </div>
               
                <!-- btm -->     
                <div><input @click="refreshTokenStart" type="submit" value="M'inscrire" class="form__btn" id="btn"></div>
            </form>
</template>

<script>

import {logUser,signupUser} from '../api/user.api'


export default {
    
    name: 'SignUp',
    data(){
     return {
     password: "",
     email:"",
     firstname: "",
     lastname:""
     }
    },
  
 
    methods:{
//METHOD FOR SIGN UP (submit form)
            form_submit(e){
                e.preventDefault();//stop refresh
                     
                     //POST CREATE USER 
                signupUser(this.password, this.email, this.firstname, this.lastname)
                .then(response=>{
            
             let dataResponse = JSON.parse(response.config.data);

                //POST connexion
                logUser(dataResponse.password, dataResponse.email)
                                .then(response=>{
                                    console.log(response.data)

                                   
                                    
                                        this.$store.state.userId=response.data.userId
                                        this.$store.state.admin=response.data.admin
                                        this.$store.state.token=response.data.token
                                        this.$store.state.refreshToken=response.data.refreshToken
                                                    

                                    this.$router.push({path:'/articles'})
                                    console.log("verif store",this.$store.state)

                                })
                                .catch(error=>{
                                    console.log(error)
                                })

                })
                .catch(error=>{
                    console.log(error)

                })
                                                  

            },
//METHOD FOR REFRESH TOKEN (click btn)
              refreshTokenStart(){
             this.$store.dispatch("refreshMyToken")
             }

    },

  
}
</script>

<style lang="scss" scoped>
.form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40;
             &__inputs{
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
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