<template>
    <header class="sidebar">
        <div class="sidebar__image"><img src="../assets/woman1.png" alt="avatar utilisateur" class="sidebar__image__url"></div>
        <nav class="sidebar__nav">
             <ul class="sidebar__nav__list">
                    <li class=""><a href="./profil.html"> Mon profil</a></li>
                    <div class="line_80"></div>

                    <li><i class="far fa-list-alt"></i> <router-link to="/articles">Toutes les posts</router-link></li>
                        
                    <li><a href="#"><i class="fas fa-photo-video"></i> Médias</a> </li>
                    <li><a href="#"><i class="far fa-newspaper"></i> Articles</a></li>
                    <div class="line_80"></div>
                    <li><a href="#"><i class="fas fa-shield-alt"></i>À propos</a></li>
                    <li><a href="#"><i class="fas fa-lock"></i>Confidentialité</a></li>
                    <li><a href="#"><i class="fas fa-cogs"></i> Supprimer mon compte</a></li>
                    <div class="line_80"></div>
                    <li><a href="./index.html"><i class="fas fa-power-off"></i> Déconnexion</a></li>


                </ul>
        </nav>
     
    </header>
</template>
<script>

export default {
    name: 'Sidebar',
}
</script>
<style lang="scss" scoped>
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
