<template>
  <div id="app" class="h-screen">
    <div style="height: 80%">

      <svg class="w-full h-full">
        <circle
          style="transform-origin: 50% 50%; transform: rotate3d(0, 1, 0, 180deg) rotate(-90deg) ;"
          ref="circle"
          cx="50%"
          cy="50%"
          r="200"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          fill="transparent"
        ></circle>

        <text
          v-if="seconds > 9"
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          class="text-6xl"
        >{{ minutes }} : {{ seconds }}</text>

        <text
          v-else
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          class="text-6xl"
        >{{ minutes }} : 0{{ seconds }}</text>
      </svg>

    </div>

    <div class="flex flex-col items-center">

      <input v-model="minutes" class="my-3 pb-2 border-b focus:outline-none border-indigo-600" type="text" placeholder="minutes">
      <input v-model="seconds" class="my-3 pb-2 border-b focus:outline-none border-indigo-600" type="text" placeholder="seconds">

      <button v-show="!interval" class="bg-blue-600 rounded px-2 py-1 m-2" @click="startTimer">Start Timer</button>
      <button v-show="interval" class="bg-red-600 rounded px-2 py-1 m-2" @click="stopTimer">Stop Timer</button>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
        minutes: 1,
        seconds: 0,
        interval: '',
        time: ''
      }
    },

    methods: {
      startTimer() {
        let circle = this.$refs.circle
        let circumference = 2 * Math.PI * circle.getAttribute('r')
        let time = this.seconds + this.minutes * 60

        this.interval =  setInterval(() => {
          let percents = (this.seconds + this.minutes * 60) / time
          circle.setAttribute('stroke-dasharray' ,`${ percents * circumference } ${ (1 - percents) * circumference }`)
          if (this.seconds > 0) {
            this.seconds--
          } else if (this.minutes > 0) {
            this.minutes--
            this.seconds = 59
          } else {
            this.stopTimer()
          }
        }, 1000)
      },

      stopTimer() {
        clearInterval(this.interval)
        this.interval = ''
      }
    }
  }
</script>