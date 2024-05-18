<template>
    <button @click="handleDelete" :disabled="loadingMovies[movie.id]" class="btn btn-danger w-100">
        {{ loadingMovies[movie.id] ? 'Deleting...' : 'Delete' }}
    </button>
</template>

<script setup>
import { ref } from 'vue';

const loadingMovies = ref({});

const props = defineProps({
    movie: {
        type: Object,
        required: true
    },
    fetchFavorites: {
        type: Function,
        required: true
    }
});

const removeFromFavorites = async (movie_id) => {
    loadingMovies.value[movie_id] = true;

    const url = `https://api.themoviedb.org/3/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${import.meta.env.VITE_TOKEN}`
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movie_id,
            favorite: false
        })
    };

    try {
        await fetch(url, options);
        props.fetchFavorites();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loadingMovies.value[movie_id] = false;
    }
};

const handleDelete = (event) => {
    event.stopPropagation();
    removeFromFavorites(props.movie.id);
};
</script>