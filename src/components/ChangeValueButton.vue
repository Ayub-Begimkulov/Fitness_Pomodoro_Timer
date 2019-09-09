<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    class="text-white font-bold flex justify-center items-center rounded w-8 h-8"
    :class="[isIncrease ? 'bg-green-600' : 'bg-red-600']"
  >
    <span v-if="isIncrease">+</span>
    <span v-else>-</span>
  </button>
</template>

<script>
export default {
  name: 'ChangeValueButton',
  props: {
    isIncrease: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
};
</script>
