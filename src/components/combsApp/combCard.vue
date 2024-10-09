<template>

  <div class="comb__card" v-if="selectedDay">
    <button class="comb__card_close" @click="$emit('hide-card')"></button>
    <div class="comb__header">
      <div class="comb__day">{{ selectedDay.day }}</div>
      <div class="comb__date">{{ `${selectedDay.number}.${selectedDay.month}.${selectedDay.year}` }}</div>
    </div>


    <div class="comb__texts_body">
      <ul>
      <li class="comb__element" v-for="(text, index) in getDateObj.text" :key="index">
        <div class="comb__element_text">{{ text }}</div><button class="comb__element_button" @click="deleteText(index)"></button>
      </li>
    </ul>
      <input placeholder="+ Добавить заметку" class="comb__body_input" type="text" v-model="newText" @blur="addText" @keyup.enter="addText" />
    </div>

  </div>

</template>

<script>
import responseApi from '../sliderApp/mixins/responseApi';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      newText: "", // Введенный текст
    }
  },
  mixins: [responseApi],

  props: {
    selectedDay: Object,
  },
  methods: {

    deleteText(index) {
      // Удаляем текст из массива на странице
      this.getDateObj.text.splice(index, 1);

      this.deleteUser(index);
    },
    addText() {
      if (this.newText.trim() !== "") {
        this.getDateObj.text.push(this.newText);
        this.newText = "";
        this.saveUserData(); // Сохраняем данные сразу после добавления текста
      }
    }, // этот метод добавляет текст на странице
    saveUserData() {
      const user = {
        ID: this.getFullDate, // Используем computed свойство для получения даты
        text: this.getDateObj.text, // Используем массив текста из getDateObj
      };
      this.saveUser(user);
    },
  },
  computed: {
    ...mapGetters("daysData", [
      "daysDATA",
    ]),
    getIndex() {
      return this.daysDATA.findIndex(day => day.year === this.selectedDay.year && day.month === this.selectedDay.month && day.number === this.selectedDay.number);
    },
    getDateObj() {
      return this.daysDATA[this.getIndex]; // получить обьект дня
    }

  }
};
</script>
<style scoped>

</style>
