<template>

  <v-sheet class="d-flex align-center justify-center flex-column animate__animated animate__fadeIn " height="100vh"
    color="#E8EAF6">


    <!-- Affichage des erreurs -->
    <div v-if="error">
      <p>Error loading songs: {{ error.message }}</p>
    </div>

    <section v-else-if="selectedSong" class="main">


      <h1 class="text-center my-10 text-uppercase text-h4">Shabadeft</h1>

      <div class="d-flex flex-row align-center justify-center score rounded-lg justify-space-evenly">

       <v-icon size="50">mdi-crown</v-icon>
        
        <div class=" font-weight-bold bg-indigo py-4 px-8 text-h4 score-count" style="vertical-align: middle">{{
      scoreTeam1 }} · {{ scoreTeam2 }}</div>

      <v-icon size="50">mdi-crown-outline</v-icon>
       
      </div>

      <v-card class="mx-auto my-10 text-center py-5 animate__animated animate__fadeIn  rounded-lg"  width="100%"
        min-height="200" min-width="200" color="indigo">


        <v-card-title class="text-h3 mb-5 mt-5 animate__animated animate__fadeIn">{{ selectedSong.french }}</v-card-title>

        <!-- separateur -->
        <v-divider :thickness="10"></v-divider>

        <v-card-title class="text-h3 mb-5 mt-5 animate__animated animate__fadeIn">{{ selectedSong.english }}</v-card-title>


      </v-card>

      <!-- Bouton pour récupérer une chanson aléatoire et ajouter un point -->
      <div class="text-center my-5  animate__animated animate__fadeInUp">
        <v-btn @click="addPoint(1)" class="px-8 mr-5  rounded-lg" height="60"><v-icon
            size="40">mdi-crown</v-icon></v-btn>
        <v-btn @click="getRandomSong" class="px-4  rounded-lg" height="60">
          <v-icon size="40"> mdi-close-circle-outline</v-icon>
        </v-btn>
        <v-btn @click="addPoint(2)" class="px-8 ml-5  rounded-lg" height="60"><v-icon
            size="40">mdi-crown-outline</v-icon></v-btn>
      </div>

      <p text class="text-center pt-10 footer">2024 © shabadeft - 1.21</p>


      <v-dialog>

        <template v-slot:activator="{ props: activatorProps }">
          <v-btn icon="mdi-menu" size="small" class="btn-menu" v-bind="activatorProps"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card class="pa-4 mx-auto" max-width="900" width="100%">

            <v-card-title class="text-h4">Régles du jeu</v-card-title>
            <v-card-text class="text-justify">
              <p>Les équipes (noire et blanche) doivent trouver un extrait de chanson contenant l'un des deux mots proposés. La première
                équipe à en trouver un démarre le jeu ! Il faut chanter au moins quelques mots de l'extrait choisi. Les
                chansons peuvent être en français ou en anglais.</p>

                <v-spacer class="my-8" ></v-spacer>

              <p>Ensuite, c'est au tour de l'équipe adverse de trouver un nouvel extrait avec un mot de la même série, 
                dans la langue de leur choix (français ou anglais).</p>

              <v-spacer class="my-8" ></v-spacer>

              <p>Le jeu continue ainsi, chaque équipe alternant les extraits correspondant aux mots de la série.</p>

              <v-spacer class="my-8" ></v-spacer>

              <p>Si une équipe ne parvient pas à trouver un extrait, l'équipe adverse peut entamer un compte à rebours de 10 secondes. 
                Si le décompte se termine sans nouvel extrait, l'équipe qui a fait le décompte marque 1 point.</p>

                <v-spacer class="my-8" ></v-spacer>

              <p>La partie reprend ensuite avec l'équipe qui vient de perdre, en commençant une nouvelle série demots.</p>

              <v-spacer class="my-8" ></v-spacer>
              <p>La première équipe à atteindre 10 points remporte la partie (mais vous pouvez continuer au-delà des 10 points si vous le souhaitez).</p>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="fermer" @click="isActive.value = false" class="px-4  rounded-lg" variant="tonal"></v-btn>
            </v-card-actions>
          </v-card>
        </template>

      </v-dialog>



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
      scoreTeam2: 0,        // Score de l'Équipe 2
      loading: false      // btn - Chargement de la nouvelle chanson
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
        alert("Il n'y a plus de chansons disponibles ! Réachargez la page pour recommencer une partie.");
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

.btn-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.main {
  padding: 0;
  width: 90%;
  max-width: 500px;
}

.score {
  background-color: #C5CAE9;
  padding: 0;
  width: 100%;
  font-size: 25px;
}

.footer {
  color: #989bb3;
  padding: 0;
  width: 100%;
  font-size: small;
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
