<template>
    <div>
      <h1>Songs</h1>
      <div v-if="data">
        <div v-for="item in data" :key="item.id">
          <h2>French: {{ item.french }}</h2>
          <h3>Songs in French:</h3>
          <ul>
            <li v-for="song in item.songs.french" :key="song">{{ song }}</li>
          </ul>
          <h3>Songs in English:</h3>
          <ul>
            <li v-for="song in item.songs.english" :key="song">{{ song }}</li>
          </ul>
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { useAsyncData } from '#app';
  
  const { data, error } = await useAsyncData('songs', async () => {
    const response = await fetch('/songs.json');
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    return response.json();
  });
  
  if (error.value) {
    console.error('Failed to fetch songs:', error.value);
  }
  </script>
  