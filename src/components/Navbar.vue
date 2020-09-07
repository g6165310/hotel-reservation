<template>
  <div class="navbar" :class="{ active: !isLoading }">
    <ul>
      <li v-for="(room, index) in rooms" @mouseover="setHover(room, index)" :key="room.id">
        <router-link :to="{ name: 'room', params: { id: room.id } }">{{ room.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props: ["rooms", "isLoading"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    setHover(room, index) {
      this.$emit("sendHover", room, index);
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.navbar {
  position: absolute;
  right: 0;
  top: 50px;
  width: 305px;
  background-color: #fff;
  padding: 34px 37px;
  text-align: left;
  transform: translateX(100%);
  transition: 1s;
  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    right: 0;
    width: 280px;
    height: 20px;
    background: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3) 7px,
      #fff 7px,
      #fff 8px
    );
  }
  a {
    @include font(16, 1.5, 20);
    padding: 18.5px 0px;
    line-height: 20px;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    &:hover {
      &:before {
        position: absolute;
        content: "";
        width: 23px;
        height: 2px;
        background: #000;
        top: 50%;
        left: -35px;
        transform: translateY(-50%);
      }
    }
  }
  &.active {
    transform: translateX(0);
  }
}
@media (max-width: 767px) {
  .navbar {
    top: 175px;
    padding: 25px 27px;
  }
}
@media (max-width: 414px) {
  .navbar {
    top: 140px;
    padding: 17px 18px;
    &:after {
      height: 10px;
      bottom: -10px;
    }
    a {
      padding: 9px 0px;
    }
  }
}
</style>
