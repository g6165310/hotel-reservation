<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Background :hovering="hovering" />
    <Logo />
    <ContactInfo />
    <Navbar @sendHover="setHovering" :rooms="rooms" :isLoading="isLoading" />
    <div class="hovering-title" v-if="hovering.room">
      <span>{{ `0${hovering.index + 1}` }}</span>
      <h3>{{ hovering.room.name }}</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Logo";
import ContactInfo from "@/components/ContactInfo";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { mapActions } from "vuex";
import store from "@/store";
export default {
  name: "Home",
  components: {
    Logo,
    ContactInfo,
    Navbar,
    Background
  },
  computed: {
    rooms() {
      return store.state.rooms;
    },
    hovering() {
      return store.state.hovering;
    },
    isLoading() {
      return store.state.isLoading;
    }
  },
  methods: {
    ...mapActions(["getAllRooms"]),
    setHovering(room, index) {
      store.commit("setHovering", { room, index });
    }
  },
  async created() {
    await this.getAllRooms();
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.hovering-title {
  position: absolute;
  bottom: 70px;
  left: 70px;
  span {
    @include font(66, null, 98, null, #fff);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 10px;
      left: -4px;
      width: 86px;
      height: 20px;
      background: repeating-linear-gradient(
        45deg,
        rgba(252, 252, 252, 0.3),
        rgba(255, 255, 255, 0.3) 7px,
        #fff 7px,
        #fff 8px
      );
    }
  }
  h3 {
    @include font(24, 2.5, 36, null, #fff);
  }
}
</style>
