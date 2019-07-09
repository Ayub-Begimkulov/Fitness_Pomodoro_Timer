<template>
  <div id="app" class="h-screen">
    <timer
      v-if="opend"
      @close="opend = false"
      :workMinutes="workMinutes"
      :restMinutes="restMinutes"
      :workCycles="cycles"
    ></timer>

    <div class="flex flex-col justify-center items-center h-screen">

      <span class="font-medium">Working minutes</span>

      <div class="flex justify-center items-center mb-3">
        <button
          @click="workMinutes--"
          :disabled="workMinutes < 2"
          class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >-</button>

        <input
          class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded"
          type="number"
          v-model="workMinutes"
        >

        <button
          @click="workMinutes++"
          class="bg-green-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >+</button>
      </div>

      <span class="font-medium">Rest minutes</span>

      <div class="flex justify-center items-center mb-3">
        <button
          @click="restMinutes--"
          :disabled="restMinutes < 2"
          class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >-</button>

        <input
          class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded"
          type="number"
          v-model="restMinutes"
        >

        <button
          @click="restMinutes++"
          class="bg-green-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >+</button>
      </div>

      <span class="font-medium">Cycles</span>

      <div class="flex justify-center items-center mb-3">
        <button
          @click="cycles--"
          :disabled="cycles < 2"
          class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >-</button>

        <input
          class="bg-transparent text-center text-lg font-bold w-24 p-1 mx-2 my-4 rounded"
          type="number"
          v-model="cycles"
        >

        <button
          @click="cycles++"
          class="bg-green-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >+</button>
      </div>

      <button
        @click="opend = true"
        class="bg-blue-600 text-white font-medium px-4 py-1 rounded"
      >Start</button>

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