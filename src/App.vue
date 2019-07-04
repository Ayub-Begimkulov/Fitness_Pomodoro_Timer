<template>
  <div id="app" class="h-screen">
    <timer
      v-if="opend"
      @close="opend = false"
      :workMinutes="workMinutes"
      :restMinutes="restMinutes"
      :workCycles="cycles"
    ></timer>

    <div class="mb-4 shadow-md">
      <h1 class="text-xl font-bold p-3">Fitness Timer</h1>
    </div>

    <div class="flex flex-col items-center">
      <h2 class="font-bold text-lg">Working Time</h2>

      <input class="border p-1 my-4 rounded" type="text" v-model="workMinutes">

      <h2 class="font-bold text-lg">Rest Time</h2>

      <input class="border p-1 my-4 rounded" type="text" v-model="restMinutes">

      <h2 class="font-bold text-lg">Cycles</h2>

      <input class="border p-1 my-4 rounded" type="text" v-model="cycles">

      <button class="bg-blue-600 text-white font-medium px-4 py-1 rounded" @click="opend = true">Start</button>

    </div>

  </div>
</template>

<script>
  import Timer from './components/Timer'

  export default {
    name: 'App',

    components: {
      Timer
    },

    data() {
      return {
        workMinutes: 1,
        restMinutes: 1,
        cycles: 5,
        opend: false
      }
    }
  }
</script>