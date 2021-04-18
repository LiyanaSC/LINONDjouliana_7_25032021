<template>
    <div>
         <div @click="deleteComment" v-show="showBtn" class=" btn_delete "  :id="'delete'+comment.id"> <span class="textBtn">Supprimer</span> <i class="fas fa-trash-alt"></i> </div>
       <div @click="openForm" v-show="showBtn"  class=" btn_update" :id="'update'+comment.id"> <span class="textBtn">Modifier</span> <i class="fas fa-pencil-alt"></i></div>
      
           <p  class="result__block__article_title" style="font-weight:bold"> {{ comment.User.firstname }} {{ comment.User.lastname }}</p>
                    
                    <p> {{ comment.content}} </p> 

          <form @submit="updateComment" v-if="show" class="header__form" :id="'form'+comment.id">

                    <div class="header__form__div">
                        <textarea  v-model="contentUpdate" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre commentaire" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
                    </div>
                    <input @click="closeForm" type="submit" value="Modifier mon commentaire!" class="header__form__article_title__btn succes" id="btn"> 
            
            </form>
    </div>
</template>

<script>
import axios from 'axios'



export default {
  
        name: 'Commentitem',
        data(){
            return{
                show:false,
               contentUpdate: "",
               showBtn:false,

            }
        },
    props:{
        comment:Object,

        
    },
    methods:{
        deleteComment(){
                let token =localStorage.getItem('Token')
              
              
                let articleId = localStorage.getItem("articleId")
    
                     axios.delete(`http://localhost:8080/api/articles/${articleId}/comments/${this.comment.id}`,{
                    headers:{
                        'Authorization': `bearer ${token}`
                        
                    }
                })
                .then((res)=>{
                        console.log(res)
                            this.$emit('commentsUpdate')

                 })
                 .catch(error=>{
                        console.log(error)
                  })
                    
         },
         openForm(){
             this.show=true
         },
        closeForm(){
           
             setTimeout(() => {
                   this.show=false
                   this.contentUpdate=""
             }, 1000);
         },
        
           updateComment(e){
               e.preventDefault();
                let token = localStorage.getItem("Token");
                let articleId = localStorage.getItem("articleId")
    
                axios.put(`http://localhost:8080/api/articles/${articleId}/comments/${this.comment.id}`,{
                     content: this.contentUpdate
                   

                },{
                    headers:{
                        'Authorization': `bearer ${token}`
                    }
                }
                )
                .then(response=>{
            console.log(response)
                this.$emit('commentsUpdate')

                  this.show=false
          

                })

                
                .catch(error=>{
                    console.log(error)
                })
     
       }  
               
                 
                
        
    },
    created(){
                    let userId= localStorage.getItem('userId')     
                        
                   if (userId == this.comment.UserId){
                       this.showBtn = true
                   }

   
                     
         
     }
    
}
</script>

<style lang="scss" scoped>
.textBtn{
     display: none;
    @media (max-width: 900px) {
      display: none;

        }
}
.fas{
    
  
      display: initial;

      
}
.btn_delete{
      
        width: initial;
        padding: 7px;
        position:absolute;
        right: 0;

}
.btn_update{
     
        width: initial;
        padding: 7px;
        position:absolute;
        right: 40px;

}
</style>