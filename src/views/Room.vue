<template>
  <div class="room" v-if="currentRoom.hasOwnProperty('name')" v-cloak>
    <Logo :isSmall="true" />
    <LightBox :roomImgs="currentRoom.imageUrl" @loadImgOver="updateLoading" />
    <section>
      <div class="room-info">
        <div class="room-info-name">{{ currentRoom.name }}</div>
        <div class="room-info-content">
          <p>
            房客人數限制:
            {{
              currentRoom.descriptionShort.GuestMin +
                "~" +
                currentRoom.descriptionShort.GuestMax
            }}人
          </p>
          <p>床型: {{ beds }}</p>
          <p>衛浴數量: {{ currentRoom.descriptionShort["Private-Bath"] }}間</p>
          <p>房間大小:{{ currentRoom.descriptionShort.Footage }} 平方公尺</p>
        </div>
        <div class="room-info-desc">
          <p>{{ currentRoom.description }}</p>
        </div>
        <div class="line">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="room-info-checkTime">
          <div class="check-in">
            <span>Check In</span>
            {{ currentRoom.checkInAndOut.checkInEarly }} —
            {{ currentRoom.checkInAndOut.checkInLate }}
          </div>
          <div class="check-out">
            <span>Check Out</span>
            {{ currentRoom.checkInAndOut.checkOut }}
          </div>
        </div>
        <div class="amenities">
          <div
            v-for="item in amenities"
            :key="item.name"
            :class="{ notProvide: !item.has }"
          >
            <img :src="require(`@/assets/${item.url}`)" alt />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="room-price">
        <div class="normalDayPrice">
          NT.{{ currentRoom.normalDayPrice }}
          <br />
          <span>平日(一~四)</span>
        </div>
        <div class="holidayPrice">
          NT.{{ currentRoom.holidayPrice }}
          <br />
          <span>假日(五~日、國定假日)</span>
        </div>
      </div>
      <div class="booking">
        <Calendar :booking="booking" />
        <div class="btn-booking" @click="isModalOpened = !isModalOpened">
          預約時段
        </div>
      </div>
    </section>
    <Modal
      :isModalOpened.sync="isModalOpened"
      :price="price"
      :bookedDate="booking"
      @updateLoading="updateLoading"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import store from "@/store";
import Logo from "@/components/Logo.vue";
import LightBox from "@/components/LightBox.vue";
import Calendar from "@/components/Calendar.vue";
import Modal from "@/components/Modal.vue";
export default {
  name: "Room",
  components: {
    Logo,
    LightBox,
    Calendar,
    Modal
  },
  data() {
    return {
      isModalOpened: false
    };
  },
  computed: {
    currentRoom() {
      return store.state.currentRoom;
    },
    beds() {
      const beds = this.currentRoom.descriptionShort.Bed;
      const types = {
        Single: "單人床",
        "Small Double": "小雙人床",
        Double: "雙人床",
        Queen: "加大雙人床"
      };
      let map = new Map();
      beds.forEach(bed => {
        if (map.get(types[bed])) {
          map.set(types[bed], map.get(types[bed]) + 1);
        } else {
          map.set(types[bed], 1);
        }
      });
      let result = "";
      map.forEach((val, key) => {
        result = result + `${key}x${val} `;
      });
      return result;
    },
    booking() {
      return store.state.booking.map(item => {
        return item.date;
      });
    },
    amenities() {
      const has = this.currentRoom.amenities;
      const amenities = [
        { name: "Wi-fi", url: "wifi.svg", has: has["Wi-Fi"] },
        {
          name: "電視",
          url: "television.svg",
          has: has["Television"]
        },
        {
          name: "漂亮的視野",
          url: "mountain-range.svg",
          has: has["Great-View"]
        },
        { name: "早餐", url: "breakfast.svg", has: has["Breakfast"] },
        {
          name: "空調",
          url: "breeze.svg",
          has: has["Air-Conditioner"]
        },
        {
          name: "禁止吸菸",
          url: "no-smoke-symbol.svg",
          has: has["Smoke-Free"]
        },
        { name: "Mini Bar", url: "bar.svg", has: has["Mini-Bar"] },
        { name: "冰箱", url: "fridge.svg", has: has["Refrigerator"] },
        {
          name: "適合兒童",
          url: "crawling-baby-silhouette.svg",
          has: has["Child-Friendly"]
        },
        {
          name: "Room Service",
          url: "room_service.svg",
          has: has["Room-Service"]
        },
        { name: "沙發", url: "sofa.svg", has: has["Sofa"] },
        { name: "寵物攜帶", url: "dog.svg", has: has["Pet-Friendly"] }
      ];
      return amenities;
    },
    price() {
      return {
        holidayPrice: this.currentRoom.holidayPrice,
        normalDayPrice: this.currentRoom.normalDayPrice
      };
    }
  },
  methods: {
    ...mapActions(["getAllRooms"]),
    updateLoading() {
      console.log("updateLoading");
      store.commit("setLoading", !store.state.isLoading);
    }
  },
  created() {
    store.commit("setLoading", true);
    store.dispatch("getRoom", this.$route.params.id);
  },
  destroyed() {
    store.commit("setCurrentRoom", {});
  }
};
</script>
<style lang="scss" scoped>
// .v-cloak {
//   display: none;
// }
.room {
  position: relative;
}
section {
  padding: 50px 30px;
  @include clearfix;
}
.room-info {
  width: 40%;
  float: left;
  margin-right: 2%;
  position: relative;
  &-name {
    @include font(36, 3.8, 54, 500);
    margin-bottom: 30px;
  }
  &-content {
    @include font(14, 1.5, 31);
    margin-bottom: 20px;
  }
  &-desc {
    @include font(12, 1.3, 20);
    margin-bottom: 15px;
  }
  &-checkTime {
    width: 100%;
    margin: 28px 0px 40px 0px;
    @include clearfix;
  }
}
.check-in,
.check-out {
  width: 50%;
  float: left;
  @include font(21, 2.2, 31);
  span {
    display: block;
    @include font(14, 1.5, 20);
  }
}
.amenities {
  background-color: #f0f0f0;
  width: 100%;
  padding: 30px 20px 0px 20px;
  @include clearfix;
  div {
    width: 32%;
    float: left;
    margin-bottom: 30px;
    margin-right: 2%;
    &:nth-child(3n) {
      margin-right: 0;
    }
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    span {
      @include font(12, 1.3, 18);
      margin-left: 18px;
    }
  }
  .notProvide {
    opacity: 0.3;
  }
}
.room-price {
  float: left;
  width: 20%;
  text-align: right;
  margin-top: 15px;
  margin-right: 3%;
  span {
    @include font(14, 1.5, #6d7278);
  }
  .normalDayPrice {
    @include font(30, 3.1, 27);
  }
  .holidayPrice {
    @include font(16, 1.7, 27);
  }
}

.line {
  span {
    border: 1px solid #000000;
    width: 15px;
    transform: rotate(45deg);
    display: inline-block;
  }
}
.booking {
  float: left;
  width: 35%;
}
.btn-booking {
  width: 118px;
  height: 53px;
  @include font(16, 1.7, 53, null, #fff);
  background-color: #575757;
  margin-top: 30px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    z-index: -1;
    top: 5px;
    left: 6px;
    width: 100%;
    height: 56px;
    content: "";
    background-image: repeating-linear-gradient(
      45deg,
      #000,
      #000 1px,
      rgba(255, 255, 255, 1) 0px,
      rgba(255, 255, 255, 1) 4px
    );
  }
}
</style>
