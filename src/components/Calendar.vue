<template>
  <div class="calendar">
    <div class="btn btn-pre" @click="adjustMonth(-1)"></div>
    <div class="btn btn-next" @click="adjustMonth(1)"></div>
    <div class="calendar-title">
      {{ this.calendar.year + " / " + (this.calendar.month + 1) }}
    </div>
    <div class="calendar-body">
      <div class="calendar-weekday">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="calendar-week" v-for="i in 6" :key="'week' + i">
        <div
          class="calendar-day"
          v-for="j in 7"
          :class="{ notInRange: inRange(i, j), isBooked: checkBooking(i, j) }"
          :key="i * j"
        >
          <span
            v-if="
              (i - 1) * 7 + (j - 1) >= firstDayInMonth &&
                (i - 1) * 7 + (j - 1) < firstDayInMonth + days
            "
            :data-date="
              `${calendar.year}-${calendar.month + 1}-${(i - 1) * 7 +
                (j - 1) -
                firstDayInMonth +
                1}`
            "
            >{{ (i - 1) * 7 + (j - 1) - firstDayInMonth + 1 }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Calendar",
  props: ["booking"],
  data() {
    return {
      calendar: {
        year: moment().year(),
        month: moment().month(),
        date: moment().date()
      },
      firstDayInMonth: moment()
        .startOf("month")
        .day(),
      days: moment().daysInMonth()
    };
  },
  components: {},
  methods: {
    adjustMonth(fix) {
      const date = moment(this.calendar);
      if (fix < 0) {
        date.subtract(1, "months");
      } else {
        date.add(1, "months");
      }
      this.calendar.year = date.year();
      this.calendar.month = date.month();
      this.calendar.date = date.date();
      this.firstDayInMonth = date.startOf("month").day();
      this.days = date.daysInMonth();
    },
    inRange(i, j) {
      const date = moment(
        `${this.calendar.year}-${this.calendar.month + 1}-${(i - 1) * 7 +
          (j - 1) -
          this.firstDayInMonth +
          1}`,
        "YYYY-MM-DD"
      );
      return (
        date.isSameOrBefore(moment().format("YYYY-MM-DD")) ||
        date.isSameOrAfter(moment().add(90, "days"))
      );
    },
    checkBooking(i, j) {
      const vm = this;
      const date = moment(
        `${this.calendar.year}-${this.calendar.month + 1}-${(i - 1) * 7 +
          (j - 1) -
          this.firstDayInMonth +
          1}`,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");
      return vm.booking.find(item => {
        return item === date;
      });
    }
  },
  computed: {},
  created() {
    console.log(moment().format("YYYY-MM-DD"));
  }
};
</script>

<style scoped lang="scss">
.calendar {
  background-color: #f7f7f7;
  position: relative;
  padding: 20px 30px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  &-title {
    margin: 0 auto;
    @include font(18, 1.9, 27, 500);
    margin-bottom: 30px;
    width: 50%;
    text-align: center;
  }
  &-weekday,
  &-week {
    display: flex;
    justify-content: space-around;
    text-align: center;
    @include font(18, 1.9, 29, null, #6d7278);
    margin-bottom: 15px;
  }
  &-weekday > div {
    flex: 1;
  }
  &-week {
    height: 30px;
    line-height: 30px;
  }
  &-day {
    width: 30px;
    height: 30px;
  }
}
.btn {
  display: inline-block;
  position: absolute;
  width: 15px;
  height: 15px;
  border-top: 2px #000 solid;
  border-left: 2px #000 solid;
  top: 7%;
  cursor: pointer;
  &-pre {
    left: 20%;
    transform: rotate(-45deg);
  }
  &-next {
    right: 20%;
    transform: rotate(135deg);
  }
}
.notInRange {
  color: #c9ccd0;
}
.isBooked {
  background: repeating-linear-gradient(
    45deg,
    #000,
    #000 1px,
    rgba(255, 255, 255, 0) 0px,
    rgba(255, 255, 255, 0) 4px
  );
}
</style>
