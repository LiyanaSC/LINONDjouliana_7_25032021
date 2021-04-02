<template>
        <form method="POST" name="login" id="login" class="form">
                <div>
                    <label for="username">Identifiant</label>
                    <input type="text" name="username" id="username" placeholder="Votre matricule" aria-label="taper votre identifiant" pattern="[A-Za-z-0-9]{4,10}" required>
                </div>
                <div>
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe" aria-label="taper votre mot de passe" pattern="[A-Za-z-0-9\p{L}]{4,100}" required>
                </div>

                <div><input type="submit" value="Connexion" class="form__btn"></div>
            </form>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    name: 'Login',
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
.form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40;
            &__btn {
                   width: 200px;
    height: 40px;
    opacity: 1;
    background-color:#fff;
    border-radius: 20px;
    margin-top: 10px;
    border: 1px #fff solid;
    margin-bottom: 40px;
    &:hover {
        opacity: 0.9;
    }
            }
}
</style>