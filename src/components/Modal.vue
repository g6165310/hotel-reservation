<template>
  <div class="modal" v-if="isModalOpened">
    <div class="modal-body" v-if="isBooking">
      <div class="modal-title">預約時段</div>
      <div class="line">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="modal-form">
        <div class="input-container">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="name" />
          <small class="danger-info" v-if="validator.name.unverified">{{
            "* " + validator.name.msg
          }}</small>
        </div>
        <div class="input-container">
          <label for="phone">電話</label>
          <input type="tel" id="phone" v-model="phone" />
          <small class="danger-info" v-if="validator.phone.unverified">
            {{ "* " + validator.phone.msg }}
          </small>
        </div>
        <div class="input-container">
          <label>預約起迄</label>
          <DatePicker
            format="yyyy/M/dd"
            v-model="startDate"
            @input="clearEndDate"
            :disabled-dates="{
              to: today,
              from: lastDay,
              dates: bookDate
            }"
          />
          <span>~</span>
          <DatePicker
            format="yyyy/M/dd"
            :disabled="startDate == null"
            v-model="endDate"
            :disabled-dates="{
              to: startDate,
              from: lastDay,
              dates: bookDate
            }"
          />
          <small class="danger-info" v-if="validator.date.unverified">
            {{ "* " + validator.date.msg }}
          </small>
        </div>
      </div>
      <div class="price-detail" :class="{ hide: !endDate }">
        <div class="price-detail-day">
          <div>
            <span>平日時段</span>
            <span>{{ night.normal }}夜</span>
          </div>
          <div>
            <span>假日時段</span>
            <span>{{ night.holiday }}夜</span>
          </div>
        </div>
        <div class="price-detail-price">
          <span>=</span>
          NT.{{ Total }}
        </div>
      </div>
      <div class="modal-bottom">
        <div class="btn btn-cancel" @click="cancel">取消</div>
        <div class="btn btn-confirm" @click="validate">確定預約</div>
      </div>
    </div>
    <div class="modal-body" v-else>
      <div class="modal-title" v-if="errorMsg == ''">預約成功</div>
      <div class="modal-title" v-else>預約失敗</div>
      <div class="line">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src="../assets/tick-inside-circle.svg" alt v-if="errorMsg == ''" />
      <span class="errMsg" v-else>{{ errorMsg }}</span>
      <div class="modal-bottom">
        <div class="btn btn-confirm">
          <router-link to="/" v-if="errorMsg == ''">回首頁</router-link>
          <a v-else @click="reload">返回</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";
