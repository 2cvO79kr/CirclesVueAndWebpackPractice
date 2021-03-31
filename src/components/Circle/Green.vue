<template>
  <div
    v-bind:class="{ non_active: !data.circles[2].status }"
    class="circle green"
  >
    {{ Math.ceil(data.count) }}
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
.green {
  background-color: rgb(28, 204, 69);
}
</style>