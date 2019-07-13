<template>
  <div id="app" class="h-screen">
    <timer
      v-if="opend"
      @close="opend = false"
      :focusTime="focusTime"
      :breakTime="breakTime"
      :workCycles="cycles"
    ></timer>

    <div class="flex flex-col justify-center items-center h-screen">

      <span class="font-medium">Focus Time</span>

      <div class="flex justify-center items-center mb-3">
        <button
          @click="focusTime--"
          :disabled="focusTime < 2"
          class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >-</button>

        <input
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="focusTime < 1 ? 'border-red-600' : 'border-transparent'"
          type="number"
          v-model="focusTime"
        >

        <button
          @click="focusTime++"
          class="bg-green-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >+</button>
      </div>

      <span class="font-medium">Break Time</span>

      <div class="flex justify-center items-center mb-3">
        <button
          @click="breakTime--"
          :disabled="breakTime < 2"
          class="bg-red-600 text-white font-bold flex justify-center items-center rounded w-8 h-8"
        >-</button>

        <input
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="breakTime < 1 ? 'border-red-600' : 'border-transparent'"
          type="number"
          v-model="breakTime"
        >

        <button
          @click="breakTime++"
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
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="cycles < 1 ? 'border-red-600' : 'border-transparent'"
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
        :disabled="focusTime < 1 || breakTime < 1 || cycles < 1"
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
        focusTime: 25,
        breakTime: 5,
        cycles: 5,
        opend: false
      }
    },
  }
</script>