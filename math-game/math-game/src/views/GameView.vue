<template>
  <div class="game-container">
    <h1>Игра "Устный счёт"</h1>
    <div v-if="!isGameOver && tasks.length > currentTaskIndex">
      <p>Оставшееся время: {{ timeRemaining }} сек.</p>
      <p>
        Задача {{ currentTaskIndex + 1 }}:
        {{ tasks[currentTaskIndex].question }}
      </p>
      <input type="number" v-model.number="currentAnswer" />
      <button @click="submitAnswer">Ответить</button>
    </div>
    <div v-else>
      <p>Конец игры! Ваш результат: {{ score }}/{{ tasks.length }}</p>
      <button @click="restartGame">Начать заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // загружаю настройки из localStorage либо используем значения по умолчанию
      settings: JSON.parse(localStorage.getItem("gameSettings")) || {
        operationType: "addition",
        difficulty: "easy",
        roundTime: 30,
        numberOfTasks: 10,
      },
      tasks: [],
      currentTaskIndex: 0,
      currentAnswer: "",
      isGameOver: false,
      timer: null,
      timeRemaining: 0,
      scoreSettings: JSON.parse(localStorage.getItem("gameScore")) || {
        score: 0,
        numberScore: 1,
      },
    };
  },
  mounted() {
    this.startGame();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    startGame() {
      // инициализация игры
      this.tasks = this.initializeTasks(this.settings);
      this.currentTaskIndex = 0;
      this.currentAnswer = "";
      this.isGameOver = false;
      this.score = 0;
      this.timeRemaining = this.settings.roundTime;
      this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.endGame();
        }
      }, 1000);
    },
    initializeTasks(settings) {
      const tasks = [];
      for (let i = 0; i < settings.numberOfTasks; i++) {
        let a = Math.floor(Math.random() * 2);
        let b = Math.floor(Math.random() * 2);
        switch (settings.difficulty) {
          case "easy":
            {
              a = Math.floor(Math.random() * 2);
              b = Math.floor(Math.random() * 2);
            }
            break;
          case "medium":
            {
              a = Math.floor(Math.random() * 20);
              b = Math.floor(Math.random() * 20);
            }
            break;
          case "hard":
            {
              a = Math.floor(Math.random() * 200);
              b = Math.floor(Math.random() * 200);
            }
            break;
        }
        let operation = "+"; //по дефолту
        if (settings.operationType === "mixed") {
          operation = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        }
        if (settings.operationType === "addition") {
          operation = "+";
        }
        if (settings.operationType === "subtraction") {
          operation = "-";
        }
        if (settings.operationType === "multiplication") {
          operation = "*";
        }
        if (settings.operationType === "division") {
          operation = "/";
        }

        const question = `${a} ${operation} ${b}`;
        const answer = eval(question);
        tasks.push({ question, answer });
      }
      return tasks;
    },
    submitAnswer() {
      if (this.currentAnswer === this.tasks[this.currentTaskIndex].answer) {
        this.score++;
      }
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
      } else {
        this.endGame();
      }
      this.currentAnswer = "";
    },
    endGame() {
      clearInterval(this.timer);
      this.isGameOver = true;
      localStorage.setItem(
        "gameScore",
        JSON.stringify({
          numberScore: this.scoreSettings.numberScore++,
          score: this.score,
        })
      );
    },
    restartGame() {
      this.startGame();
    },
  },
};
</script>
<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff3e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

p {
  color: #555;
  margin: 5px 0;
}

input[type="number"] {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #428bca;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3071a9;
}
</style>
