<template>
    <!-- _________________________             INDEX VIEW (contained all CONNEXION view )            ____________________________________ -->

    <main>             
         <div id="nav">
                  <header class="header"> <!-- _________________________ Groupomania's logo ____________________________________ -->
                    <img class="header__pic" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo du Groupe">
                  </header>
                  <div>
                    <!-- _________________________ routes ____________________________________ -->
                        <router-link to="/">Connexion</router-link> |
                        <router-link to="/singIn">Inscription</router-link>
                  </div>
                
              </div>
              <!-- _________________________ render place ____________________________________ -->
         <router-view/>
    </main>
</template>
<script>

export default {
    name:'index',
}
</script>

<style lang="scss"> //NOT SCOPED BE CAREFULL
*{
  box-sizing: border-box;
}
#app { //AN ID ELEMENT BE CAREFULL
   background-color: #118ab2;
   height: 100vh;
   width: 100vw;
   padding: 0%;
   margin: 0%;   
    @media (max-width: 900px) {
    overflow: auto;
        
        }
   
}
.header{//header part
     display: flex;
    justify-content: center;
    margin-bottom: 40px;
    &__pic{//logo

    @media (max-width: 900px) {
          width: 100%;
          padding: 5px;
  
        
        }    }
}

.section_index {
    display: flex;
    flex-direction: row;
    align-items: center
}
#nav {//AN ID ELEMENT BE CAREFULL
display: flex;
flex-direction: column;
align-items: center;

  a {//not scoped to aplly this on all of "a" element
    text-decoration: none;
    font-family: 'Fjalla One',sans-serif;
    font-weight: bold;
    color: #fff;
    &.router-link-exact-active {
      color: #06d6a0;

    }
  }
}
*{
      box-sizing: border-box;
}
</style>


