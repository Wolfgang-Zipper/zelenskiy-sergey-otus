<template>
  <div>
    <h1>Настройки игры "Устный счет"</h1>
    <form @submit.prevent="startGame">
      <div>
        <label for="operationType">Тип вычислений:</label>
        <select id="operationType" v-model="settings.operationType">
          <option value="addition">Сложение</option>
          <option value="subtraction">Вычитание</option>
          <option value="multiplication">Умножение</option>
          <option value="division">Деление</option>
          <option value="mixed">Рандомно</option>
        </select>
      </div>
      <div>
        <label for="difficulty">Сложность:</label>
        <select id="difficulty" v-model="settings.difficulty">
          <option value="easy">Легко</option>
          <option value="medium">Средне</option>
          <option value="hard">Сложно</option>
        </select>
      </div>
      <div>
        <label for="roundTime">Время раунда (сек):</label>
        <input
          type="number"
          id="roundTime"
          v-model.number="settings.roundTime"
        />
      </div>

      <button type="submit">Начать игру</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: JSON.parse(localStorage.getItem("gameSettings")) || {
        operationType: "addition", // Значение по умолчанию для типа операции
        difficulty: "easy", // Значение по умолчанию для сложности
        roundTime: 30,
        numberOfTasks: 10, // Значение по умолчанию для количества задач
      },
    };
  },
  methods: {
    startGame() {
      localStorage.setItem("gameSettings", JSON.stringify(this.settings));
      this.$router.push({ name: "Game" });
    },
  },
};
</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

form {
  width: 100%;
}

label {
  color: #666;
  font-weight: bold;
  margin-bottom: 5px;
}

select,
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4cae4c;
}
</style>
