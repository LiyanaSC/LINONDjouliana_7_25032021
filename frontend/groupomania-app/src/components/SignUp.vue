<template>
        <form @submit="form_submit" method="POST" name="signup" id="signup" class="form">
            <div class="form__inputs">
                    <label for="firstname">Nom</label>
                    <input type="text" v-model="lastname" name="firstname" id="firstname" placeholder="Votre nom" aria-label="taper votre nom" pattern="[A-Za-z-0-9\p{L}]{2,200}" required>
                </div>
                 <div class="form__inputs">
                    <label for="firstname">Prénom</label>
                    <input type="text" v-model="firstname" name="lastname" id="lastname" placeholder="Votre prénom" aria-label="taper votre prénom" pattern="[A-Za-z-0-9\p{L}]{2,100}" required>
                </div>
                <div class="form__inputs">
                    <label for="username">Email</label>
                    <input type="email" v-model="email" name="email" id="email" placeholder="Votre adress email" aria-label="taper votre adresse mail" pattern="[A-Za-z-0-9.@]{4,1000}" required>
                </div>
                <div class="form__inputs">
                    <label for="password">Mot de passe<br/>(8 caractères min, 1 minuscule, 1 majuscule, 1chiffre)</label>
                    <input type="password" v-model="password" name="password" id="password" placeholder="Votre mot de passe" aria-label="taper votre mot de passe" pattern="[ A-Za-z-0-9\p{L}]{8,100}" required>
                </div>
               

                <div><input type="submit" value="M'inscrire" class="form__btn" id="btn"></div>
            </form>
</template>

<script>
import axios from 'axios'

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
            form_submit(e){
                e.preventDefault();
                     
                axios.post('http://localhost:8080/api/auth/signup',{
                     password: this.password,
                       email:this.email,
                      firstname: this.firstname,
                     lastname:this.lastname,
                })
                .then(response=>{
            
             let dataResponse = JSON.parse(response.config.data);
                axios.post('http://localhost:8080/api/auth/login',{
                                    password: dataResponse.password,
                                    email: dataResponse.email,
                                })
                                .then(response=>{
                                    console.log(response.data)
                                    localStorage.setItem("Token", response.data.token );
                                    localStorage.setItem("userId", response.data.userId )
                                    localStorage.setItem("admin", response.data.admin )
                                    this.$router.push({path:'/articles'})


                                })
                                .catch(error=>{
                                    console.log(error)
                                })

                })
                .catch(error=>{
                    console.log(error)

                })
                                                  

            }
    }

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