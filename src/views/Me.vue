<template>
  <div class="flex justify-center">
    <div class="bg-gray-200 w-1/4 rounded-2xl p-5">
      <div>
        <label for="name">Name : </label>
        <input type="text" name="name" id="name" :value="user.name" class="border-b-2 border-black mb-2 focus:outline-none bg-white" disabled>
      </div>
        
      <div>
        <label for="email">Email : </label>
        <input type="text" name="email" id="email" :value="user.email" class="border-b-2 border-black focus:outline-none bg-white" disabled>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Me',

  computed : {
    ...mapGetters({
      user : 'user'
    })
  },
}
</script>