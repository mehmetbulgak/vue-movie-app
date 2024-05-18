<template>
    <div v-if="loading">Loading...</div>
    <div v-else class="container mb-4">
        <div class="row">
            <div class="col-12 col-md-4 mb-3">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" class="img-fluid">
            </div>

            <div class="col-12 col-md-8">
                <h1>{{ movie.title }}</h1>
                <p>{{ movie.overview }}</p>
                <div class="d-flex flex-wrap">
                    <div v-for="genre in movie.genres" :key="genre.id" class="border rounded border-dark me-2 mb-2 p-2 mr-2">
                        {{ genre.name }}
                    </div>
                </div>
                <p><b>Release Date:</b> {{ formatDate(movie.release_date) }}</p>
                <p>
                    <b>Score:</b> {{ formatVoteAverage(movie.vote_average) }}/10
                    <span class="text-secondary">({{ movie.vote_count }} People Voted)</span>
                </p>
                <p><b>Budget:</b> {{ formatCurrency(movie.budget) }}</p>
                <p><b>Revenue:</b> {{ formatCurrency(movie.revenue) }}</p>

                <FavoriteButton :isFavorite="isFavorite" :movie="movie" class="btn btn-warning" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FavoriteButton from '../components/FavoriteButton.vue';
import { formatDate, formatVoteAverage, formatCurrency } from '../utils/index';

const movie = ref(null);
const loading = ref(true);
const isFavorite = ref(false);
const route = useRoute();

const fetchFavorites = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${import.meta.env.VITE_TOKEN}`
            }
        });
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const fetchMovieDetail = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        movie.value = data;

        const favorites = await fetchFavorites();
        isFavorite.value = favorites.some(fav => fav.id === data.id);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchMovieDetail();
});
</script>
