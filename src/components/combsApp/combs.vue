<template>
  <div class="combs__container">
    <transition name="comb__card"><combCard
      v-if="showCardValue === true"
      :selectedDay="selectedDay"
      @hide-card="hideCard"
    /></transition>

    <div
      v-for="(row, rowIndex) in rowsArr"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      :key="rowIndex"
      :class="[rowIndex % 2 === 0 ? 'row left_padding' : 'row', 'top_margin']"
    >
      <div
        v-for="(day, dayIndex) in row"
        @click="showCard(day)"
        :key="dayIndex"
        class="hexa"
      >
        <div
          :class="{ 'animate-from-bottom': day.animate }"
          :style="{
            'border-bottom-color': getDayOfWeekClass(
              day.day,
              day.number,
              day.month,
              day.year
            ),
          }"
          class="hexagon hexagon_colors hexagon_zero hexagon_triangle_up hexagon_triangle_up_large"
        ></div>
        <div
          :class="{ 'animate-from-bottom': day.animate }"
          :style="{
            'background-color': getDayOfWeekClass(
              day.day,
              day.number,
              day.month,
              day.year
            ),
          }"
          class="inside"
        >
          <div class="content">
            <div class="content__date">
              {{ day.day }}<br />{{ `${day.number}.${day.month}.${day.year}` }}
            </div>
          </div>
          <div v-if="day.text.length > 0" class="detector"></div>
        </div>
        <div
          :class="{ 'animate-from-bottom': day.animate }"
          :style="{
            'border-top-color': getDayOfWeekClass(
              day.day,
              day.number,
              day.month,
              day.year
            ),
          }"
          class="hexagon hexagon_colors hexagon_zero hexagon_triangle_down hexagon_triangle_down_large"
        ></div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import touchEvents from "./mixins/touchEvents";
import editCardColors from "./mixins/editCardColors";
import renderingWeeks from "./mixins/renderingWeeks";
import combCard from "./combCard.vue";
export default {
  name: "CombsApp",
  mixins: [touchEvents, editCardColors, renderingWeeks],
  components: {
    combCard,
  },
  data() {
    return {
      selectedDay: null,
      showCardValue: false,
    };
  },

  computed: {
    ...mapGetters("daysData", ["daysDATA"]),
    todayDate() {
      return `${new Date().getDate()}.${
        new Date().getMonth() + 1
      }.${new Date().getFullYear()}`;
    },
    todayIndex() {
      const todayNumber = new Date().getDate();
      const todayMonth = new Date().getMonth() + 1;
      const todayYear = new Date().getFullYear();

      return this.daysDATA.findIndex(
        (day) =>
          day.number === todayNumber &&
          day.month === todayMonth &&
          day.year === todayYear
      );
    },

    getDateObj() {
      return this.daysDATA;
    },

    getFullDate() {
      return (
        this.getDateObj.number +
        "." +
        this.getDateObj.month +
        "." +
        this.getDateObj.year
      );
    },

    getDay() {
      return this.daysDATA[this.todayIndex].day;
    },
  },

  methods: {
    showCard(day) {
      this.selectedDay = {
        day: day.day,
        number: day.number,
        month: day.month,
        year: day.year,
        text: day.text || [],
      };
      this.showCardValue = true;

    },

    hideCard() {
      this.showCardValue = false;
      
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.animate-from-top {
  animation: animate-from-top 0.5s ease-in-out;
}
.animate-from-bottom {
  animation: animate-from-bottom 0.5s ease-in-out;
}
@keyframes animate-from-top {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes animate-from-bottom {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.comb__card-enter-active {
  animation: fade 0.3s ease;
}

.comb__card-enter,
.comb__card-leave-to {
  opacity: 0;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>