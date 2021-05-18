<template>
<div v-if="task.hasOwnProperty('id')"  class="flex justify-center items-center">
  <form action="" @submit.prevent="update(task.id, user.token)" class="bg-gray-200 w-1/2 rounded-2xl p-5">
    <p class="text-2xl text-blue-600 mb-5">Formulaire de modification</p>
    <div v-if="success" class="text-green-600 mb-2">
      {{ success}}
    </div>
      <div class="mb-2 text-center">
        <label for="body">Tâche : </label>
        <input type="text" name="body" id="body" v-model="form.body" class="border-b-2 border-black mb-2 focus:outline-none bg-white" autofocus>
      </div>

      <div class="flex items-center justify-center mb-5">
        <label for="done">Fait : </label>
        <input type="checkbox" name="done" id="done" v-model="form.done" class="transform scale-150" :checked="form.done">
      </div>

      <button type="submit" class="border-2 border-blue-600 bg-green-400 text-white px-10 py-3 rounded-full hover:bg-green-600" :disabled="form.body === ''">Modifier la tache</button>
  </form>
</div>

<div class="flex justify-center items-center" v-else>
  <form action="" @submit.prevent="add(user.token)" class="bg-gray-200 w-1/2 rounded-2xl p-5">
  <div v-if="success" class="text-green-600 mb-2">
    {{ success}}
  </div>
  <p class="text-2xl text-blue-600 mb-5">Formulaire d'ajout</p>
    <div class="mb-2 text-center">
      <label for="body">Tâche : </label>
      <input type="text" name="body" id="body" v-model="form.body" class="border-b-2 border-black mb-2 focus:outline-none bg-white" autofocus>
    </div>

    <button type="submit" class="border-2 border-blue-600 bg-green-400 text-white px-10 py-3 rounded-full hover:bg-green-600" :disabled="form.body === ''">Crée une nouvelle tache</button>
  </form>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
  name: 'Task',
  data(){
    return {
      form : {
        body : '',
        done : false
      },
      success : '',
      error : ''
    }
  },

  computed : {
    ...mapGetters({
      task : 'task',
      user : 'user'
    })
  },

  mounted (){
    if (this.task) {
      this.form.body = this.task.body
      this.form.done = this.task.done
    }
  },

  methods : {
    ...mapActions({
      addTask : 'addTask'
    }),

    add(token) {
      let init = {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.form)
      }

      fetch("https://to-dont-api.herokuapp.com/api/tasks", init)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.success = data.success
          this.$router.push({ name: 'Tasks' });
        }
      })
    },

    update(id, token){
      let init = {
        method : 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.form)
      }

      fetch(`https://to-dont-api.herokuapp.com/api/tasks/${id}`, init)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.success = data.success
          this.$router.push({ name: 'Tasks' });
        }
      })
    }
  }
}
</script>
