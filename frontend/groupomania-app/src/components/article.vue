
<template>
<section class="result">
   <div class="result__block" > 
       <p v-if="done" class="done">C'est fait!</p>
       <div @click="deleteArticle" class="delete" v-if="success">supprimer</div>
       <div @click="showFormArticle" class="update" v-if="success">modifier</div>
                
                    <h2  class="result__block__article_title">  {{ article.title }} </h2>
                    
                    <p>{{ article.description}} </p>
                                          
            <form @submit="update" v-if="show" class="header__form">
                    <div class="header__form__div">
                        <label class="header__form__label" for="lastname">Modifier le titre </label>
                        <textarea @keyup="close" v-model="article.title" class="header__form__article_title" type="text"  name="lastname" id="lastname" aria-label="taper votre nom de famille" pattern="[ A-Za-z-0-9.@p{L}]{2,254}" required ></textarea> 
                    </div>
                
                    <div class="header__form__div">
                        <label class="header__form__label" for="description">Modifier la description </label>
                        <textarea @keyup="close" v-model="article.description" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre prénom" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>
                    
                    </div>
                    <input  type="submit" value="Modifier mes infos!" class="header__form__article_title__btn succes" id="btn"> 
            
            </form>
           
                    <div>
                        <h3 :id="'commentCount'+article.id"> Commentaires</h3>
               
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
          
            article:[""],
        success:false,
        title:"",
        description:"",
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
       update(e){
     e.preventDefault();
                let token = localStorage.getItem("Token");
    
                axios.put(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
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

           axios.delete(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
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
   created(){
        

        
            this.title = `${this.$route.params.id}`
            console.log("la route",)
        
    },
     beforeCreate(){
     let token = localStorage.getItem("Token");
     
 
     axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}`,{
                   headers:{
                   'Authorization': `bearer ${token}`
                        
                  }
             }).then(res=>{
                console.log(res)
       this.article =res.data;
          
                /*    axios.get(
                        `http://localhost:8080/api/articles/${data.id}/comments`,
                        {
                         headers:{'Authorization': `bearer ${token}`},
                         })
                         .then((commentsArray)=>{
                       console.log(document.getElementById(`${articleId}`))
                              document.getElementById(`commentCount${articleId}`).textContent =`${commentsArray.data.length} commentaire(s)`;
    

              
                               
   
                  })
                     */
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