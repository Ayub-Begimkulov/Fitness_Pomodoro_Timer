<template>
  <div class="absolute w-screen h-screen" :class="isWorking ? 'gradient-red' : 'gradient-blue'">
    <div style="height: 70%">

      <svg class="w-full h-full">
        <circle
          style="transform-origin: 50% 50%; transform: rotate3d(0, 1, 0, 180deg) rotate(-90deg)"
          ref="circle"
          cx="50%"
          cy="50%"
          r="150"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          fill="transparent"
        ></circle>

        <text
          v-if="secondsLeft > 9"
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          class="text-6xl"
        >{{ minutesLeft }} : {{ secondsLeft }}</text>

        <text
          v-else
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          class="text-6xl"
        >{{ minutesLeft }} : 0{{ secondsLeft }}</text>
      </svg>

    </div>

    <div class="flex justify-center items-center" style="height: 30%">

      <button v-show="!interval" class="bg-transparent flex justify-center items-center text-white focus:outline-none border border-white rounded-full w-16 h-16 p-4 " @click="startTimer">Start</button>
      <button v-show="interval" class="bg-transparent flex justify-center items-center text-white focus:outline-none border border-white rounded-full w-16 h-16 p-4 " @click="stopTimer">Stop</button>

    </div>

  </div>
</template>

<script>
  export default {
    props: ['workMinutes', 'restMinutes', 'cycles'],

    data() {
      return {
        minutesLeft: 0,
        secondsLeft: 0,
        isWorking: true,
        interval: ''
      }
    },

    computed: {
      circumference() {
        return 2 * Math.PI * this.$refs.circle.getAttribute('r')
      }
    },

    mounted() {
      this.minutesLeft = this.workMinutes
      this.startTimer()
    },

    methods: {
      startTimer() {
        let circle = this.$refs.circle
        let time = this.isWorking ? this.workMinutes * 60 : this.restMinutes * 60

        this.interval =  setInterval(() => {
          let percents = (this.secondsLeft + this.minutesLeft * 60) / time
          circle.setAttribute('stroke-dasharray', `${ percents * this.circumference } ${ (1 - percents) * this.circumference }`)

          if (this.secondsLeft > 0) {
            this.secondsLeft--
          } else if (this.minutesLeft > 0) {
            this.minutesLeft--
            this.secondsLeft = 59
          } else {
            this.stopTimer()
          }
        }, 1000)
      },

      stopTimer() {
        clearInterval(this.interval)
        this.interval = ''
        if (this.minutesLeft === 0 && this.secondsLeft === 0 && this.cycles > 0 && this.isWorking) {
          this.isWorking = !this.isWorking
          this.minutesLeft = this.restMinutes
          this.$refs.circle.setAttribute('stroke-dasharray', `${ this.circumference } 0`)
        } else if (this.minutesLeft === 0 && this.secondsLeft === 0 && this.cycles > 0 && !this.isWorking) {
          this.isWorking = !this.isWorking
          this.minutesLeft = this.workMinutes
          this.$refs.circle.setAttribute('stroke-dasharray', `${ this.circumference } 0`)
        }
      }
    }
  }
</script>