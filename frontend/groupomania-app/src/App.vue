<template>
  <div id="app">

              <div id="nav">
                  <header class="header">
                    <img src="./assets/icon-left-font-monochrome-white.svg" alt="Logo du Groupe">
                  </header>
                  <div>
                        <router-link to="/">Connexion</router-link> |
                        <router-link to="/singIn">Inscription</router-link>
                  </div>
                
              </div>
      <router-view/>
  </div>
</template>

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
   
}
.header{
     display: flex;
    justify-content: center;
    margin-bottom: 40px
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
</style>
