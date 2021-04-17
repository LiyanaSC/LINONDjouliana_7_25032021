<template>

    <section class="User">        

                <h2 class="User__title"> Mes infos utilisateur </h2>
                    <p>Salut {{ UserLastName }} {{ UserFirstName }} </p>
                
                   
            <form @submit="form_submit" class="User__form">
                    <div class="">
                        <label class="" for="lastname">Modifier mon nom </label>
                        <input @keyup="close" v-model="UserLastName" class="header__form__article_title" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required > 
                    </div>
                
                    <div class="header__form__div">
                        <label class="" for="description">Modifier mon Prénom </label>
                        <input @keyup="close" v-model="UserFirstName" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required>
                    
                    </div>
                    <input  type="submit" value="Modifier mes infos!" class="header__form__article_title__btn succes" id="btn"> <p v-if="success" class="User__done">C'est fait!</p>
            
            </form>
              
               
            

    </section>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'




export default {
      computed: {
        ...mapState(['token'])
    },
  components: {
  },
    name: 'Delete',
    data(){
        return{
          
            UserFirstName:"",
            UserLastName:"",
            success:false,


        }
    },
    async created(){
    
                    let userId = localStorage.getItem("userId");

                 axios.get(`http://localhost:8080/api/users/${userId}`,{
                                headers:{
                                    'Authorization': `bearer ${this.token}`
                                    
                                }
                            })
                        .then((res)=>{
                            this.UserFirstName = res.data.firstname;
                            this.UserLastName = res.data.lastname;
                    console.log(res.data)
                        })

    },
   methods:{
       close(){
                this.success=false;
       },

     form_submit(e){
                e.preventDefault();
                
                    let userId = localStorage.getItem("userId");

                     
                 axios.put(`http://localhost:8080/api/users/${userId}`,{
                     firstname: this.UserFirstName,
                    lastname:this.UserLastName,
              

                },{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                        
                    }
                }
                )
                .then(response=>{
        console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            
               
                this.success=true;
                 
            
            }
    


        
    },

   
    
}


</script>
<style lang="scss" scoped>

.User{
    width: 75vw;
    overflow: auto;
    z-index: 7;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    font-family: 'Roboto',sans-serif;
             @media (max-width: 900px) {
          width: 100%;
         overflow: auto;
          height: 100%;
          z-index: 1;
          margin: 0%;
        
        
        }

  
    &__title{
  
        border: 1px gray solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;
        display: flex;
        justify-content: center;
       

    }
    &__form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__update{
        color: #ffd166;
        &:hover{
            font-weight: bold;
        }
    }
    &__done{
        color:#06d6a0
    }
}
*{
      box-sizing: border-box;
}
</style>