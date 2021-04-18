<template>

    <section class="result" id="hello">
            <header class="header" >
                
                    <p @click="open" class="header__create_post">Créer un post!</p>
                    <h2 v-if="!success" class="header__title"> PAGEMANIA</h2>
                
                    <form v-if="success"  @submit="form_submit" class="header__form">
                        <i @click="close" class="header__form__article_title__icon">X</i>
                            <div class="header__form__div">
                                <label class="header__form__label" for="title">Titre</label>
                                <textarea v-model="title" class="header__form__article_title" type="textarea" size="2,200" name="title" id="title" placeholder="Titre de l'article" aria-label="taper le titre de l'articlre" pattern="[ A-Za-z-0-9.@p{L}]{2,100000}" required > </textarea>
                            </div>
                        
                            <div class="header__form__div">
                                <label class="header__form__label" for="description">Texte</label>
                                <textarea  v-model="description" class="header__form__article_title__article_description" type="textarea" name="description" id="description" placeholder="description" aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                            
                            </div>
                            
                            <input  type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                    
                    </form>
                </header>        

                <div class="result__block" v-for="article in articles"  v-bind:key="article.id" :id="article.id" > 
                
                        <Articleitems :article="article" />  
                    
             
            

                
                </div>
             
    </section>
</template>
<script>
import axios from 'axios'
import Articleitems from './Articleitems.vue'


export default {
  components: {
    Articleitems

  },
    name: 'Result',
    data(){
        return{
          
            articles:[],
       
        success:false,
        title:"",
        description:"",
        }
    },

methods:{

 open(){
     this.success=true
 },
  close(){
     this.success=false
       this.title ="";
       this.description="";
 },

 form_submit(e){
                 e.preventDefault()
                let token = localStorage.getItem("Token");
    
                axios.post('http://localhost:8080/api/articles/',{
                     title: this.title,
                    description:this.description,

                },{
                    headers:{
                        'Authorization': `bearer ${token}`
                    }
                }
                )
                .then(response=>{
                console.log('ici',response.data)
                 this.articles.unshift(response.data)
           
  
                })
                .catch(error=>{
                    console.log(error)
                })
          
        
                
            }
    

},




/*beforeRouteEnter(route, redirecte, next) {
              
     let token = localStorage.getItem("Token");
 
     axios.get('http://localhost:8080/api/articles',{
                   headers:{
                   'Authorization': `Bearer ${token}`
                  }
             })
            .then(res=>{
                    console.log(res.data)
             next()
              this.articles =res.data;
            res.data.forEach(data => { 
           let articleId = data.id
                    axios.get(
                        `http://localhost:8080/api/articles/${articleId}/comments`,
                        {
                         headers:{'Authorization': `bearer ${token}`},
                         })
                         .then((commentsArray)=>{
                              document.getElementById(`commentCount${articleId}`).textContent =`${commentsArray.data.length} commentaire(s)`;
           
                            });
                  })
                     
              })
                    
    },*/
mounted(){
              let token = localStorage.getItem("Token");

    axios.get('http://localhost:8080/api/articles',{
                   headers:{
                   'Authorization': `bearer ${token}`
                        
                  }
             })
            .then(res=>{
       this.articles =res.data;
       console.log("ici",res.data)
            res.data.forEach(data => { 
           let articleId = data.id
       
           axios.get(`http://localhost:8080/api/articles/${articleId}/comments`,
                        {
                         headers:{'Authorization': `bearer ${token}`},
                         })
                         .then(()=>{


                         
                         

                                   
                            });

                        
                            });
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
        @media (max-width: 900px) {
          width: 100vw;
          height: 100vh;
          overflow: auto;
        
          
        }

  
    &__block{
  
        border: 1px gray solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;
    
        &__article_title{
            font-family: 'Marck Script',cursive;
           

        }

    }
}
.header{
    width: 75vw;
   display: flex;
   font-family: 'Fjalla One',sans-serif;
   justify-content: flex-start;
   background-color: #fff;
   padding: 10px;
   position: fixed;
   top: 0;
   right: 0;
          @media (max-width: 900px) {
          width: 100%;
        }
 
    
   &__title{
     
       display: flex;
       flex: 1;
        justify-content: center;
        font-size: 2rem;
        text-shadow:  1px 1px 2px  gray ;
   }
   &__create_post{
       margin: 20px;
       &:hover{
           color: #06d6a0;
       }
   }
   &__form{
       position: relative;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       flex:1;
       align-items: flex-start;
       &__div{
                  display: flex;
       flex-direction: row;
       width: 100%;
       margin: 5px;
      
       
       }
       &__label{
           margin: 5px;
       }
       &__article_title{
           display: flex;
           width: 50%;
           min-height: 30px;

        &__article_description{
            display: flex;
           min-height: 30px;
           width: 90%;


        }
        &__btn{
            height: 30px;
        }
        &__icon{
            position: absolute;
            top:5px;
            right: 15px;
            font-size: 1.5rem;
            &:hover{
                color: #ef476f;
            }
        }
    }
   }
    
}
*{
      box-sizing: border-box;
}

</style>