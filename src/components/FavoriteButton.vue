<template>
    <button v-if="isButtonVisible && !isFavorite" @click="addToFavorites" :disabled="loading">
        {{ loading ? 'Loading...' : 'Add To Favorites' }}
    </button>

    <router-link v-else :to="`/favoritemovies`">This movie is among your favorites!</router-link>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    movie: {
        type: Object,
        required: true
    },
    isFavorite: Boolean
});

const isButtonVisible = ref(true);
const loading = ref(false);

const addToFavorites = async () => {
    if (!props.movie || !props.movie.id) {
        console.error('Movie information is missing or invalid!');
        return;
    }

    loading.value = true;

    const movie_id = props.movie.id;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${import.meta.env.VITE_TOKEN}`
            },
            body: JSON.stringify({
                media_type: 'movie',
                media_id: movie_id,
                favorite: true
            })
        });
        await response.json();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
        isButtonVisible.value = false;
    }
};
</script>