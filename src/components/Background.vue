<template>
  <div
    class="bg"
    :style="{
      backgroundImage: hovering.hasOwnProperty('room')
        ? `url(${hovering.room.imageUrl})`
        : `url(${defaultBg})`
    }"
  ></div>
</template>
<script>
export default {
  name: "Background",
  data() {
    return {
      defaultBg:
        "https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
    };
  },
  props: ["hovering"]
};
</script>
<style lang="scss" scoped>
.bg {
  position: absolute;
  max-width: 1200px;
  z-index: -1;
}
</style>
