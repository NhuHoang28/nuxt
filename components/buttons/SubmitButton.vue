<template>
  <div>
    <BButton class="mt-2" type="submit" :style="{ backgroundColor: color }">
      {{ content }}
    </BButton>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
    },
    color: {
      type: String,
    },
  },
};
</script>
<style scoped>
button {
  width: 100%;
  min-height: 40px;
  border-radius: 12px !important;
  background-color: black;
  color: white;
  border: none;
}
</style>
