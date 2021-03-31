<template>
  <div
    v-bind:class="{ non_active: !data.circles[1].status }"
    class="circle yellow"
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
.yellow {
  background-color: rgb(255, 248, 37);
}
</style>