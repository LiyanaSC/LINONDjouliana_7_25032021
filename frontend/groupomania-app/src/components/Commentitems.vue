<template>
    <div>
         <div @click="deleteComment" class="delete"  :id="'delete'+comment.id">Supprimer </div>
       <div @click="openForm" class="update" :id="'update'+comment.id">modifier</div>
       
           <p  class="result__block__article_title" style="font-weight:bold"> {{ comment.User.firstname }} {{ comment.User.lastname }}</p>
                    
                    <p> {{ comment.content}} </p> 

          <form @submit="updateComment" v-if="show" class="header__form" :id="'form'+comment.id">

                    <div class="header__form__div">
                        <textarea @keyup="close" v-model="contentUpdate" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre commentaire" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
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
                show:false
            }
        },
    props:{
        comment:[],

        
    },
    methods:{
        deleteComment(){
                let token =localStorage.getItem('Token')
                console.log('là',token)
              
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
       /*  closeForm(){
         
         },*/
        
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
               
                 
                
        
    }
}
</script>

