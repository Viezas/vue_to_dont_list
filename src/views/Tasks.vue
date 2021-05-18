<template>
  <div class="flex justify-center">
    <div class="bg-gray-200 rounded-2xl p-5 px-24">
      <p class="text-blue-600 text-2xl font-bold mb-5">Votre liste de choses à ne pas faire :</p>
      <div v-if="success" class="text-green-600 mb-2">
        {{ success}}
      </div>
      <button class="flex items-center justify-center border-2 border-blue-600 w-full bg-green-400 py-2 px-7 mb-10 rounded-full hover:bg-green-600 text-white" @click="add">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="blue">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Ajouter une tache
      </button>
      <div v-if="tasks.length > 0">
        <div v-for="task in tasks" :key="task" class="flex mb-2 text-left">
          <div v-if="task.done == true" class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div v-else class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p class="mr-2">{{ task.body }}</p>
          <div>
            <router-link :to="{name : 'Task'}" @click="passTack(task)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="orange">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </router-link>
          </div>
          <div class="ml-2">
            <button @click="removeTask(task, user.token)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { mapGetters } from "vuex"

export default {
  name: 'Tasks',
  data(){
    return {
      success : ''
    }
  },

  computed : {
    ...mapActions({
      fillTasks : 'fillTasks'
    }),
    ...mapGetters({
      tasks : 'tasks',
      user : 'user'
    })
  },

  mounted(){
    this.fillTasks
  },

  methods : {
    ...mapActions({
      fillTask : 'fillTask',
      remove : 'remove',
      clearTask : 'clearTask'
    }),

    add(){
      this.clearTask()
      this.$router.push({ name: 'Task' });
    },

    passTack(task){
      this.fillTask(task)
    },

    removeTask(task, token){
      let init = {
        method : 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },  
      }
      fetch(`https://to-dont-api.herokuapp.com/api/tasks/${task.id}`, init)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.success = data.success
          this.remove(task)
        }
      })
      .catch(error => {console.log('error : ', error)})
    }
  }
}
</script>
