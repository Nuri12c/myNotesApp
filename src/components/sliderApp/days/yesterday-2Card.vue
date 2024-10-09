<template>
  <div class="card_container">
    <div class="card__header">
      <div class="card__header_circle">{{ getDay }}</div>
      <div class="card__header_date">{{ getFullDate }}</div>
    </div>
    <div class="card__body">
      <ul>
        <li
          class="card__element"
          v-for="(text, index) in getDateObj.text"
          :key="index"
        >
          <div class="card__element_text">{{ text }}</div>
          <button
            class="card__element_button"
            @click="deleteText(index)"
          ></button>
        </li>
      </ul>
      <input
        placeholder="+ Добавить заметку"
        class="card__body_input"
        type="text"
        v-model="newText"
        @blur="addText"
        @keyup.enter="addText"
      />
    </div>
  </div>
</template>
<script>
import responseApi from "../mixins/responseApi";
export default {
  name: "leftLeftDay",
  mixins: [responseApi],
  props: {
    todayIndex: {
      type: Number,
      required: true,
    },
    daysNumbers: {
      type: Object,
      required: true,
    },
    daysDATA: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newText: "", // Введенный текст
    };
  },
  computed: {
    getDateObj() {
      return this.daysDATA[this.todayIndex + this.daysNumbers.Сб.count - 2];
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
      return this.daysDATA[this.todayIndex + this.daysNumbers.Сб.count - 2].day;
    },
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
    }, // этот метод добавляет текст на сервер обращаясь к папке mixin к функции в файле responseApi, там запросы лежат
  },
};
</script>

<style>
</style>