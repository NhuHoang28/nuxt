<template>
  <div>
    <span
      v-for="error in messages"
      :key="error"
    >
      {{ error }}
      <br>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    messages: {
      type: Array,
    },
  },
};
</script>
<style scoped>
</style>
