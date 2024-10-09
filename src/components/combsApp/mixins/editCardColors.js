export default {
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    changeHexagonColor(newColor) {
      // Найдите стили SCSS в DOM
      const styleSheet = document.styleSheets[0];
      const rule = Array.from(styleSheet.cssRules).find(rule => rule.selectorText === '.hexagon');

      // Обновите значение переменной $primary-color
      rule.style.setProperty('--primary-color', newColor);
    },
      getDayOfWeekClass(dayName, dayNumber, dayMonth, dayYear) {

      switch (dayName) {
        case 'Пн':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#e6f5ed';
        }
        case 'Вт':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#e6f5ed';
        }
        case 'Ср':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#e6f5ed';
        }
        case 'Чт':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#e6f5ed';
        }
        case 'Пт':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#e6f5ed';
        }
        case 'Сб':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#d0fad2';
        }
        case 'Вс':
        if (`${dayNumber}.${dayMonth}.${dayYear}` === `${this.todayDate}`) {
          return '#5fbbf4';
        } else {
          return '#fda4a4';
        }
        default:
          return ''; // Класс по умолчанию, если день недели не найден
      }
    },

  },
};