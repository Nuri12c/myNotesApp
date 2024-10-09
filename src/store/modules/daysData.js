const daysData = {
  namespaced: true,
  state: () => ({
    daysArray: getDaysArray(2024), // Инициализируем массив дней
    databaseUrl: 'https://myproga-96e3b-default-rtdb.firebaseio.com/users',
  }),
  mutations: {
    SET_DAYS_ARRAY(state, days) {
      state.daysArray = days;
    }
  },
  actions: {
    async fetchDaysData({ commit, state }) {
      try {
        const response = await fetch(`${state.databaseUrl}.json`); // Исправлено: добавлены кавычки
        const data = await response.json();

        // Получаем массив дней для указанного года
        const daysArray = getDaysArray(2024).map(day => {
          // Форматируем дату в строку для поиска в данных с сервера
          const dateString = `${day.number}.${day.month}.${day.year}`;
          const serverDataArray = data.users;
          const serverData = Object.values(serverDataArray).reduce((acc, item) => {
            if (item.ID === dateString) {
              acc.push(...item.text);
            }
            return acc;
          }, []);

          return {
           ...day,
            text: serverData // Присваиваем serverData свойству text напрямую
          };
        });
        commit('SET_DAYS_ARRAY', daysArray);

      } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
        // В случае ошибки, просто создаем daysArray локально
        commit('SET_DAYS_ARRAY', getDaysArray(2024));
      }
    },
  },
  getters: {
    daysDATA: state => state.daysArray
  },
};

function getDaysArray(year) {
  var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray = [];
  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  daysInWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };

  for (let month = 1; month <= 12; month++) {
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];

    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
      daysArray.push({
        year: year,
        month: month,
        number: (i + 1),
        day: daysInWeek[index++],
        text: [] // Изначально пустой массив
      });
      if (index == 7) index = 0;
    }
  }

  return daysArray;
}

export default daysData;
