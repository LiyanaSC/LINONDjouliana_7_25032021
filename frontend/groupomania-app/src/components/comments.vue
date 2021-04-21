
<template>
<section class="commentResults">
   <div class="commentResults__block" > 
            <!-- _________________________ FORM: create comment ____________________________________ -->

                    <form @submit="form_submitComment" >                
                        <div > <!-- textaera description -->
                            <textarea  v-model="content" class="textaera" type="textarea" name="description" id="description" placeholder="ajouter un commentaire..." aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                        </div>
                        
                        <!-- btn -->
                        <input @click="updateVueComments" type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                
                    </form>
      
         <!-- _________________________ BOX: for each comment ____________________________________ -->
                <div v-for=" comment in commentArray" :key="comment.id" class="commentResults__block__comments">
                    <p v-if="done" class="done">C'est fait!</p>
                    <Commentitems :comment="comment" @commentsUpdate="updateComments"/>    
                </div>       
                 <i @click="commentByFive" class="fas fa-chevron-circle-down" ></i>                   
         
              
    </div>
</section>
</template>

<script>
import Commentitems from './Commentitems.vue'
import { mapState } from 'vuex'
import {getCommentsByArticleIdWithOffset,getCommentsByArticleIdWithLimit,createComment} from '../api/comment.api'


export default {   

  components: {
    Commentitems
  },

    name: 'Comments',
    data(){
        return{
      
        content: "",
        success:false,
        show:false,
        done:false,
        commentArray:[],
        page:1,
        added:0

        }    
    },    
      computed: {
        ...mapState(['token','userId','admin'])
    },
methods:{
//METHOD get 5 more comments 

    commentByFive(){
            let page = this.page++

       getCommentsByArticleIdWithOffset(this.$route.params.id, this.token, page,this.added)
            .then((res)=>{
                res.data.forEach(data => {
                    this.commentArray.push(data) 
                });
          }).catch(err=>{
              console.log(err)
          })
    },
//METHOD emit from children 
    updateComments(){

            //GET all comments
                    getCommentsByArticleIdWithLimit(this.$route.params.id, this.token, this.commentArray.length)
                    .then((res)=>{

                        this.commentArray =res.data
                    }).catch(err=>{
                        console.log(err)
                    })

    },
//METHOD show the form when is the good user or an admin
 /*       showFormComment(){
            this.commentArray.forEach(comment=>{
        const  form = document.getElementById(`form${comment.id}`)
IS THAT USELESS         
         if (this.userId === comment.UserId  || this.admin ==true ){
        form.removeAttribute('style')
         }
               console.log(form)
            })
        },

IS THAT USELESS
        close(){
            this.done = false
        },*/


//METHOD update with the new comment
         updateVueComments(){
                //GET all comment for this article for update
                             this.added++  
                          getCommentsByArticleIdWithLimit(this.$route.params.id, this.token, this.commentArray.length)
                        .then(res=>{
                                this.commentArray = res.data      
                                console.log(res)       
                                this.content ="";   //clear textarea
                                
                         })

        },
//METHOD create a new comment   
        form_submitComment(e){
            e.preventDefault()
                //POST new comment
                createComment(this.$route.params.id, this.content, this.token) 
                .then(response=>{
                    console.log(response.data, this.commentArray)
                    this.commentArray.unshift(response.data)

                })
                .catch(error=>{
                    console.log(error)
                })
        },
    },

//LIFE CYCLE
   mounted(){
       //GET all comments of this article
   
             getCommentsByArticleIdWithLimit(this.$route.params.id, this.token, 5)
            .then((res)=>{
                this.commentArray =res.data 
          }).catch(err=>{
              console.log(err)
          })
   }  
   

}   

</script>

<style lang="scss" >

.commentResults{//section
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
   border: 1px black solid;
       background-color: rgb(210, 241, 255);

   padding: 0%;
   margin: 0%;
  
    &__block{
        position: relative;
        width: 95%;
      
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;s
        &__comments{
              border: 1px #073b4c solid;
        border-radius: 20%;
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
.textaera{
width: 95%;
}
</style>