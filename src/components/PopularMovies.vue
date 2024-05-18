<template>
    <h1 class="my-4">Popular Movies</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="row">
        <div v-for="movie in movies" :key="movie.id" class="col-md-3 mb-3">
            <div class="card h-100">
                <router-link :to="`/movie/${movie.id}`" class="text-decoration-none text-dark">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="card-img-top w-100" :alt="movie.title">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.title }}</h5>
                        <p class="card-text">Release Date: {{ formatDate(movie.release_date) }}</p>
                        <p class="card-text"><b>Score: {{ formatVoteAverage(movie.vote_average) }}</b></p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatDate, formatVoteAverage } from '../utils/index';

const movies = ref([]);
const loading = ref(true);

const fetchData = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        movies.value = data.results;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchData();
});
</script>

<style scoped></style>