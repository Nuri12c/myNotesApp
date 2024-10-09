export default {
  data() {
    return {
      rowsArr: [],
      nextCounter: 8, // Индекс начала текущей недели
      previousCounter: 8,
    };
  },
  computed: {
    currentAndPreviousWeek() {
      const todayIndex = this.todayIndex;
      const daysInWeek = 28;

      // Индекс первого дня предыдущей недели
      let startPreviousWeek = todayIndex - daysInWeek;

      // Индекс последнего дня текущей недели
      let endCurrentWeek = todayIndex + daysInWeek - 1;

      // Проверка на выход за пределы массива (начало недели)
      if (startPreviousWeek < 0) {
        startPreviousWeek = 0;
      }

      // Проверка на выход за пределы массива (конец недели)
      if (endCurrentWeek >= this.daysDATA.length) {
        endCurrentWeek = this.daysDATA.length - 1;
      }

      // Фильтрация массива daysDATA для получения предыдущей и текущей недель
      const previousWeek = this.daysDATA.slice(startPreviousWeek, todayIndex);
      const currentWeek = this.daysDATA.slice(todayIndex, endCurrentWeek + 1);

      return [...previousWeek, ...currentWeek];
    },

    rows() {
      // Разбиваем currentAndPreviousWeek на две строки (по 7 дней)
      const rows = [];
      const daysPerRow = 4;

      for (let i = 0; i < this.currentAndPreviousWeek.length; i += daysPerRow) {
        rows.push(this.currentAndPreviousWeek.slice(i, i + daysPerRow));
      }

      return rows;
    },
    nextWeekForAdding() {
      const todayIndex = this.todayIndex;
      const daysInWeek = 28;
      let endCurrentWeek = todayIndex + daysInWeek - 1;
      return this.daysDATA.slice(
        endCurrentWeek + 1 + this.nextCounter,
        endCurrentWeek + 9 + this.nextCounter
      );
    },
    previousWeekForAdding() {
      const todayIndex = this.todayIndex;
      const daysInWeek = 28;
      let endCurrentWeek = todayIndex - daysInWeek;
      return this.daysDATA.slice(
        endCurrentWeek - 8 + this.previousCounter,
        endCurrentWeek + this.previousCounter
      );
    },
    nextWeekRowed() {
      const rows = [];
      const daysPerRow = 4;

      for (let i = 0; i < this.nextWeekForAdding.length; i += daysPerRow) {
        rows.push(this.nextWeekForAdding.slice(i, i + daysPerRow));
      }

      return rows;
    },
    previousWeekRowed() {
      // Разбиваем currentAndPreviousWeek на две строки (по 7 дней)
      const rows = [];
      const daysPerRow = 4;

      for (let i = 0; i < this.previousWeekForAdding.length; i += daysPerRow) {

        rows.push(this.previousWeekForAdding.slice(i, i + daysPerRow));
      }

      return rows;
    },
  },
  watch: {
    currentAndPreviousWeek: {
      immediate: true, // Выполнить обсервер при монтировании компонента
      handler() {
        this.rowsArr = this.rows;
      },
    },
  },
  methods: {
    removeAnimate() {
      setTimeout(() => {
        this.rowsArr.forEach(row => {
          row.forEach(day => {
            if (day.animate === true) {
               day.animate = false; // Удаляем строку animate: true
            }
          });
        });
      }, 1000); // Задержка в 1 секунду
    },
     AddNextWeek() {
    // Добавляем 7 дней в начало массива rowsArr
    this.nextCounter += 8; // Обновляем индекс конца

    // Добавляем анимацию к элементам, которые добавляются в массив
    const newDays = this.nextWeekRowed.map(row => row.map(day => ({ ...day, animate: true })));

    this.rowsArr.push(...newDays); // Добавляем неделю в начало rowsArr
  },

  AddPreviousWeek() {
    this.previousCounter -= 8; // Обновляем индекс конца

    // Добавляем анимацию к элементам, которые добавляются в массив
    const newDays = this.previousWeekRowed.map(row => row.map(day => ({ ...day, animate: true })));
    this.rowsArr.unshift(...newDays); // Добавляем неделю в конец rowsArr
    this.removeAnimate()
  },
  },
};
