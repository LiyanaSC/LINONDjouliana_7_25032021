<template>
      <figure class="box_decoration">
            <img :data-url="url" class="box_decoration__pic" alt="photo de deux collègues portant un masque, si disant bonjour avec le coude">
    </figure>
</template>

<script>

export default {
    name: 'DecorationPic',
    props:{
        url:{
            type:String,
            required:true
            
        }
    },

  
}


</script>

<style lang="scss">

</style>
