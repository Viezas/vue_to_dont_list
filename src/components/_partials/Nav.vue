<template>
  <div id="nav">
    <span v-if="user.token"><router-link :to="{name : 'Tasks'}">Tasks</router-link> | </span>
    <span v-if="!user.token"><router-link :to="{name : 'Login'}">Login</router-link> | </span>
    <span v-if="!user.token"><router-link :to="{name : 'Register'}">Register</router-link></span>
    <span v-if="user.token"><router-link :to="{name : 'Me'}">Account</router-link></span><br>
    <button v-if="user.token" class="border-2 border-red-900 bg-red-600 text-white py-1 px-5 rounded-full hover:bg-red-900" @click="logout(user.token)">Déconnexion</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
  name: 'Nav',
  data(){
    return {
      form : {
        email : '',
        password : ''
      },
      error : ''
    }
  },

  computed : {
    ...mapGetters({
      user : 'user'
    })
  },

  methods : {
    ...mapActions({
      clearState : 'clearState'
    }),

    logout(token){
      let init = {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      }
      fetch("https://to-dont-api.herokuapp.com/api/auth/logout", init)
      .catch(error => {console.log('error : ', error)})

      this.clearState()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>