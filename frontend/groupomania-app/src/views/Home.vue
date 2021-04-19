<template>
  <div class="home">
    <i v-if="!show" @click="showSidebar" class="fas fa-plus-circle" ></i>
    <i  v-if="show" @click="hideSidebar" class="fas fa-times-circle"></i>
    <div  class="box_animated_pic"><img class="box_animated_pic__img" src="../assets/team.jpg" alt="photo d'une équipe"></div>
      <header  v-if="show" class="sidebar">
        <div class="sidebar__image"><img src="../assets/woman1.png" alt="avatar utilisateur" class="sidebar__image__url"></div>
        <nav class="sidebar__nav">
             <ul class="sidebar__nav__list">
                    <li  @click="hideSidebar"> <router-link to="/user"> Mon profil</router-link></li>
                    <div class="line_80"></div>

                    <li @click="hideSidebar"><i class="far fa-list-alt"></i> <router-link to="/articles" >Tous les posts</router-link></li>
                    
                    <li @click="hideSidebar"> <a href="#"><i class="fas fa-photo-video"></i> Médias</a> </li>
                    <li @click="hideSidebar"><a href="#"><i class="far fa-newspaper"></i> Articles</a></li>
                    <div class="line_80"></div>
                    <li @click="hideSidebar"><i class="fas fa-shield-alt"></i><router-link to="/exemple2/"> À propos</router-link></li>
                    <li @click="hideSidebar"><i class="fas fa-lock"></i><router-link to="/exemple1/"> Confidentialité</router-link></li>
                    <li @click="hideSidebar"><i class="fas fa-cogs"></i><router-link to="/delete"> Supprimer mon compte</router-link> </li>
                    <div class="line_80"></div>
                    <li @click="disconnected"><i class="fas fa-power-off"></i> Déconnexion</li>


                </ul>
        </nav>
      
    </header>
  
    <div class="routes"> <router-view/> </div>
   

  </div>
</template>
<script >
import { mapState } from 'vuex'


export default {
  name:'home',
  data(){
    return{
      show:false
    }
  },
        computed: {
        ...mapState(['token'])
    },
  methods:{
      hideSidebar(){
     this.show=false
  },
    disconnected(){
      
     this.$store.commit('CLEAR_STORE')
     console.log("c'est fini?",this.$store)

    },
    showSidebar(){
      this.show=true
    }

  },
beforeCreate(){
  if(this.token == ""){
    this.$router.push({path:'/'})
  }else{
  this.$store.dispatch("refreshMyToken")
  }
}

}
</script>

<style lang="scss" scoped>
@keyframes loop {
    0% {
            transform: ranslateX(0px);
    }
    100% {
    
        transform: translateX(-400px);
    }
}


.fa-plus-circle{
  color: #ffd166;
  position: fixed;
  top:10px;
 left: 10px;
  font-size: 4rem;
  z-index: 2;
      @media (max-width: 900px) {
      position: fixed;
          bottom: 10px;
          top:initial;
          left: initial;
          right: 10px;

        }
}
.fa-times-circle{
   color: #ef476f;
  position: fixed;
  top:10px;
 left: 10px;
  font-size: 4rem;
  z-index: 2;
    @media (max-width: 900px) {
      position: fixed;
          bottom: 10px;
          top:initial;
               left: initial;
          right: 10px;

        }
    
}
*{
      box-sizing: border-box;
}
.routes{
  margin-left:25vw;
         @media (max-width: 900px) {
          margin: 20px
        }
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
     @media (max-width: 900px) {
          justify-content: center;
          align-items: center;
          margin: 0%;
          padding:0%;
          overflow: hidden;
        }
  
}
a{
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
}
.box_animated_pic{
      position:fixed;
    left: 0;
    top: 0;
    width: 25vw;
    height: 100%;
   overflow: hidden;
    &__img{
      height: 100%;
       animation: loop 120s linear infinite alternate;
        @media (max-width: 900px) {
          display: none;
        }
    }
      

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
      @media (max-width: 900px) {
          width: 100%;
          height: 100%;
           position:absolute;
           overflow: auto;
          z-index: 1;
        }
    
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
*{
      box-sizing: border-box;
}
</style>
