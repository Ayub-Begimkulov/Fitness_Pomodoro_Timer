<template>
  <div id="app" class="h-screen">
    <timer
      v-if="opend"
      @close="opend = false"
      :workMinutes="workMinutes"
      :restMinutes="restMinutes"
      :workCycles="cycles"
    ></timer>

    <div text-white font-bold class="flex flex-col justify-center items-center h-screen">

      <span>Working minutes </span>

      <div class="flex justify-center items-center mb-3">
        <button @click="workMinutes--" class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">-</button>
        <input class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded" type="number" v-model="workMinutes">
        <button @click="workMinutes++" class="bg-blue-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">+</button>
      </div>

      <span>Rest minutes </span>

      <div class="flex justify-center items-center mb-3">
        <button @click="restMinutes--" class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">-</button>
        <input class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded" type="number" v-model="restMinutes">
        <button @click="restMinutes++" class="bg-blue-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">+</button>
      </div>

      <span>Cycles </span>

      <div class="flex justify-center items-center mb-3">
        <button @click="cycles--" class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">-</button>
        <input class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded" type="number" v-model="cycles">
        <button @click="cycles++" class="bg-blue-600 text-white font-bold flex justify-center items-center rounded w-10 h-10">+</button>
      </div>

      <button class="bg-blue-600 text-white font-medium px-4 py-1 rounded" @click="opend = true">Start</button>

    </div>

  </div>
</template>

<script>
  import Timer from './components/Timer'
  import './assets/css/main.css'

  export default {
    name: 'App',

    components: {
      Timer
    },

    data() {
      return {
        workMinutes: 25,
        restMinutes: 5,
        cycles: 5,
        opend: false
      }
    }
  }
</script>