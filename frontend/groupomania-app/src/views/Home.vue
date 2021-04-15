<template>
  <div class="home">
      <header class="sidebar">
        <div class="sidebar__image"><img src="../assets/woman1.png" alt="avatar utilisateur" class="sidebar__image__url"></div>
        <nav class="sidebar__nav">
             <ul class="sidebar__nav__list">
                    <li class=""> <router-link to="/user"> Mon profil</router-link></li>
                    <div class="line_80"></div>

                    <li><i class="far fa-list-alt"></i> <router-link to="/articles">Tous les posts</router-link></li>
                    
                    <li><a href="#"><i class="fas fa-photo-video"></i> Médias</a> </li>
                    <li><a href="#"><i class="far fa-newspaper"></i> Articles</a></li>
                    <div class="line_80"></div>
                    <li><i class="fas fa-shield-alt"></i><router-link to="/exemple2/"> À propos</router-link></li>
                    <li><i class="fas fa-lock"></i><router-link to="/exemple1/"> Confidentialité</router-link></li>
                    <li><i class="fas fa-cogs"></i><router-link to="/delete"> Supprimer mon compte</router-link> </li>
                    <div class="line_80"></div>
                    <li @click="disconnected"><i class="fas fa-power-off"></i> Déconnexion</li>


                </ul>
        </nav>
      
    </header>
  
    <div class="routes"> <router-view/> </div>
   

  </div>
</template>
<script >

export default {
  name:'home',
  methods:{
    disconnected(){
        localStorage.clear()
        this.$router.push({path:'/'})


    }
  }
   
}
</script>

<style lang="scss" scoped>
*{
      box-sizing: border-box;
}
.routes{
  margin-left:25vw;
}
.home{
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position:absolute;
  top:0;
  z-index: auto;
  display: flex;
  flex-direction: row;
}
a{
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
}
.sidebar{
    position:fixed;
    left: 0;
    top: 0;
    width: 25vw;
    height: 100%;
    background-color: #ffd166;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__image{
        width: 80%;
        margin-top: 30px;
        &__url{
            width: 100%;
            border-radius: 50%;
        }
    }
    &__nav{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        &__list{
            width: 100%;
            list-style-type: none;
            font-family: 'Roboto',sans-serif;
            color: #fff;
            
            
        }

    }
    }
.line_80{
        height: 1px;
    width: 80%;
    background-color: #fff;
    margin: 10px;
}
</style>
