<template>

    <section class="exemple">        

                <h2 class="exemple__title"> Ceci est un exemple de page de confidentialité! </h2>
            
                   
                   
              
               
            

    </section>
</template>
<script>



export default {
  components: {
  },
    name: 'exemple1',
  
}


</script>
<style lang="scss" scoped>

.exemple{
    width: 75vw;
    overflow: auto;
    z-index: 7;
   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:150px;
    font-family: 'Roboto',sans-serif;

  
    &__title{
  
        border: 1px black solid;
        width: 80%;
        margin:40px;
        padding:10px;
        font-family: 'Roboto',sans-serif;
        color: rgb(14, 32, 65);
        display: flex;
        justify-content: center;
        text-align: center;
       

    }
  
}
*{
      box-sizing: border-box;
}
</style>