<template>
      <div @click="goToArticle" class="result__block" > 
                
                    <h2  class="result__block__article_title" >{{ article.title }} </h2>
                    <p id="createdBy">créateur {{ article.User.firstname }} </p>
                    <p>{{ article.description}} </p>
                    <div>
                        <h3 :id="'commentCount'+article.id"></h3>
                    </div>
                         
                    
             
                    </div>
</template>
<script>


export default{
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
