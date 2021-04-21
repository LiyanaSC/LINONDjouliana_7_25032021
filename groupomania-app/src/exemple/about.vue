<template>

    <section class="exemple">        

                <h2 class="exemple__title"> Ceci est un exemple de page "à propos"! </h2>
            
                   
                   
              
               
            

    </section>
</template>
<script>



export default {
  components: {
  },
    name: 'exemple2',
  
}


</script>
<style lang="scss" scoped>

.exemple{
    width: 75vw;
    overflow: auto;
    z-index: 7;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    font-family: 'Roboto',sans-serif;

  
    &__title{
  
        border: 1px gray solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: #073b4c;
        display: flex;
        justify-content: center;
                text-align: center;

       

    }
    &__deleted{
        color: #ef476f;
        &:hover{
            font-weight: bold;
        }
    }
}
*{
      box-sizing: border-box;
}
</style>