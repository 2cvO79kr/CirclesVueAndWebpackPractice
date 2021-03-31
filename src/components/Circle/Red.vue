<template>
  <div
    v-bind:class="{ non_active: !data.circles[0].status }"
    class="circle red"
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
.red {
  background-color: crimson;
}
</style>