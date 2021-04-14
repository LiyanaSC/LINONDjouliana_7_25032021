
<template>
<section class="result">
   <div class="result__block" > 
      
       <form @submit="form_submit" >                
                            <div class="header__form__div">
                                <textarea  v-model="content" class="header__form__article_title__article_description" type="textarea" name="description" id="description" placeholder="ajouter un commentaire..." aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                            
                            </div>
                            
                            <input  type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                    
     </form>
                <div v-for=" comment in commentArray" :key="comment.id" >

                     <p v-if="done" class="done">C'est fait!</p>
       <div @click="deleteArticle" class="delete"  :id="'delete'+comment.id">Supprimer </div>
       <div @click="showFormArticle" class="update" v-if="success">modifier</div>
       
                    <p  class="result__block__article_title"> {{ comment.User }} </p>
                    
                    <p> {{ comment.content}} </p>
                </div>                          
            <form @submit="update" v-if="show" class="header__form">
                    <div class="header__form__div">
                        <label class="header__form__label" for="lastname">Modifier le titre </label>
                        <textarea @keyup="close" v-model="article.title" class="header__form__article_title" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required ></textarea> 
                    </div>
                
                    <div class="header__form__div">
                        <label class="header__form__label" for="description">Modifier la description </label>
                        <textarea @keyup="close" v-model="content" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
                    </div>
                    <input  type="submit" value="Modifier mes infos!" class="header__form__article_title__btn succes" id="btn"> 
            
            </form>
          
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
        success:false,
        show:false,
        done:false

        }    
    },
    methods:{
        showFormArticle(){
            this.show = true
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
    
                axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                     title: this.article.title,
                    description:this.article.description,

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
            
                this.show=false;
                this.done=true;
               

       },
       deleteArticle(){
            let token = localStorage.getItem("Token");

           axios.delete(`http://localhost:8080/api/articles/`,{
                    headers:{
                        'Authorization': `bearer ${token}`
                    }
                }
                )
                .then(response=>{
             console.log(response)
                  })
                .catch(error=>{
                    console.log(error,"error front end")
                })
                 this.$router.push({path:'/articles/'})

       }
        

    },

     beforeCreate(){
     let token = localStorage.getItem("Token");
 
     axios.get(`http://localhost:8080/api/articles/${this.$store.state.articleId}/comments`,{
                   headers:{
                   'Authorization': `bearer ${token}`
                        
                  }
             })
            .then(res=>{
                                 

           res.data.forEach(data => {
               let userId =parseInt(localStorage.getItem("userId"))
               let id = parseInt(data.id)
                console.log("l",id) 
                                  console.log(document.getElementById(`delete${id}`) )

                    if (userId === data.UserId){
             //       document.getElementById(`delete${data.id}`).setAttribute('v-if','true')

                   }

                this.commentArray.push(data);

            
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