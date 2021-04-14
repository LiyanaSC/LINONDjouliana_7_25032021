
<template>
<section class="result">
   <div class="result__block" > 
      
       <form @submit="form_submit" >                
                            <div class="header__form__div">
                                <textarea  v-model="contentUpdate" class="header__form__article_title__article_description" type="textarea" name="description" id="description" placeholder="ajouter un commentaire..." aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                            
                            </div>
                            
                            <input  type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                    
     </form>
                <div v-for=" comment in commentArray" :key="comment.id" >

                     <p v-if="done" class="done">C'est fait!</p>
       <div class="delete"  :id="'delete'+comment.id">Supprimer </div>
       <div class="update" :id="'update'+comment.id">modifier</div>
       
                    <p  class="result__block__article_title"> {{ comment.User }} </p>
                    
                    <p> {{ comment.content}} </p> 

              <form @submit="update" class="header__form" :id="'form'+comment.id" style="display: none;">

                    <div class="header__form__div">
                        <textarea @keyup="close" v-model="content" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre commentaire" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
                    </div>
                    <input  type="submit" value="Modifier mes infos!" class="header__form__article_title__btn succes" id="btn"> 
            
            </form>
                </div>                          
     
          
                    <div>
                    
               
                    </div>
                </div>
</section>
</template>

<script>
import axios from 'axios'


export default {
  components: {

  },
    name: 'Result',
    data(){
        return{
        commentArray:[""],
        content: "",
        contentUpdate: "",
        success:false,
        show:false,
        done:false

        }    
    },
    methods:{
        showFormComment(){
        
            this.commentArray.forEach(comment=>{
                const userId = parseInt(localStorage.getItem("userId")) 
        const  form = document.getElementById(`form${comment.id}`)

         
         if (userId === comment.UserId  ){
        form.removeAttribute('style')
         }
               console.log(form)
            })
        },
        close(){
            this.done = false
        },
        form_submit(e){
                e.preventDefault();
                let token = localStorage.getItem("Token");
    
                axios.post(`http://localhost:8080/api/articles/${this.$store.state.articleId}/comments`,{
                     content: this.content
                   

                },{
                    headers:{
                        'Authorization': `bearer ${token}`
                    }
                }
                )
                .then(response=>{
        console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
       update(e){
               e.preventDefault();
                let token = localStorage.getItem("Token");
                let commentId = localStorage.getItem("commentId")
    
                axios.put(`http://localhost:8080/api/articles/${this.$store.state.articleId}/comments/${commentId}`,{
                     content: this.content
                   

                },{
                    headers:{
                        'Authorization': `bearer ${token}`
                    }
                }
                )
                .then(response=>{
        console.log(response)
                })

                
                .catch(error=>{
                    console.log(error)
                })
     
       }
        

        

    },

     beforeCreate(){
     let token = localStorage.getItem("Token");
 
     axios.get(`http://localhost:8080/api/articles/${this.$store.state.articleId}/comments`,{
                   headers:{
                   'Authorization': `bearer ${token}`
                        
                  }
             })
            .then((res)=>{
               this.commentArray = res.data             
      
     })
     
     },
     created(){


    let token = localStorage.getItem("Token");
 
     axios.get(`http://localhost:8080/api/articles/${this.$store.state.articleId}/comments`,{
                   headers:{
                   'Authorization': `bearer ${token}`
                        
                  }
             })
            .then((res)=>{
              res.data.forEach((data) => {
              //.push(data);

               let userId =parseInt(localStorage.getItem("userId"))
                let deleteBtn =document.getElementById(`delete${data.id}`)
                let updateBtn =document.getElementById(`update${data.id}`) 

                    if (userId !== data.UserId){
                deleteBtn.setAttribute('style',' display:none ')
                updateBtn.setAttribute('style',' display:none ')
                   }else{
                       console.log('en attente de commentaires d autres utilisateurs')
                   }

               updateBtn.addEventListener("click", function() {
                                 const  form = document.getElementById(`form${data.id}`)
                                const  SplitFormId = form.getAttribute("id")
                                const formId =SplitFormId.split("form")

        form.removeAttribute('style')
        localStorage.setItem("commentId", `${formId[1]}`)
               })

                   deleteBtn.addEventListener("click", function() {
                                const  form = document.getElementById(`form${data.id}`)
                                const  SplitFormId = form.getAttribute("id")
                                const formId =SplitFormId.split("form")

              function deleteComment(){

                let token = localStorage.getItem("Token");
                let articleId = localStorage.getItem("articleId")
    
                     axios.delete(`http://localhost:8080/api/articles/${articleId}/comments/${formId[1]}`,{
                    headers:{
                        'Authorization': `bearer ${token}`
                        
                    }
                }).then((res)=>{
                        console.log(res)
                 }).catch(error=>{
                                    console.log(error)
                  })
                    
                    }
                    deleteComment()
                    })
                


            
          // let articleId = data.id
                  
                  //            document.getElementById(`commentCount${articleId}`).textContent =`${commentsArray.data.length} commentaire(s)`;
    
                      
                     }) 
             })     
     }  
   
   

}    
</script>

<style lang="scss" scoped>

.result{
    width: 50vw;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
   border: 1px red solid;
   padding: 0%;
   margin: 0%;
  
    &__block{
        position: relative;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;s
        &__article_title{
            font-family: 'Marck Script',cursive;
            
        }

    }
}
.delete{
 color: #fff;
 background-color: #ef476f;
 position:absolute;
 border-radius: 10%;
 height: 30px;
 width: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 right: 10px;
 text-shadow: 1px 1px 2px black;
 box-shadow:1px 1px 2px black ;
}
.update{
 color: #fff;
 background-color: #ffd166;
  position:absolute;
 border-radius: 10%;
 height: 30px;
 width: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 right: 120px;
 text-shadow: 1px 1px 2px black;
 box-shadow:1px 1px 2px black ;

}
.done{
    position: absolute;
    right: 230px;
    top:5px;

 font-weight: bold;
 color: #06d6a0;
}
</style>