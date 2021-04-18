
<template>
<section class="commentResults">
   <div class="commentResults__block" > 
      
       
                <div v-for=" comment in commentArray" :key="comment.id" class="commentResults__block__comments">

                     <p v-if="done" class="done">C'est fait!</p>
      
                 <Commentitems :comment="comment" @commentsUpdate="updateComments"/>

        
                </div>                          
     
          <form @submit="form_submitComment" >                
                            <div >
                                <textarea  v-model="content" class="textaera" type="textarea" name="description" id="description" placeholder="ajouter un commentaire..." aria-label="taper la description" pattern="[ A-Za-z-0-9\p{L}]{2,100000}" required></textarea>
                            
                            </div>
                            
                            <input @click="updateVueComments" type="submit" value="Envoyer" class="header__form__article_title__btn succes" id="btn">
                    
     </form>
                    <div>
                    
               
                    </div>
                </div>
</section>
</template>

<script>
import axios from 'axios'
import Commentitems from './Commentitems.vue'
import { mapState } from 'vuex'


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
        commentArray:[]

        }    
    },    
      computed: {
        ...mapState(['token','userId','admin'])
    },
methods:{
    updateComments(){

        
            axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}/comments`,{
                        headers:{
                        'Authorization': `bearer ${this.token}`
                                
                        }
                    })
                    .then((res)=>{

                        this.commentArray =res.data
                    })

    },
        showFormComment(){
        
            this.commentArray.forEach(comment=>{
        const  form = document.getElementById(`form${comment.id}`)
         
         if (this.userId === comment.UserId  || this.admin ==true ){
        form.removeAttribute('style')
         }
               console.log(form)
            })
        },
        close(){
            this.done = false
        },
         updateVueComments(){
            
                axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}/comments`,{
                            headers:{
                            'Authorization': `bearer ${this.token}`
                                    
                            }
                        })
                        .then(res=>{
                                this.commentArray = res.data      
                                console.log(res)       
                                this.content ="";       
                         })

        },


        
        form_submitComment(e){
            e.preventDefault()
            
    
                axios.post(`http://localhost:8080/api/articles/${this.$route.params.id}/comments`,{
                     content: this.content
                   

                },{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                    }
                })
                .then(response=>{
                    console.log(response.data, this.commentArray)
                    this.commentArray.push(response.data)

                })
                .catch(error=>{
                    console.log(error)
                })
        },
   
        

        

    },


   mounted(){

 
     axios.get(`http://localhost:8080/api/articles/${this.$route.params.id}/comments`,{
                   headers:{
                   'Authorization': `bearer ${this.token}`
                        
                  }
             })
            .then((res)=>{

                this.commentArray =res.data
                     res.data.forEach((data) => {
          
       

                let deleteBtn =document.getElementById(`delete${data.id}`)
                let updateBtn =document.getElementById(`update${data.id}`) 


                    if (this.userId !== data.UserId  	|| this.admin ==true){
                deleteBtn.setAttribute('style',' display:none ')
                updateBtn.setAttribute('style',' display:none ')
                   }else{
                       console.log('en attente de commentaires d autres utilisateurs')
                   }


                


            
          // let articleId = data.id
                  
                  //            document.getElementById(`commentCount${articleId}`).textContent =`${commentsArray.data.length} commentaire(s)`;
    
                      
                    }) 
          })     
   }  
   

}   

</script>

<style lang="scss" >

.commentResults{
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