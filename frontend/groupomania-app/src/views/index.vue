<template>
    <div>             
         <div id="nav">
                  <header class="header">
                    <img class="header__pic" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo du Groupe">
                  </header>
                  <div>
                        <router-link to="/">Connexion</router-link> |
                        <router-link to="/singIn">Inscription</router-link>
                  </div>
                
              </div>
         <router-view/>
    </div>
</template>
<script>

export default {
    name:'index',
    components:{

    }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
#app {
   background-color: #118ab2;
   height: 100vh;
   width: 100vw;
   padding: 0%;
   margin: 0%;   
    @media (max-width: 900px) {
    overflow: auto;
        
        }
   
}
.header{
     display: flex;
    justify-content: center;
    margin-bottom: 40px;
    &__pic{

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
#nav {
display: flex;
flex-direction: column;
align-items: center;

  a {
    text-decoration: none;
    font-family: 'Fjalla One',
sans-serif;

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


