<template>
    <!-- _________________________             NOT FOUND VIEW               ____________________________________ -->

    <div class="background"> <!-- _________________________ box screen size ____________________________________ -->
        <p class="background__error_code">404</p>
        <p class="background__error_code">NOT FOUND</p>
    </div>
</template>



<script>

export default {
  name: 'Notfound',
}
</script>

<style lang="scss" scoped>
.background{//box
    position: absolute;
    top:0px;
    height: 100vh;
    width: 100vw;
    background-image: url( "../assets/icon.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    &__error_code{//message
        font-family: 'Roboto',sans-serif;
        font-size: 6rem;
        color: rgb(249, 216, 216);
        text-shadow: 4px 4px 13px #FFF;
        margin: 5px;
        

    }
   
}
</style>