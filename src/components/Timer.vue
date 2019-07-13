<template>
  <div class="absolute w-screen h-screen" :class="isWorking ? 'gradient-red' : 'gradient-blue'">

    <button @click="close" class="absolute top-0 right-0 m-4 z-10">
      <img class="w-4 h-4" src="../assets/img/close.svg" alt="close">
    </button>

    <button
      v-show="!isWorking"
      @click="showExercisesModal = true"
      class="absolute top-0 left-0 m-4 z-10"
    >
      <img class="w-5 h-5" src="../assets/img/muscles.svg" alt="close">
    </button>

    <exercise-modal
      v-show="showExercisesModal"
      :randomExercises="randomExercises"
      @close="showExercisesModal = false"
    ></exercise-modal>

    <div class="h-7/10">

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
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          class="text-6xl"
        >
          <tspan v-if="secondsLeft > 9">{{ minutesLeft }} : {{ secondsLeft }}</tspan>
          <tspan v-else>{{ minutesLeft }} : 0{{ secondsLeft }}</tspan>
        </text>
      </svg>

    </div>

    <div class="flex justify-center items-center h-3/10">

      <button v-show="!interval" class="bg-transparent flex justify-center items-center text-white border border-white rounded-full w-18 h-18" @click="startTimer">
        <span v-if="(minutesLeft === focusTime || minutesLeft === breakTime) && secondsLeft === 0">Start</span>
        <span v-else>Continue</span>
      </button>
      <button v-show="interval" class="bg-transparent flex justify-center items-center text-white border border-white rounded-full w-18 h-18" @click="pauseTimer">Pause</button>

    </div>

  </div>
</template>

<script>
  import ExerciseModal from './ExerciseModal'

  export default {
    props: ['focusTime', 'breakTime', 'workCycles'],

    components: {
      ExerciseModal
    },

    data() {
      return {
        minutesLeft: this.focusTime,
        cycles: this.workCycles,
        secondsLeft: 0,
        isWorking: true,
        interval: '',
        allExercises: ['push up', 'sit up', 'squat', 'plank', 'jumping jacks', 'high knees', 'plank to push up', 'inchworm', 'prone walkout', 'wall sit', 'burpees', 'lunge', 'lunge jump', 'triceps dips', 'diamond push-up', 'flutter kick', 'side plank', 'russian twist', 'shoulder bridge', 'side plank', 'squat thrusts'],
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
      if (typeof cordova !== 'undefined') cordova.plugins.backgroundMode.enable()
      this.startTimer()
    },

    beforeDestroy() {
      if (typeof cordova !== 'undefined') cordova.plugins.backgroundMode.disable()
    },

    methods: {
      startTimer() {
        let circle = this.$refs.circle
        let time = this.isWorking ? this.focusTime * 60 : this.breakTime * 60

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
            let audio = new Audio(require('../assets/audio/notification.mp3'))
            audio.play()
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
        this.minutesLeft = this.isWorking ? this.focusTime : this.breakTime
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