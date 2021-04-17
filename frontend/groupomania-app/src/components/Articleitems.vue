<template>
      <div @click="goToArticle" > 
                
                    <h2  class="result__block__article_title" >{{ article.title }} </h2>
                    <p>{{ article.description}} </p>
                    <div>
                        <h3 :id="'commentCount'+article.id"></h3>
                    </div>
                         
                                 <p id="createdBy" class="createdBy">créateur {{ article.User.firstname }} {{ article.User.firstname }}</p>

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
.createdBy{
    font-family: 'Marck Script',cursive;
}
</style>