import moment from "moment";
export default {
  name: "Modal",
  inject: ["reload"],
  props: ["isModalOpened", "price", "bookedDate"],
  data() {
    return {
      name: "",
      phone: "",
      startDate: null,
      endDate: null,
      today: new Date(),
      lastDay: new Date(
        moment()
          .add(90, "days")
          .format()
      ),
      validator: {
        name: { unverified: false, msg: "" },
        phone: { unverified: false, msg: "" },
        date: { unverified: false, msg: "" }
      },
      isBooking: true,
      errorMsg: ""
    };
  },
  components: {
    DatePicker
  },
  computed: {
    bookDate() {
      return this.bookedDate.map(item => {
        return new Date(item);
      });
    },
    rangeOfDate() {
      const count = moment(this.endDate).diff(moment(this.startDate), "days");
      const arr = [];
      for (let i = 0; i <= count; i++) {
        arr.push(
          moment(this.startDate)
            .add(i, "days")
            .format("YYYY-MM-DD")
        );
      }
      return arr;
    },
    night() {
      if (this.startDate && this.endDate) {
        const diff =
          moment(this.endDate).diff(moment(this.startDate), "days") + 1;
        const holiday =
          diff % 7 === 6
            ? Math.floor(diff / 7) * 2 + 1
            : Math.floor(diff / 7) * 2;
        return {
          normal: diff - holiday,
          holiday: holiday
        };
      } else {
        return { normal: 0, holiday: 0 };
      }
    },
    Total() {
      return (
        this.price.holidayPrice * this.night.holiday +
        this.price.normalDayPrice * this.night.normal
      );
    }
  },
  methods: {
    cancel() {
      this.validator = {
        name: { unverified: false, msg: "" },
        phone: { unverified: false, msg: "" },
        date: { unverified: false, msg: "" }
      };
      this.startDate = null;
      this.endDate = null;
      this.$emit("update:isModalOpened", false);
    },
    clearEndDate() {
      if (!moment(this.endDate).isAfter(moment(this.startDate))) {
        this.endDate = null;
      }
    },
    validate() {
      //name
      const vm = this;
      const name = this.name.trim();
      if (name === "") {
        vm.validator.name.unverified = true;
        vm.validator.name.msg = "姓名不得為空";
      } else {
        vm.validator.name.unverified = false;
      }
      const re = /^[09]{2}[0-9]{8}$/;
      if (vm.phone == "") {
        vm.validator.phone.unverified = true;
        vm.validator.phone.msg = "電話不得為空";
      } else if (!re.test(vm.phone)) {
        vm.validator.phone.unverified = true;
        vm.validator.phone.msg = "電話格式不正確 ex:09********";
      } else {
        vm.validator.phone.unverified = false;
      }
      if (vm.startDate === null || vm.endDate === null) {
        vm.validator.date.unverified = true;
        vm.validator.date.msg = "請選擇日期";
      } else if (!this.checkDate()) {
        vm.validator.date.unverified = true;
        vm.validator.date.msg = "預約日期已被預約";
      } else {
        vm.validator.date.unverified = false;
      }
      if (
        !vm.validator.phone.unverified &&
        !vm.validator.name.unverified &&
        !vm.validator.date.unverified
      ) {
        vm.booking();
      }
    },
    checkDate() {
      const vm = this;
      return !this.bookedDate.find(item => {
        return moment(item).isBetween(vm.startDate, vm.endDate);
      });
    },
    booking() {
      const vm = this;
      vm.$emit("updateLoading");
      const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.$route.params.id}`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer ErWcgn221jmQgnbN4UHLxfKg4YSfiu0nIBMs4nU2UQEFCdB7ya0aaq5sHVMd"
      };
      this.axios({
        method: "POST",
        url: api,
        headers,
        data: {
          name: vm.name,
          tel: vm.phone,
          date: vm.rangeOfDate
        }
      })
        .catch(err => {
          if (err.response.status == 400) {
            vm.errorMsg = err.response.data.message;
          }
        })
        .finally(() => {
          vm.$emit("updateLoading");
          vm.isBooking = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.hide {
  opacity: 0;
}
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.8);
  &-body {
    width: 423px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 27px 42px;
    img {
      margin-top: 20px;
      width: 60px;
      height: 60px;
      display: block;
      margin: 20px auto;
    }
  }
  &-title {
    @include font(24, 2.5, 36, 500);
    margin-bottom: 12px;
  }
  &-form {
    margin-top: 30px;
  }
  &-bottom {
    @include clearfix;
  }
}
.input-container {
  margin-bottom: 15px;
  label {
    @include font(14, 1.4, null, 500);
    margin-right: 65px;
  }
  &::v-deep input {
    font-family: "Noto Sans TC", "Avenir", Helvetica, Arial, sans-serif;
    width: 243px;
    height: 32px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    @include font(18, null, null, 500);
    padding-left: 15px;
    &:focus {
      outline: none;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0px 100px #fff inset;
    }
  }
  &:last-child {
    label {
      margin-right: 33px;
    }
    > span {
      margin: 0 22.5px;
    }
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
.vdp-datepicker {
  display: inline-block;
  &::v-deep input {
    width: 94px;
    @include font(12, 1.3, null);
    padding-left: 10px;
  }
}
.price-detail {
  @include clearfix;
  margin-bottom: 30px;
  position: relative;

  &-day {
    background-color: #ededed;
    height: 70px;
    padding-top: 16px;
    > div {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: space-between;
    }
    span {
      @include font(12, 1.3, 18);
    }
    &:before,
    &::after {
      position: absolute;
      content: "";
      width: 42px;
      height: 70px;
      top: 0;
      background-color: #ededed;
    }
    &:before {
      left: -42px;
    }
    &:after {
      right: -42px;
    }
  }
  &-price {
    @include font(26, 2.7, 38, 500, #ff5c5c);
    float: right;
    margin-top: 8px;
    span {
      margin-right: 40px;
    }
  }
}

.btn {
  text-align: center;
  @include font(14, 1.5, 37);
  cursor: pointer;
  a {
    text-decoration: none;
    color: #fff;
  }
  &-cancel {
    float: left;
    background-color: #d8d8d8;
    width: 78px;
    color: #6d7278;
  }
  &-confirm {
    float: right;
    background: #484848;
    color: #fff;
    width: 107px;
  }
}
small {
  @include font(12, null, null, 500, #ff5c5c);
  margin-left: 95px;
}
.errMsg {
  @include font(14, 1.5, 20, 500);
  display: block;
  margin: 20px 0;
}
</style>
