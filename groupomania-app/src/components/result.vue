<template>

    <section class="result" id="hello">

            <header class="header" > 
                
                    <p @click="open" class="header__create_post">Créer un post!</p>
                    <h2 v-if="!success" class="header__title"> PAGEMANIA</h2>

         <!-- _________________________ FORM: create article ____________________________________ -->

                    <form v-if="success"  @submit="form_submit" class="header__form">

                       <!-- close icon -->
                        <i @click="close" class="header__form__article_title__icon" aria-label="icône de fermeture du formulaire de création d'un nouveau post">X</i>


                            <div class="header__form__div"><!-- input title -->
                                <label class="header__form__label" for="title">Titre</label>
                                <textarea v-model="title" class="header__form__article_title" type="textarea" size="2,200" name="title" id="title" placeholder="Titre de l'article" aria-label="taper le titre de l'articlre" pattern="[ A-Za-z-0-9.@p{L}]{2,100000}" required > </textarea>
                            </div>
                        
                            <div class="header__form__div"><!-- input description-->
                                <label class="header__form__label" for="description">Texte</label>
                                <textarea  v-model="description" class="header__form__article_title__article_description" type="textarea" name="description" id="description" placeholder="description" aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                            
                            </div>
                            
                            <!-- btn -->
                            <input @click="closeForm" type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                    
                    </form>
                </header>        


         <!-- _________________________ BOX: for each article ____________________________________ -->
                <div class="result__block" v-for="article in articles"  v-bind:key="article.id" :id="article.id" > 
    
                        <Articleitems :article="article" />  
              
                </div>
                <i @click="pageByPage" v-show="moreArticle" class="fas fa-chevron-circle-down" ></i>
             
    </section>
</template>
<script>
import Articleitems from './Articleitems.vue'
import { mapState } from 'vuex'
import {getAllArticles, createArticle} from '../api/article.api'



export default {
  components: {
    Articleitems

  },
    computed: {
    ...mapState(['token'])
    },
    name: 'Result',
    data(){
        return{
          
            articles:[],
       
        success:false,
        title:"",
        description:"",
        page:0,
        added: 0,
        moreArticle:true
        }
    },

methods:{
//METHODopen form create article by text "créer un post"
    open(){ 
        this.success=true
    },

//METHOD close form create article by icon "X"
    close(){ 
        this.success=false

    },
//METHOD close one second form after POST
    closeForm(){ 
        setTimeout(() => {
            this.success=false
            this.title ="";
            this.description="";
        }, 1000);
    },

//METHOD create article
   form_submit(e){
                    e.preventDefault()
                    //POST new article
                    createArticle(this.title, this.description, this.token)
                    .then(response=>{
                         this.added++
                console.log("added",this.added)
                    console.log('ici',response.data)
                    this.articles.unshift(response.data) //added in articles array to update page
            
    
                    })
                    .catch(error=>{
                        console.log(error)
                    })               
                },
//METHOD pagination
pageByPage(){
    let page = this.page++
    console.log("coucou",page)
        //GET article 5 by 5
                getAllArticles(this.token, this.page,this.added)
                        .then(res=>{
                            if(res.data.length ==0){
                               this.moreArticle=false
                            
                            }
                            console.log("télécharger des article supp",res.data.length ==0)
                            res.data.forEach(data => {
                            this.articles.push(data)  //articles injected 
                                
                        });
              
                }).catch(err=>{
                        console.log(err)
                })
}

        

},
//LIFE CYCLE
mounted(){
        //GET articles
                getAllArticles(this.token, this.page,this.added)
                .then(res=>{
                        console.log(res)
                      this.articles =res.data; 
                }).catch(err=>{
                    console.log(err)
                })
    },


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
.fa-chevron-circle-down{
    font-size: 5rem;
    color: #118ab2;
}
*{
      box-sizing: border-box;
}

</style>