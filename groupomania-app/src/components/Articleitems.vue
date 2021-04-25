<template>
    <div class="block" @click="goToArticle" > 
                
                    <h2  class="result__block__article_title" >{{ article.title }} </h2>
                    <p>{{ article.description}} </p>
                         
                    <p :id="'createdBy'+article.id" class="author" >Auteur {{ article.User.firstname}} {{ article.User.lastname}}</p>

    </div>
</template>
<script>


export default {
    
    name: 'Articleitem',
    props:{
        article:Object,
        
    },
    methods:{
        goToArticle(){
            this.$router.push({path:`/articles/${this.article.id}`})
        }
    }
}
</script>
<style lang="scss" scoped>
.block{
    text-align: left;
}
.result__block__article_title{
   font-weight: bold;
}
.author{
    font-family: 'Marck Script',cursive; 
}
</style>