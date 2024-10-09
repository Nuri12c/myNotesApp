import { createStore } from 'vuex'; // Изменено на createStore


import daysData from './modules/daysData';

export default createStore({
  modules: {  daysData },
});
