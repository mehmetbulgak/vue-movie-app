<template>
    <div>
        <input class="form-control mb-4" type="text" v-model="searchQuery" @input="searchMovies" placeholder="Search Movies...">
        <h1 v-if="searchQuery !== ''">Search Results</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="searchQuery !== '' && filteredMovies.length > 0" class="row">
            <div v-for="movie in filteredMovies" :key="movie.id" class="col-md-2 mb-2">
                <div class="card h-100">
                    <router-link :to="`/movie/${movie.id}`" class="text-decoration-none text-dark">
                        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="card-img-top w-100" :alt="movie.title">
                        <p class="card-title mt-2 p-1 text-center">{{ movie.title }}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="showNoResultsMessage">
            <p>The movie you are looking for was not found.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const filteredMovies = ref([]);
const loading = ref(false);

const searchMovies = async () => {
    if (searchQuery.value.trim() === '') {
        filteredMovies.value = [];
        return;
    }
    loading.value = true;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${searchQuery.value}`);
        const data = await response.json();
        filteredMovies.value = data.results;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};

const showNoResultsMessage = computed(() => {
    return searchQuery.value !== '' && filteredMovies.value.length === 0 && !loading.value;
});
</script>