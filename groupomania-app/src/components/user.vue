<template>

    <section class="User">        

            <h2 class="User__title"> Mes infos utilisateur </h2>
            <p>Salut {{ UserLastName }} {{ UserFirstName }} </p>
                
                   <!-- _________________________ FORM: user info ____________________________________ -->
    
            <form @submit="form_submit" class="User__form">

                     <!-- input lastname -->
                    <div class="">
                        <label class="" for="lastname">Modifier mon nom </label>
                        <input @keyup="close" v-model="UserLastName" class="header__form__article_title" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required > 
                    </div>

                     <!-- input firstname -->
                    <div class="header__form__div">
                        <label class="" for="description">Modifier mon Prénom </label>
                        <input @keyup="close" v-model="UserFirstName" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required>
                    
                    </div>   
                         
                    <!-- btn -->
                    <input  type="submit" value="Modifier mes infos" class="header__form__article_title__btn succes" id="btn">
                    <p v-if="success" class="User__done">C'est fait!</p>
            
            </form>
              
               
            

    </section>
</template>
<script>
import { mapState } from 'vuex'
import {updateUserById,getUserById} from '../api/user.api'


export default {
      computed: {
        ...mapState(['token','userId'])
    },
  components: {
  },
    name: 'Delete',
    data(){
        return{
          
            UserFirstName:"",
            UserLastName:"",
            success:false, //message "c'est fait"


        }
    },
//LIFE CYCLE created
    async created(){
   
    //GET user Info
                        getUserById(this.userId, this.token)
                        .then((res)=>{
                            this.UserFirstName = res.data.firstname; //change info firstname
                            this.UserLastName = res.data.lastname;  //change info lastname
                    console.log(res.data)
                        })

    },
   methods:{
 //METHOD close message
       close(){
                this.success=false;
       },

//METHOD update info user
     form_submit(e){
                e.preventDefault();
                

                  //PUT modif user info   
                updateUserById(this.userId, this.UserFirstName, this.UserLastName, this.token)
                .then(response=>{
        console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            
               
                this.success=true; //show message "c'est fait"
                 
            
            }
    


        
    },

   
    
}


</script>
<style lang="scss" scoped>

.User{ //section
    width: 75vw;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    font-family: 'Roboto',sans-serif;
             @media (max-width: 900px) {
             width: 100%;
             justify-content: center;
             height: 100vh;
             overflow: auto;
             padding: 0%
         }

    &__title{
  
        border: 1px gray solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: rgb(14, 32, 65);
        display: flex;
        justify-content: center;
       

    }
    &__form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__update{//IS THAT USEFULL
        color: rgb(14, 32, 65);
        &:hover{
            font-weight: bold;
        }
    }
    &__done{//message "c'est fait"
        color:#06d6a0
    }
}
*{
      box-sizing: border-box;
}
</style>