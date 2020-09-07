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
  top: 47px;
  left: 54px;
  @include textHide;
}
.logo {
  background: url("../assets/logo_white.svg");
  width: 162px;
  height: 162px;
  background-size: cover;
}
.smallLogo {
  width: 164px;
  height: 53px;
  background: url("../assets/logo_block.svg");
  background-repeat: no-repeat;
}
@media (max-width: 767px) {
  .logo {
    width: 121.5px;
    height: 121.5px;
    right: 0;
    left: 0;
    margin: auto;
  }
}
@media (max-width: 414px) {
  .logo {
    width: 81px;
    height: 81px;
  }
}
</style>
