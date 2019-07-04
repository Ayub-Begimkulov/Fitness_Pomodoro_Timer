<template>
  <div class="absolute w-screen h-screen" :class="isWorking ? 'gradient-red' : 'gradient-blue'">

    <button @click="close" class="absolute focus:outline-none top-0 right-0 m-4 z-10">
      <img class="w-4 h-4" src="../assets/img/close.svg" alt="close">
    </button>

    <button
      v-show="!isWorking"
      @click="showExercisesModal = true"
      class="absolute focus:outline-none top-0 left-0 m-4 z-10"
    >
      <img class="w-5 h-5" src="../assets/img/muscles.svg" alt="close">
    </button>

    <div
      v-show="showExercisesModal"
      @click="showExercisesModal = false"
      class="bg-black opacity-50 absolute w-full h-full z-20"
    ></div>

    <div v-show="showExercisesModal" class="absolute flex items-center justify-center w-full h-full">
      <div class="bg-white rounded w-3/4 max-w-xs p-4 z-30">

        <h3 class="text-center text-lg font-bold mb-3">It's time to warmp up. That's your exercises.</h3>

        <div
          v-for="(exercise, index) in randomExercises"
          :key="index"
          class="p-1 text"
        >{{ exercise }}</div>

      </div>
    </div>

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
      <button v-show="interval" class="bg-transparent flex justify-center items-center text-white focus:outline-none border border-white rounded-full w-16 h-16 p-4 " @click="pauseTimer">Stop</button>

    </div>

  </div>
</template>

<script>
  export default {
    props: ['workMinutes', 'restMinutes', 'workCycles'],

    data() {
      return {
        minutesLeft: this.workMinutes,
        cycles: this.workCycles,
        secondsLeft: 0,
        isWorking: true,
        interval: '',
        allExercises: ['push up', 'sit up', 'squat', 'plank', 'jumping jacks', 'high knees'],
        randomExercises: [],
        showExercisesModal: false
      }
    },

    computed: {
      circumference() {
        return 2 * Math.PI * this.$refs.circle.getAttribute('r')
      }
    },

    mounted() {
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
            this.pauseTimer()
            if (this.isWorking && this.cycles > 1) {
              this.cycles--
              this.resetTimer()
              this.setRandomExercises()
              this.showExercisesModal = true
            } else if (!this.isWorking) {
              this.resetTimer()
            } else this.close()
          }
        }, 1000)
      },

      pauseTimer() {
        clearInterval(this.interval)
        this.interval = ''
      },

      resetTimer() {
        this.isWorking = !this.isWorking
        this.minutesLeft = this.isWorking ? this.restMinutes : this.workMinutes
        this.$refs.circle.setAttribute('stroke-dasharray', `${ this.circumference } 0`)
      },

      setRandomExercises() {
        let randomExercises = []

        while (randomExercises.length < 3) {
          let e = this.allExercises[this.getRandomInt(0, this.allExercises.length-1)]
          if (randomExercises.indexOf(e) === -1) randomExercises.push(e)
        }

        this.randomExercises = randomExercises
      },

      getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      },

      close() {
        if (this.interval) clearInterval(this.interval)
        this.$emit('close')
      }
    }
  }
</script>