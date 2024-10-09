export default {
  data() {
    return {
      touchStartY: 0,
      touchEndY: 0,
    };
  },
  computed: {

  },
  methods: {
    handleTouchStart(event) {
      this.touchStartY = event.touches[0].clientY;
    },

    
    handleTouchEnd(event) {
      this.touchEndY = event.changedTouches[0].clientY;

      const touchDistance = this.touchEndY - this.touchStartY;

      // Проверяем, было ли движение пальца достаточно большим, чтобы считать это жестом оттягивания
      if (Math.abs(touchDistance) > 200) {
        // Прокрутка вверх
        if (touchDistance > 0) {
          // Добавляем новые элементы в массив сверху
          this.AddPreviousWeek();
        }
        // Прокрутка вниз
        else {
          // Добавляем новые элементы в массив снизу
          this.AddNextWeek();
        }
      }
    },

  },
};