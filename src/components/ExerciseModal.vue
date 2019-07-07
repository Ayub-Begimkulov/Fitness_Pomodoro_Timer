<template>
	<div>
		<div
      @click="$emit('close')"
      class="bg-black opacity-50 absolute w-full h-full z-20"
    ></div>

    <div class="absolute flex items-center justify-center w-full h-full">
      <div class="bg-white rounded w-3/4 max-w-xs p-4 z-30">

        <h3 class="text-center text-lg font-bold mb-3">It's time to warmp up. That's your exercises.</h3>

        <div
          v-for="(exercise, index) in randomExercises"
          :key="index"
          class="p-1 text"
        >{{ exercise }}</div>

      </div>
    </div>
	</div>
</template>

<script>
	export default {
		props: ['randomExercises']
	}
</script>