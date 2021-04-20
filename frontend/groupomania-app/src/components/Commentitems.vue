<template>
    <div>
        <!-- icon delete -->
        <button @click="deleteComment" v-show="showBtn" class=" btn_delete "  :id="'delete'+comment.id"> <span class="textBtn">Supprimer</span> <i class="fas fa-trash-alt" aria-label="icône de suppression du commentaire"></i> </button>
        <!-- icon update -->
        <button @click="openForm" v-show="showBtn"  class=" btn_update" :id="'update'+comment.id"> <span class="textBtn">Modifier</span> <i class="fas fa-pencil-alt" aria-label="icône de modification du commentaire"></i></button>
        <!-- icon close update form -->
        <button @click="closeFormWithIcon" v-if="show" class="CloseIcon" aria-label="icône de fermeture du formulaire de modification du commentaire"><i>X</i> </button>  


        <p  class="result__block__article_title" style="font-weight:bold"> {{ comment.User.firstname }} {{ comment.User.lastname }}</p>
        <p> {{ comment.content}} </p> 

        <!-- _________________________ FORM: update comment ____________________________________ -->
        <form @submit="updateComment" v-if="show" class="header__form" :id="'form'+comment.id">

                <div class="header__form__div"><!--  textarea Comment to update -->
                    <textarea  v-model="contentUpdate" class="header__form__article_title__article_description" type="text" name="firstname" id="firstname" aria-label="taper votre commentaire" pattern="[ A-Za-z-0-9\p{L}]{2,254}" required></textarea>                    
                </div>
                
                <!-- btn  -->
                <input @click="closeForm" type="submit" value="Modifier mon commentaire!" class="header__form__article_title__btn succes" id="btn"> 
        
         </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'




export default {
  
        name: 'Commentitem',
        data(){
            return{
                show:false,
               contentUpdate: "",
               showBtn:false,

            }
        },
              computed: {
        ...mapState(['token','userId','admin'])
    },
    props:{
        comment:Object,
    },
    methods:{
//METHOD delete a comment
        deleteComment(){
                let articleId = localStorage.getItem("articleId")
                    //DELETE comment
                    axios.delete(`http://localhost:8080/api/articles/${articleId}/comments/${this.comment.id}`,{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                        
                    }
                })
                .then((res)=>{
                        console.log(res)
                            this.$emit('commentsUpdate')//emit to the parent

                 })
                 .catch(error=>{
                        console.log(error)
                  })
                    
         },
//METHOD show update form
         openForm(){
             this.show=true
         },
//METHOD hide update form with icon
         closeFormWithIcon(){
            this.show=false

         },
//METHOD hide update form with form
        closeForm(){
           
             setTimeout(() => {
                   this.show=false
                   this.contentUpdate=""
             }, 1000);
         },
//METHOD  update the comment
           updateComment(e){
               e.preventDefault();
                let articleId = localStorage.getItem("articleId")
                //PUT the comment
                axios.put(`http://localhost:8080/api/articles/${articleId}/comments/${this.comment.id}`,{
                     content: this.contentUpdate
                   

                },{
                    headers:{
                        'Authorization': `bearer ${this.token}`
                    }
                }
                )
                .then(response=>{
                    console.log(response)
                    this.$emit('commentsUpdate')//emit to the parent

                    this.show=false//hide update form
          

                }).catch(error=>{
                    console.log(error)
                })
     
       }  
               
                 
                
        
    },
//CYCLE LIFE
    created(){

                   if (this.userId == this.comment.UserId 	|| this.admin ==true){
                       this.showBtn = true
                   }

   
                     
         
     }
    
}
</script>

<style lang="scss" scoped>
.textBtn{//btn window width >900px text
     display: none;
    @media (max-width: 900px) {
      display: none;

        }
}
.fas{
    
      display: initial;
     
}
.btn_delete{
      
        width: initial;
        padding: 7px;
        position:absolute;
        right: 0;

        &:hover{
            color: #ef476f;
        }
}
.btn_update{
     
        width: initial;
        padding: 7px;
        position:absolute;
        right: 40px;

        &:hover{
            color: #ffd166;
        }
}
.CloseIcon{
        padding: 5px;
        position:absolute;
        right: 80px;
        font-size: 1.1rem;
        height: 2.04rem;
        width: 2.04rem;

        &:hover{
            color: #ef476f;
        }
}
</style>