<template>

    <section class="delete_accout">        

                <h2 class="delete_accout__title"> Attention cette action est irreversible! </h2>
                <p>On est triste de te voir partir {{ UserFirstName }} </p>
                <p> Es-tu sure de vouloir nous Quitter?</p>
                <p class="delete_accout__deleted" @click="deleteUser">Je souhaites suprimer mon compte</p>
                
    </section>
</template>
<script>
import {deleteUserById} from '../api/user.api'
import { mapState } from 'vuex'


export default {
  components: {
  },
    name: 'Delete',
    data(){
        return{
          
            UserFirstName:"",
         

        }
    },
          computed: {
        ...mapState(['token','userId'])
    },
methods:{
//METHOD delete account
    deleteUser(e){
    e.preventDefault();
    //DELETE user account (delete his articles and his comments)
            deleteUserById(this.userId, this.token)
            .then((res)=>{
                  console.log(res)
                   
            this.$store.commit('CLEAR_STORE')
             window.clearInterval()
            }).catch(err=>{
                console.log(err)
            })
              this.$router.push({path:'/'})
           
    },
    
}
   
    
}


</script>
<style lang="scss" scoped>

.delete_accout{//section
    width: 75vw;
    overflow: auto;
    background-color: #fff;
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
        color: #073b4c;
        display: flex;
        justify-content: center;
        text-align: center;
       
       

    }
    &__deleted{//text to confirm 
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