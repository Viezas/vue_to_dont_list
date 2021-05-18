<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleSubmit" class="bg-gray-200 w-1/4 rounded-2xl p-5">
      <p v-if="error" class="text-red-600 mb-2">{{ error }}</p>
      <div class="mb-5">
        <label for="name">Name : </label><br>
        <input type="text" name="name" id="name" v-model="form.name" 
          class="border-b-2 border-black focus:outline-none"
        >
      </div>
      
      <div class="mb-5">
        <label for="email">Email : </label><br>
        <input type="text" name="email" id="email" v-model="form.email" 
          class="border-b-2 border-black focus:outline-none"
        >
      </div>  

      <div class="mb-5">
        <label for="password">Password : </label><br>
        <input type="password" name="password" id="password" v-model="form.password" 
          class="border-b-2 border-black focus:outline-none"
        >
      </div>

      <button type="submit" class="w-1/2 h-8 rounded-full bg-blue-600 text-white hover:bg-white hover:text-blue-600" :disabled="form.email.length == 0 || form.password.length == 0">Connexion</button>
    </form> 
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: 'Register',
  data(){
    return {
      form : {
        name : '',
        email : '',
        password : ''
      },
      error : ''
    }
  },

  methods : {
    ...mapActions({
      addUser : "addUser"
    }),

    handleSubmit(){
      let init = {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.form)
      }

      fetch("https://to-dont-api.herokuapp.com/api/auth/signin", init)
      .then(response => response.json())
      .then(data => {
        if (data.error){
          return this.error = data.error
        }
        this.addUser(data)
        this.$router.push({ name: 'Tasks' });
      })
    }
  }
}
</script>