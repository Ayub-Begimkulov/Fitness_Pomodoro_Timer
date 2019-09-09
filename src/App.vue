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
        <ChangeValueButton @click="focusTime--" :isIncrease="false" :disabled="focusTime < 2" />

        <input
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="focusTime < 1 ? 'border-red-600' : 'border-transparent'"
          type="number"
          v-model="focusTime"
        />

        <ChangeValueButton @click="focusTime++" :isIncrease="true" />
      </div>

      <span class="font-medium">Break Time</span>

      <div class="flex justify-center items-center mb-3">
        <ChangeValueButton @click="breakTime--" :isIncrease="false" :disabled="breakTime < 2" />

        <input
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="breakTime < 1 ? 'border-red-600' : 'border-transparent'"
          type="number"
          v-model="breakTime"
        />

        <ChangeValueButton @click="breakTime++" :isIncrease="true" />
      </div>

      <span class="font-medium">Cycles</span>

      <div class="flex justify-center items-center mb-3">
        <ChangeValueButton @click="cycles--" :isIncrease="false" :disabled="cycles < 2" />

        <input
          class="bg-transparent text-center text-lg font-bold border-b w-24 p-1 mx-2 my-4"
          :class="cycles < 1 ? 'border-red-600' : 'border-transparent'"
          type="number"
          v-model="cycles"
        />

        <ChangeValueButton @click="cycles++" :isIncrease="true" />
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
import Timer from './components/Timer';
import ChangeValueButton from './components/ChangeValueButton';
import './assets/css/main.css';

export default {
  name: 'App',

  components: {
    Timer,
    ChangeValueButton
  },

  data() {
    return {
      focusTime: 25,
      breakTime: 5,
      cycles: 5,
      opend: false
    };
  }
};
</script>
