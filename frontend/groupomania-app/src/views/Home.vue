<template>
    <!-- _________________________             HOME VIEW (contained all "results" view)               ____________________________________ -->

  <section class="home">      <!-- _________________________ pincipale view after connexion ____________________________________ -->
    <i v-if="!show" @click="showSidebar" class="fas fa-plus-circle" aria-label="ouvrir la bar de navigation" ></i>     <!--  show the sidebad  -->
    <i  v-if="show" @click="hideSidebar" class="fas fa-times-circle" aria-label="fermer la bar de navigation"></i>          <!--  hide the sidebar  -->

         <!--  animated pic for decoration  -->
    <div  class="box_animated_pic"><img class="box_animated_pic__img" src="../assets/team.jpg" alt="photo d'une équipe"><img class="box_animated_pic__img__logo" src="../assets/icon-left-font-monochrome-white.png" alt="logo du groupe"></div>

         <!-- _________________________ the sidebar ____________________________________ -->
      <header  v-if="show" class="sidebar">
     <!--  AGILE avatar pic  -->
        <div class="sidebar__image"><img src="../assets/woman1.png" alt="avatar utilisateur" class="sidebar__image__url"></div>

             <!-- _________________________ navigation ____________________________________ -->
        <nav class="sidebar__nav">
             <ul class="sidebar__nav__list">
                    <li  @click="hideSidebar"> <router-link to="/user"> Mon profil</router-link></li>      <!--  user info  -->
                    <div class="line_80"></div>

                    <li @click="hideSidebar"><i class="far fa-list-alt"></i> <router-link to="/articles" >Tous les posts</router-link></li>      <!--  get all post  -->
                    
                    <li @click="hideSidebar"> <a href="#"><i class="fas fa-photo-video"></i> Médias</a> </li>      <!--  AGILE   -->
                    <li @click="hideSidebar"><a href="#"><i class="far fa-newspaper"></i> Articles</a></li>      <!-- AGILE -->
                    <div class="line_80"></div>
                    <li @click="hideSidebar"><i class="fas fa-shield-alt"></i><router-link to="/exemple2/"> À propos</router-link></li>      <!-- AGILE -->
                    <li @click="hideSidebar"><i class="fas fa-lock"></i><router-link to="/exemple1/"> Confidentialité</router-link></li>         <!--  AGILE  -->
                    <li @click="hideSidebar"><i class="fas fa-cogs"></i><router-link to="/delete"> Supprimer mon compte</router-link> </li>        <!--  delete account  -->
                    <div class="line_80"></div>
                    <li @click="disconnected"><i class="fas fa-power-off"></i> Déconnexion</li>      <!--  disconnect  -->


                </ul>
        </nav>
      
    </header>
  
       <!-- _________________________ render place (>900px on right)  ____________________________________ -->
    <div class="routes"> <router-view/> </div>
   

  </section>
</template>
<script >
import { mapState } from 'vuex' //store


export default {
  name:'home',
  data(){
    return{
      show:false
    }
  },
        computed: {
        ...mapState(['userId']) 
    },
  methods:{
      hideSidebar(){
     this.show=false
  },
    disconnected(){
      
     this.$store.commit('CLEAR_STORE')
    
     window.clearInterval()
     this.$router.push({path:'/'}) 
      console.log("c'est fini?",this.$store)

    },
    showSidebar(){
      this.show=true
    }

  },
mounted() { 
  console.log(this.userId)
if(this.userId <= 0 || this.userId == undefined ){         //verified user before enter
    this.$router.push({path:'/'})    //redirect
  }else{
  this.$store.dispatch("refreshMyToken") //start refresh

  }
}

}
</script>

<style lang="scss" scoped>
@keyframes loop { //animate pic
    0% {
            transform: ranslateX(0px);
    }
    100% {
    
        transform: translateX(-400px);
    }
}


.fa-plus-circle{ //open sidebar
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
.fa-times-circle{ //close sidebar
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
.routes{             // render 
  margin-left:25vw;
         @media (max-width: 900px) {
          margin: 20px
        }
}
.home{ //section
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
    width: 24.9vw;
    height: 100%;
   overflow: hidden;
    &__img{
      height: 100%;
       animation: loop 120s linear infinite alternate;
        @media (max-width: 900px) {
          display: none;
        }
    &__logo{
      width: 100%;
      position: absolute;
     bottom:0;
     padding: 5px;
    
    }
    }
      

}
.sidebar{
    position:fixed;
    overflow: auto;
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
    
    &__image{//box pic
        width: 80%;
        margin-top: 30px;
        &__url{//pic
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
.line_80{//decoration
        height: 1px;
    width: 80%;
    background-color: #fff;
    margin: 10px;
}
*{
      box-sizing: border-box;
}
</style>
