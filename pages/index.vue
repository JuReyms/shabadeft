<template>

  <v-sheet class="d-flex align-center flex-column animate__animated animate__fadeIn" height="100vh" color="#E8EAF6">
    <h1 class="text-center my-5 text-uppercase">Shabadeft</h1>

    <div class="text-center py-5 px-5 score">
      <v-icon size="40">mdi-crown</v-icon> <span class="mx-5 font-weight-bold bg-indigo py-4 px-4" color="red">{{
        scoreTeam1 }} · {{ scoreTeam2 }}</span>
      <v-icon size="40">mdi-crown-outline</v-icon>
    </div>

    <!-- Affichage des erreurs -->
    <div v-if="error">
      <p>Error loading songs: {{ error.message }}</p>
    </div>

    <section v-else-if="selectedSong">

      <v-card class="mx-auto my-10 text-center py-10 animate__animated animate__fadeIn" width="100%" min-height="200"
        min-width="200" color="indigo">
        <v-card-title class="text-h4 mb-10 mt-10">{{ selectedSong.french }}</v-card-title>
        <v-card-title class="text-h4 mb-10">{{ selectedSong.english }}</v-card-title>
      </v-card>

      <!-- Bouton pour récupérer une chanson aléatoire et ajouter un point -->
      <div class="text-center my-5  animate__animated animate__fadeInUp">
        <v-btn @click="addPoint(1)" class="px-5 mr-5" height="60" color="amber-accent-2"><v-icon size="40">mdi-crown</v-icon></v-btn>
        <v-btn @click="getRandomSong" class="px-5" height="60">
          <v-icon size="40">mdi-music-circle-outline</v-icon>
        </v-btn>
        <v-btn @click="addPoint(2)" class="px-5 ml-5" height="60" color="amber-accent-2"><v-icon size="40">mdi-crown-outline</v-icon></v-btn>
      </div>

    </section>

    <div v-else class="loader animate__animated animate__fadeIn"></div>

  </v-sheet>

</template>

<script>
export default {
  data() {
    return {
      songs: [],           // Toutes les chansons
      error: null,         // Erreurs éventuelles
      isLoading: true,     // État de chargement
      selectedSong: null,  // Chanson sélectionnée aléatoirement
      usedIds: [],         // IDs des chansons déjà récupérées
      scoreTeam1: 0,       // Score de l'Équipe 1
      scoreTeam2: 0        // Score de l'Équipe 2
    };
  },
  async mounted() {
    try {
      const response = await fetch('/songs.json');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      this.songs = await response.json();
      this.getRandomSong(); // Charger une chanson aléatoire dès que les chansons sont disponibles
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
    },
    addPoint(team) {
      if (team === 1) {
        this.scoreTeam1++;
      } else if (team === 2) {
        this.scoreTeam2++;
      }
      this.getRandomSong();
    }
  }
};
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques si nécessaire */

.score {
  background-color: #C5CAE9;
  padding: 0;
  width: 100%;
}

/* HTML: <div class="loader"></div> */
.loader {
  margin-top: 100px;
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}

@keyframes l5 {
  0% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #000
  }

  33% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #0002
  }

  66% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #0002
  }

  100% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #000
  }
}
</style>
