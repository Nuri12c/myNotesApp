<template>
    <div v-if="showContainer"
      class="container"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <dayMonday
        class="card"
        :class="editClass(0)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />

      <dayTuesday
        class="card"
        :class="editClass(1)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
      <dayWednesday
        class="card"
        :class="editClass(2)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
      <dayThursday
        class="card"
        :class="editClass(3)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
      <dayFriday
        class="card"
        :class="editClass(4)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
      <daySaturday
        class="card"
        :class="editClass(5)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
      <daySunday
        class="card"
        :class="editClass(6)"
        :todayIndex="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"
      />
    </div>
</template>

<script>
import dayMonday from "./days/tomorrow+3Card.vue";
import dayTuesday from "./days/tomorrow+2Card.vue";
import dayWednesday from "./days/tomorrow+1Card.vue";
import dayThursday from "./days/HeroTodayCard.vue";
import dayFriday from "./days/yesterday-1Card.vue";
import daySaturday from "./days/yesterday-2Card.vue";
import daySunday from "./days/yesterday-3Card.vue";
import { mapGetters } from "vuex";

export default {
  name: "WeekApp",
  components: {
    dayMonday,
    dayFriday,
    dayTuesday,
    dayWednesday,
    daySaturday,
    daySunday,
    dayThursday,
  },
  data() {
    /* num это счетчик для стилей и 'перелистывания' а count это счетчик для перелистывания индекса дней прибавляется и уменьшаяется на 7*/
    return {
      daysNumbers: {
        Пн: { num: 7, count: 0 },
        Вт: { num: 6, count: 0 },
        Ср: { num: 5, count: 0 },
        Чт: { num: 4, count: 0 },
        Пт: { num: 3, count: 0 },
        Сб: { num: 2, count: 0 },
        Вс: { num: 1, count: 0 },
      },
      startX: 0,
      isDragging: false,
      dragOffset: 0,

      showContainer: true,
      showCombsApp: false,
      showBurger: false

    };
  },
  computed: {
    ...mapGetters("daysData", [
      "daysDATA",
    ]) /* обращение к дате , где создаются все дни недеи за 1 год, стоит доделать условия , если дни кончились*/,

    todayIndex() {
      /* функция находит индекс сегодняшнего числа в массиве обьектов всех дней */
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
  },

  methods: {
    touchStart(event) { /* эти несколько методов созданы лишь для перелистывания на мобилках , в дате есть соответствующие данные*/
      this.startX = event.touches[0].clientX;
      this.isDragging = true;
    },
    touchMove(event) {
      if (this.isDragging) {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - this.startX;
        this.dragOffset = deltaX;
      }
    },
    touchEnd() {
      this.isDragging = false;

      if (Math.abs(this.dragOffset) > 50) {
        if (this.dragOffset > 0) {
          this.nextValue();
        } else {
          this.prevValue();
        }
      }

      this.dragOffset = 0;
    },
    nextValue() {
      /* функция меняет значения num и id для эффекта перелистывания */
      for (const key in this.daysNumbers) {
        this.daysNumbers[key].num++;
        if (this.daysNumbers[key].num === 8) {
          this.daysNumbers[key].num = 1;
        }
      }
      for (const key in this.daysNumbers) {
        if (this.daysNumbers[key].num === 1) {
          this.daysNumbers[key].count -= 7;
        }
      }
    },
    prevValue() {
      /* функция меняет значения num и id  для эффекта перелистывания*/
      for (const key in this.daysNumbers) {
        this.daysNumbers[key].num--;
        if (this.daysNumbers[key].num === 0) {
          this.daysNumbers[key].num = 7;
        }
      }
      for (const key in this.daysNumbers) {
        if (this.daysNumbers[key].num === 7) {
          this.daysNumbers[key].count += 7;
        }
      }
    },
    editClass(dayIndex) {
      /* функция которая меняет классы исходя из значения num создавая перелистывание */
      const daysArray = Object.values(this.daysNumbers);
      return "card" + daysArray[dayIndex].num;
    },
  },
};
</script>

<style scoped>
</style>
