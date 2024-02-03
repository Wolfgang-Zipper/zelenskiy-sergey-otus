<template>
  <div>
    <h2>Статистика тренировок</h2>
    <p>Попыток: {{ scoreSettings.numberScore }}</p>
    <p>Последний результат: {{ scoreSettings.score }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreSettings: JSON.parse(localStorage.getItem("gameScore")) || {
        score: 0,
        numberScore: 0,
      },
    };
  },
};
</script>
