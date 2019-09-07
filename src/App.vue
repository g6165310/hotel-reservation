<template>
  <div id="app">
    <loading :active.sync="isLoading" :opacity="1" :loader="'dots'"></loading>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  computed: {
    isLoading() {
      return store.state.isLoading;
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  font-family: "Noto Sans TC", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1260px;
  width: 100%;
  margin: auto;
}
</style>
