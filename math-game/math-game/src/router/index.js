import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import AboutView from "../views/AboutView.vue";
const routes = [
  {
    path: "/",
    name: "Главная",
    component: HomeView,
  },
  {
    path: "/game",
    name: "Игра",
    component: GameView,
    props: true, // Это позволяет передавать параметры роутинга в виде пропсов
  },
  {
    path: "/about",
    name: "О игре",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
