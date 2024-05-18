import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MovieDetail from '../views/MovieDetail.vue';
import FavoriteMovies from '../views/FavoriteMovies.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/favoritemovies',
    name: 'FavoriteMovies',
    component: FavoriteMovies
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;