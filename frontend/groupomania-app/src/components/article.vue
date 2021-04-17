
<template>
<section class="result">
   <i @click="goback" class="fas fa-arrow-left "></i>
   <div class="result__block" > 
       <p v-if="done" class="done">C'est fait!</p>
       <div @click="deleteArticle" class="delete" v-if="success">supprimer</div>
       <div @click="showFormArticle" class="update" v-if="success">modifier</div>
                
                    <h2  class="result__block__article_title">  {{ article.title }} </h2>
                    
                    <p>{{ article.description}} </p>

                    <p class="createdBy"> {{ article.User.firstname}} {{ article.User.lastname}}</p>
                                          
            <form @submit="update" v-if="show" class="result__article_form">
           <i @click="closeForm" class="closeIcon">X</i>

                    <div class="result__article_form__div">
                        <label class="result__article_form__div__label" for="lastname">Modifier le titre </label>
                        <textarea @keyup="closeDone" v-model="article.title" class="result__article_form__div__textarea" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required ></textarea> 
                    </div>
                
                    <div class="result__article_form__div">
                        <label class="result__article_form__div__label" for="description">Modifier la description </label>
                        <textarea @keyup="closeDone" v-model="article.description" class="result__article_form__div__textarea" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
                    </div>
                    <input  type="submit" value="Modifier mes infos!" class=" succes" id="btn"> 
            
            </form>
           
                    <div>
                        
                      <h3 :id="'commentCount'+article.id"> Commentaires: </h3>
                    <Comments />
                    </div>
                </div>
</section>
</template>

<script>
import axios from 'axios'
import Comments from './comments.vue'
import { mapState } from 'vuex'




export default {
      computed: {
        ...mapState(['token'])
    },
  components: {
    Comments

  },
    name: 'Result',
    data(){
        return{
          
            article:[""],
        success:false,
        title:"",
        description:"",
        show:false,
        done:false,
        articleIdfromVuex: ""

        }    
    },
    methods:{
        showFormArticle(){
            this.show = true
        },
        closeForm(){
            this.show = false
        },closeDone(){
            this.done = false
        },
        goback(){
            this.$router.push({name:'articles'})
        },
       update(e){
     e.preventDefault();
    
                axios.put(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                     title: this.article.title,
                    description:this.article.description,

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
            
                this.show=false;
                this.done=true;
               

       },
       deleteArticle(){
        

           axios.delete(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                    }
                }
                )
                .then(response=>{
             console.log(response)
                  })
                .catch(error=>{
                    console.log(error,"error front end")
                })
                 setTimeout(() => {
                     this.$router.push({path:'/articles/'})
                 }, 1000);
                

       }
        

    },
   created(){
        

        
            this.title = `${this.$route.params.id}`
        
    },


    
  
     mounted(){
   
 
     axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                   headers:{
                   'Authorization': `bearer ${this.token}`
                        
                  }
             }).then(res=>{
       this.article =res.data;
        localStorage.setItem("articleId", res.data.id) 
         
                    axios.get(
                        `http://localhost:8080/api/articles/${this.$route.params.id}/comments`,
                        {
                         headers:{'Authorization': `bearer ${this.token}`},
                         })
                         .then((res)=>{
                             console.log(res)
                        
                   //   document.getElementById(`commentCount${this.$route.params.id}`).textContent =`${response.data.length} commentaire(s)`;
                      

                  })
                     
                   let userId = localStorage.getItem('userId')

                   if (userId == res.data.UserId){
                       this.success = true
                   }
     })
     
     }  
   



}    
</script>

<style lang="scss" scoped>

.result{
    width: 75vw;
    overflow: auto;
    z-index: 7;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
  
    &__block{
        position: relative;
        border: 1px gray solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;s
        &__article_title{
            font-family: 'Marck Script',cursive;
            
        }

    }
    &__article_form{
                        background-color: #ffd166;
                                        padding: 10px;


        &__div{

            display: flex;
            align-items: center;
            &__label{
                font-weight: bold;
            }
            &__textarea{
                display: flex;
                flex: 1;
                margin-top: 5px;
                margin-right: 30px;
                margin-left: 5px;
            }
            &__btn{
                border: 1px white solid;
                background-color: violet;
            }
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
.closeIcon{
    font-size: 1.5rem;
    position:absolute;
    right: 20px;
    &:hover{
        color: #ef476f;
     
    }
.fas{
    position:absolute;
    left: 10px;
    font-size: 10rem;

}
.createdBy{
    font-family: 'Marck Script',cursive;
}
}
</style>