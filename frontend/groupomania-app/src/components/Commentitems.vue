<template>
    <div>
         <div @click="deleteComment" class="delete"  :id="'delete'+comment.id">Supprimer </div>
       <div class="update" :id="'update'+comment.id">modifier</div>
       
           <p  class="result__block__article_title" style="font-weight:bold"> {{ comment.User.firstname }} {{ comment.User.lastname }}</p>
                    
                    <p> {{ comment.content}} </p> 
    </div>
</template>

<script>
import axios from 'axios'



export default {
  
        name: 'Commentitem',
    props:{
        comment:[],
        
    },
    methods:{
        deleteComment(){

              
                let articleId = localStorage.getItem("articleId")
    
                     axios.delete(`http://localhost:8080/api/articles/${articleId}/comments/${this.comment.id}`,{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                        
                    }
                })
                .then((res)=>{
                        console.log(res)
                         console.log(this.commentArray)
                 })
                 .catch(error=>{
                        console.log(error)
                  })
                    
         },
                   
               
                 
                
        
    }
}
</script>

