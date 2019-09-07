<template>
  <h1 :class="{ logo: !isSmall, smallLogo: isSmall }">
    <router-link to="/">White Space</router-link>
  </h1>
</template>
<script>
export default {
  name: "Logo",
  props: ["isSmall"]
};
</script>
<style lang="scss" scoped>
.logo,
.smallLogo {
  position: absolute;
  z-index: 10;
  top: 47px;
  left: 54px;
  @include textHide;
}
.logo {
  background: url("../assets/logo_white.svg");
  width: 162px;
  height: 162px;
}
.smallLogo {
  width: 164px;
  height: 53px;
  background: url("../assets/logo_block.svg");
  background-repeat: no-repeat;
}
</style>
