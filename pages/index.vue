<template>

    <h1>Shabadeft</h1>

    <!-- Affichage des erreurs -->
    <div v-if="error">
      <p>Error loading songs: {{ error.message }}</p>
    </div>
 

    <v-card variant="tonal" v-else-if="selectedSong" class="mx-auto" max-width="300">
      <v-card-title class="text-h5">{{ selectedSong.french }}</v-card-title>
      <v-card-text v-for="(song, index) in selectedSong.songs.french" :key="index">{{ song }}</v-card-text>
      <v-card-title class="text-h5">{{ selectedSong.english }}</v-card-title>
      <v-card-text v-for="(song, index) in selectedSong.songs.english" :key="index">{{ song }}</v-card-text>
    </v-card>
    <p v-else>Loading...</p>

    <!-- Bouton pour récupérer une chanson aléatoire -->
    <v-btn @click="getRandomSong" class="mx-auto">Get Random Song</v-btn>


</template>

<script>
export default {
  data() {
    return {
      songs: [],           // Toutes les chansons
      error: null,         // Erreurs éventuelles
      isLoading: true,     // État de chargement
      selectedSong: null,  // Chanson sélectionnée aléatoirement
      usedIds: []          // IDs des chansons déjà récupérées
    };
  },
  async mounted() {
    try {
      const response = await fetch('/songs.json');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      this.songs = await response.json();
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    getRandomSong() {
      if (this.songs.length === 0) return;

      // Filtrer les chansons non encore utilisées
      const availableSongs = this.songs.filter(song => !this.usedIds.includes(song.id));

      if (availableSongs.length === 0) {
        alert("All songs have been used.");
        return;
      }

      // Sélectionner une chanson aléatoire parmi celles disponibles
      const randomIndex = Math.floor(Math.random() * availableSongs.length);
      this.selectedSong = availableSongs[randomIndex];

      // Ajouter l'ID de la chanson sélectionnée aux IDs utilisés
      this.usedIds.push(this.selectedSong.id);
      console.log('this.usedIds :', this.usedIds);
    }
  }
};
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques si nécessaire */
</style>
