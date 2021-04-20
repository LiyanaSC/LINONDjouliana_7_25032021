
<template>
<section class="result">
    
    <!-- icon go back -->
   <i @click="goback" class="fas fa-arrow-left "></i>

   <div class="result__block" > 

       <!-- icon text done -->
       <p v-if="done" class="done">C'est fait!</p>
       <!-- icon delete -->
       <button @click="deleteArticle" class="delete" v-if="success"> <span class="textBtn">Supprimer</span> <i class="fas fa-trash-alt" aria-label="icône de suppression de l'article"></i></button>
       <!-- icon update -->
       <button @click="showFormArticle" class="update" v-if="success"> <span class="textBtn">Modifier</span> <i class="fas fa-pencil-alt" aria-label="icône de modification de l'article"></i></button>
             
        <h2  class="result__block__article_title">  {{ article.title }} </h2>                  
        <p>{{ article.description}} </p>
        <p class="createdBy">Auteur {{ article.User.firstname}} {{ article.User.lastname}}</p>

        <!-- _________________________ FORM: update article  ____________________________________ -->
        <form @submit="update" v-if="show" class="result__article_form">

            <!-- icon close form -->    
            <button @click="closeForm" class="closeIcon" aria-label="icône de fermeture du formulaire d'ajout d'article"> <i>X</i> </button>


            <div class="result__article_form__div"> <!-- textarea title --> 
                <label class="result__article_form__div__label" for="lastname">Modifier le titre </label>
                <textarea @keyup="closeDone" v-model="article.title" class="result__article_form__div__textarea" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required ></textarea> 
            </div>
        
            <div class="result__article_form__div">  <!-- textarea description --> 
                <label class="result__article_form__div__label" for="description">Modifier la description </label>
                <textarea @keyup="closeDone" v-model="article.description" class="result__article_form__div__textarea" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>            
            </div>

             <!-- btn --> 
            <input  type="submit" value="Modifier mes infos!" class=" succes" id="btn"> 
            
        </form>
       
       <!-- _________________________ BOX: comments ____________________________________ --> 
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
        ...mapState(['token','userId','admin'])
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
//METHODS show form to update the article with btn update
        showFormArticle(){
            this.show = true
        },
//METHODS hide form to update the article with icon close 
        closeForm(){
            this.show = false
        },
//METHODS hide the text "c'est fait" when keyup
        closeDone(){
            this.done = false
        },
//METHODS go back to all post   
        goback(){
            this.$router.push({name:'articles'})
        },
//METHOD update article 
       update(e){
     e.preventDefault();
                //PUT article
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
            
                this.show=false;//hide form to update the article
                this.done=true;//hide the text "c'est fait"
               

       },
//METHOD delete article 
       deleteArticle(){
           //DELETE the article (and his comments)
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
                     this.$router.push({path:'/articles/'})//go back to articles
                 }, 1000);
                

       }
        

    },
//CYCLE LIFE
   created(){
            this.title = `${this.$route.params.id}`//VERIF IS THAT USELESS
    },


     mounted(){

         //GET THE ARTICLE
     axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                   headers:{
                   'Authorization': `bearer ${this.token}`
                        
                  }
             }).then(res=>{
                    this.article =res.data;
                    localStorage.setItem("articleId", res.data.id) 
                    //GET all comments of this articles    
                /*   axios.get(
                        `http://localhost:8080/api/articles/${this.$route.params.id}/comments`,
                        {
                         headers:{'Authorization': `bearer ${this.token}`},
                         })
                         .then((res)=>{
                             console.log(res)
                           //   document.getElementById(`commentCount${this.$route.params.id}`).textContent =`${response.data.length} commentaire(s)`;
                            }).catch(err=>{
                                console.log(err)
                            })
                     
*/
                   if (this.userId == res.data.UserId || this.admin ==true){
                       this.success = true//to show btn if the user have rigth
                   }
     })
     
     }  
   



}    
</script>

<style lang="scss" scoped>

.result{//section
    width: 75vw;
    overflow: auto;
    z-index: 7;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    @media (max-width: 900px) {
          width: 100%;
          height: 100vh;
      overflow: auto;
      padding: 5px;
        
        }
    
  
    &__block{
        position: relative;
        border: 1px grey solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;
            @media (max-width: 900px) {
          width: 90vw;
          height: 100vh;
      overflow: auto;
      padding: 5px;
        
        }
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
      @media (max-width: 900px) {
      
        width: initial;
        padding: 7px;
        border-radius: 50%;
        position:absolute;
        right: 5px;
}
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
      @media (max-width: 900px) {
      
        width: initial;
        padding: 7px;
        border-radius: 50%;
        position:absolute;
        right: 40px;
}

}
.textBtn{
    @media (max-width: 900px) {
      display: none;

        }
}
.fas{
      display: none;
    @media (max-width: 900px) {
      display: initial;

        }
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
    background: none;
    border: none;
    &:hover{
        color: #ef476f;
     
    }
.fas{
    position:absolute;
    left: 10px;
    font-size: 10rem;

}

}
</style>