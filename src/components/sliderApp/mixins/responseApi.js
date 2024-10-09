
export default {
  data() {
    return {
      databaseUrl: "https://myproga-96e3b-default-rtdb.firebaseio.com/users",
      path: `/users.json`,
    };
  },
  computed: {
    getFullDate() {
      return (
        this.getDateObj.number +
        "." +
        this.getDateObj.month +
        "." +
        this.getDateObj.year
      );
    },
  },
  methods: {
    async fetchDaysData() {
      try {
        const response = await fetch(`${this.databaseUrl}/users.json`);

        if (response.ok) {
          const data = await response.json();
          const daysData = Object.keys(data).map((key) => {
            const item = data[key];
            return {
              key,
              ID: item.ID,
              text: item.text ? item.text.map((note) => note.trim()) : [],
            };
          });

          // Remove empty text arrays
          const filteredDaysData = daysData.filter((item) => item.text.length > 0);

          this.setDaysData(filteredDaysData);
        } else {
          console.error("Ошибка при получении данных с сервера:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при получении данных с сервера:", error);
      }
    },
    async fetchUser() {
      // асинхронный метод fetchUser
      try {
        const response = await fetch(`${this.databaseUrl}${this.path}`);
        const data = await response.json();
        // Обработка данных
        return data;
      } catch (error) {
        console.error("Ошибка при чтении данных:", error);
      }
    },

    async saveUser(user) {
      try {
        const response = await fetch(`${this.databaseUrl}/users.json`);
        if (response.ok) {
          const data = await response.json();
          const key = Object.keys(data).find((key) => data[key].ID === user.ID);
          if (key) {
            // Объект существует, обновляем его
            const updateResponse = await fetch(
              `${this.databaseUrl}/users/${key}.json`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }
            );
            if (updateResponse.ok) {
              console.log("Данные сохранены!");
            } else {
              console.error(
                "Ошибка при сохранении данных:",
                updateResponse.status
              );
            }
          } else {
            // Объект не существует, создаем новый
            const createResponse = await fetch(
              `${this.databaseUrl}/users.json`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }
            );
            if (createResponse.ok) {
              console.log("Данные сохранены!");
            } else {
              console.error(
                "Ошибка при сохранении данных:",
                createResponse.status
              );
            }
          }
        } else {
          console.error("Ошибка при получении данных:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при сохранении данных:", error);
      }
    },
    async deleteUser(keyToDelete) {
      try {
        // Получаем данные с сервера
        const response = await fetch(`${this.databaseUrl}/users.json`);
        if (response.ok) {
          const data = await response.json();

          // Находим объект, соответствующий дате и ключу
          const userKey = Object.keys(data).find(
            (key) => data[key].ID === this.getDateObj.number + "." + this.getDateObj.month + "." + this.getDateObj.year
          );

          if (userKey) { // Если объект найден
            // Удаляем заметку с индексом keyToDelete из массива text
            data[userKey].text.splice(keyToDelete, 1);

            // Если удаляется последний ключ в обьекте, то text:""
            if (data[userKey].text.length === 0) {
              data[userKey].text = "";
            }

            // Обновляем данные на сервере
            const updateResponse = await fetch(
              `${this.databaseUrl}/users/${userKey}.json`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data[userKey]),
              }
            );

            if (updateResponse.ok) {
              console.log(
                `Заметка с индексом ${keyToDelete} удалена из данных с ID ${this.getDateObj.number}.${this.getDateObj.month}.${this.getDateObj.year}.`
              );
            } else {
              console.error(
                "Ошибка при удалении данных:",
                updateResponse.status
              );
            }
          } else {
            console.error(
              `Объект с ID ${this.getDateObj.number}.${this.getDateObj.month}.${this.getDateObj.year} не найден в базе данных.`
            );
          }
        } else {
          console.error("Ошибка при получении данных:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при удалении данных:", error);
      }
    },

  },
};