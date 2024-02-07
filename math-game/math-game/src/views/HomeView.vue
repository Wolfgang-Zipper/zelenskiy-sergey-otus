<template>
  <div>
    <SettingsForm />
    <StatsDisplay />
  </div>
</template>

<script>
import SettingsForm from "../components/SettingsForm.vue";
import StatsDisplay from "../components/StatsDisplay.vue";

export default {
  components: {
    SettingsForm,
    StatsDisplay,
  },
};
</script>
