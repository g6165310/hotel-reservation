<template>
  <div class="container">
    <div class="main-pic">
      <img :src="roomImgs[0]" @click="openLightBox(roomImgs[0], 0)" @load="loaded++" />
    </div>
    <div class="sub-pic">
      <img :src="roomImgs[1]" @click="openLightBox(roomImgs[1], 1)" @load="loaded++" />
      <img :src="roomImgs[2]" @click="openLightBox(roomImgs[2], 2)" @load="loaded++" />
    </div>
    <div class="lightbox" v-if="isActive" @click.self="closeLightBox">
      <div class="lightbox-img">
        <img :src="currentImg" alt />
      </div>
      <div class="lightbox-num">{{ this.currentIdx + 1 }}/3</div>
      <div class="btn lightbox-left-btn" @click="change('left')"></div>
      <div class="btn lightbox-right-btn" @click="change('right')"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LightBox",
  props: ["roomImgs"],
  data() {
    return {
      isActive: false,
      currentImg: "",
      currentIdx: null,
      loaded: 0
    };
  },
  methods: {
    openLightBox(url, idx) {
      this.currentImg = url;
      this.currentIdx = idx;
      this.isActive = true;
    },
    closeLightBox() {
      this.isActive = false;
    },
    change(direction) {
      if (direction === "left") {
        this.currentIdx - 1 >= 0 ? this.currentIdx-- : (this.currentIdx = 2);
      } else {
        this.currentIdx + 1 <= 2 ? this.currentIdx++ : (this.currentIdx = 0);
      }
      this.currentImg = this.roomImgs[this.currentIdx];
    }
  },
  watch: {
    isActive(newVal) {
      if (newVal) {
        document.getElementsByTagName("body")[0].style["overflow"] = "hidden";
        document.getElementsByTagName("body")[0].style["padding-right"] =
          "17px";
      } else {
        document.getElementsByTagName("body")[0].style["overflow"] = "auto";
        document.getElementsByTagName("body")[0].style["padding-right"] = "0px";
      }
    },
    loaded(newVal) {
      if (newVal === 3) {
        this.$emit("loadImgOver");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 596px;
  background-color: #000;
  @include clearfix;
  img {
    @include imgCenter;
    vertical-align: top;
    cursor: pointer;
  }
}
.main-pic {
  position: relative;
  max-width: 70%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  float: left;
}
.sub-pic {
  max-width: 30%;
  height: 100%;
  float: left;
  position: relative;
  img {
    width: 100%;
    height: 50%;
  }
}
.lightbox {
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.8);
  &-img {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &-num {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    @include font(16, 1.7, 24, null, #fff);
  }
  &-left-btn {
    background-image: url("../assets/chevron-left-solid.svg");
    left: 2%;
  }
  &-right-btn {
    background-image: url("../assets/chevron-right-solid.svg");
    right: 2%;
  }
  .btn {
    background-repeat: no-repeat;
    width: 40px;
    height: 50px;
    position: absolute;
    top: 50%;
    cursor: pointer;
  }
}
@media (max-width: 767px) {
  .container {
    height: 300px;
  }
  .main-pic {
  }
  .lightbox {
    &-img {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-num {
    }
    &-left-btn {
    }
    &-right-btn {
    }
    .btn {
      width: 20px;
    }
  }
}
@media (max-width: 414px) {
  .container {
  }
  .main-pic {
    max-width: 100%;
  }
  .sub-pic {
    display: none;
  }
}
</style>
