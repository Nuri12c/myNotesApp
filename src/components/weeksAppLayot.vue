<template>
  <body>
    <Header v-if="!showCombsApp" />
    <transition name="slider-fade">
    <sliderApp v-if="showSliderApp"
      class="container"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    />
  </transition>
    <transition name="combs-fade">
    <CombsApp :todayIndexp="todayIndex"
        :daysNumbers="daysNumbers"
        :daysDATA="daysDATA"  v-if="showCombsApp" />
    </transition>
    <transition name="burger-fade">
      <BurgerCard v-if="showBurger" />
    </transition>
    <Footer :showSliderApp="showSliderApp"
    :showCombsApp="showCombsApp" :showBurger="showBurger" @icon-click="handleIconClick" />
  </body>
</template>

<script>
import sliderApp from "./sliderApp/sliderApp.vue";
import Footer from "./footer/footer.vue";
import Header from "./header/header.vue";
import CombsApp from './combsApp/combs.vue'
import BurgerCard from "./burgerApp/BurgerCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "WeekApp",
  components: {
    Footer,
    Header,
    CombsApp,
    BurgerCard,
    sliderApp
  },
  data() {
    /* num это счетчик для стилей и 'перелистывания' а count это счетчик для перелистывания индекса дней прибавляется и уменьшаяется на 7*/
    return {
      startX: 0,
      isDragging: false,
      dragOffset: 0,

      showSliderApp: true,
      showCombsApp: false,
      showBurger: false

    };
  },
  computed: {
    ...mapGetters("daysData", [
      "daysDATA",
    ]) /* обращение к дате , где создаются все дни недеи за 1 год, стоит доделать условия , если дни кончились*/,


  },

  methods: {
    handleIconClick(icon) {
      if (icon === 'combs') {
        this.showCombsApp = true;
        this.showSliderApp = false;
        this.showBurger = false
      } else if (icon === 'container') {
        this.showCombsApp = false;
        this.showSliderApp = true;
        this.showBurger = false
      } else if (icon === 'burger') {
        this.showCombsApp = false;
        this.showSliderApp = false;
        this.showBurger = true
    }},

  },
};
</script>

<style scoped>
.sliderr-fade-enter-active {
  animation: fade 0.3s ease;
}

.slider-fade-enter,
.slider-fade-leave-to {
  opacity: 0;
}

.combs-fade-enter-active {
  animation: fade 0.3s ease;
}

.combs-fade-enter,
.combs-fade-leave-to {
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
.burger-fade-enter-active {
  animation: fade 0.6s ease;
}

</style>
