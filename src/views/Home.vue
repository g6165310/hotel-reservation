<template>
  <div
    class="home"
    :style="{
      backgroundImage: hovering.hasOwnProperty('room')
        ? `url(${hovering.room.imageUrl})`
        : `url(${defaultBg})`
    }"
  >
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Background :hovering="hovering" />
    <Logo />
    <Navbar @sendHover="setHovering" :rooms="rooms" :isLoading="isLoading" />
    <div class="hovering-title" v-if="hovering.room">
      <span>{{ `0${hovering.index + 1}` }}</span>
      <h3>{{ hovering.room.name }}</h3>
    </div>
    <ContactInfo />
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
  data() {
    return {
      defaultBg:
        "https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
    };
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
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  background-position: center;
  background-size: cover;
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
@media (max-width: 767px) {
  header {
    display: block;
    margin: 0 auto;
    padding: 0;
    margin-top: 47px;
  }
  .hovering-title {
    bottom: 50px;
  }
}
@media (max-width: 414px) {
  .hovering-title {
    display: none;
  }
}
</style>
