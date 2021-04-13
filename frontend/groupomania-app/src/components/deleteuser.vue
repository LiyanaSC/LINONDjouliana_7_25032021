<template>

    <section class="delete">        

                <h2 class="delete__title"> Attention cette action est irreversible! </h2>
                    <p>On est triste de te voir partir {{ UserFirstName }} </p>
                    <p> Es-tu sure de vouloir nous Quitter?</p>
                    <p class="delete__deleted" @click="deleteUser">Je souhaites suprimer mon compte</p>
                   
                   
              
               
            

    </section>
</template>
<script>
import axios from 'axios'



export default {
  components: {
  },
    name: 'Delete',
    data(){
        return{
          
            UserFirstName:"",
         

        }
    },
methods:{

    deleteUser(e){
                        e.preventDefault();

        let token = localStorage.getItem("Token");
        let userId = localStorage.getItem("userId");


  axios.delete(`http://localhost:8080/api/users/${userId}`,{
                    headers:{
                        'Authorization': `bearer ${token}`
                        
                    }
                })
            .then((res)=>{
               
                   localStorage.removeItem("Token");
                   localStorage.removeItem("userId")


        console.log(res)
            })
           this.$router.push({path:'/'})
    },
    
}
   
    
}


</script>
<style lang="scss" scoped>

.delete{
    width: 75vw;
    overflow: auto;
    z-index: 7;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    font-family: 'Roboto',sans-serif;

  
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
    &__deleted{
        color: #ef476f;
        &:hover{
            font-weight: bold;
        }
    }
}
*{
      box-sizing: border-box;
}
</style>