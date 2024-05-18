<template>
    <div>
        <p v-if="loading">Loading...</p>
        <div v-else-if="favorites.length" class="row">
            <div v-for="movie in favorites" :key="movie.id" class="col-md-3 mb-3">
                <div class="d-flex flex-column card">
                    <router-link :to="`/movie/${movie.id}`" class="text-decoration-none text-dark">
                        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="card-img-top w-100"
                            :alt="movie.title">
                        <div class="card-body">
                            <h5 class="card-title mb-4"> {{ movie.title }}</h5>
                        </div>
                    </router-link>
                    <DeleteFavoriteButton :movie="movie" :fetchFavorites="fetchFavorites" />
                </div>
            </div>
        </div>
        <h3 v-else>You don't have a favorite movie yet.</h3>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DeleteFavoriteButton from '../components/DeleteFavoriteButton.vue';

const favorites = ref([]);
const loading = ref(false);

const fetchFavorites = async () => {
    loading.value = true;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${import.meta.env.VITE_TOKEN}`
            }
        });
        const data = await response.json();
        favorites.value = data.results || [];
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchFavorites();
});
</script>