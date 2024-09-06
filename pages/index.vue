<template>

  <!-- Block flex -->
  <v-sheet class="d-flex align-center justify-center flex-column animate__animated animate__fadeIn " height="100vh"
    color="#E8EAF6">

    <!-- Affichage des erreurs -->
    <div v-if="error">
      <p>Error loading songs: {{ error.message }}</p>
    </div>



    <!-- Chargement des chansons -->
    <section v-else-if="selectedSong" class="main">

      <h1 class="text-center my-10 text-uppercase text-h4">Shabadeft</h1>

      <!-- Scores -->
      <div
        class="d-flex flex-row align-center justify-center score rounded-lg justify-space-evenly animate__animated animate__fadeInDown">
        <v-icon size="50">mdi-crown</v-icon>
        <div class=" font-weight-bold bg-indigo py-4 px-8 text-h4 score-count score-bg " style="vertical-align: middle">
          <div class="score-display"> {{ scoreTeam1 }} · {{ scoreTeam2 }}</div>
        </div>
        <v-icon size="50">mdi-crown-outline</v-icon>
      </div>

      <!-- Bouton pour commencer la partie -->
      <v-card v-if="!isStart"
        class=" d-flex flex-row align-center justify-center mx-auto my-10 text-center py-5 animate__animated animate__fadeIn  rounded-lg carte-tourne"
        width="100%" min-height="315" min-width="200" color="indigo">
        <v-btn @click="startGame" class="px-4  rounded-lg animate__animated animate__tada" height="100"> <v-icon
            size="80"> mdi-play-circle-outline</v-icon></v-btn>
      </v-card>


      <!-- Carte de chanson -->
      <v-card v-else class="mx-auto my-10 text-center py-5 animate__animated animate__fadeIn  rounded-lg carte-tourne"
        width="100%" min-height="200" min-width="200" color="indigo">

        <v-card-title class="text-h3 mb-5 mt-5 carte-typo">{{ selectedSong.french }}</v-card-title>

        <!-- separateur -->
        <v-divider :thickness="10"></v-divider>

        <v-card-title class="text-h3 mb-5 mt-5 carte-typo">{{ selectedSong.english }}</v-card-title>

      </v-card>



      <!-- Bouton pour récupérer une chanson aléatoire et ajouter un point -->
      <div class="text-center my-5  animate__animated animate__fadeInUp">

        <!-- Boutons de points - equipe 1 -->
        <v-btn @click="addPoint(1)" class="px-7 mr-5  rounded-lg" height="60"><v-icon
            size="40">mdi-crown</v-icon></v-btn>

        <!-- Bouton pour changer de mots sans point -->
        <v-btn v-if="!isStart" class="px-7  rounded-lg" height="60">
          <v-icon size="40"> mdi-close-circle-outline</v-icon>
        </v-btn>
        <v-btn v-else @click="getRandomSong" class="px-4  rounded-lg" height="60">
          <v-icon size="40"> mdi-close-circle-outline</v-icon>
        </v-btn>

        <!-- Boutons de points - equipe 2 -->
        <v-btn @click="addPoint(2)" class="px-7 ml-5  rounded-lg" height="60"><v-icon
            size="40">mdi-crown-outline</v-icon></v-btn>

      </div>


      <!-- Bouton pour afficher les regles du jeu -->
      <div class="text-center py-5">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn size="small" v-bind="activatorProps"> Regles du jeu</v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card class="pa-4 mx-auto" max-width="500">

              <v-card-title class="text-h4">Régles du jeu</v-card-title>

              <v-card-text class="text-justify">

                <p>Les équipes (noire et blanche) doivent trouver un extrait de chanson contenant l'un des deux mots
                  proposés. La première
                  équipe à en trouver un démarre le jeu ! Il faut chanter au moins quelques mots de l'extrait choisi.
                  Les
                  chansons peuvent être en français ou en anglais.</p>

                <v-spacer class="my-8"></v-spacer>

                <p>Ensuite, c'est au tour de l'équipe adverse de trouver un nouvel extrait avec un mot de la même série,
                  dans la langue de leur choix (français ou anglais).</p>

                <v-spacer class="my-8"></v-spacer>

                <p>Le jeu continue ainsi, chaque équipe alternant les extraits correspondant aux mots de la série.</p>

                <v-spacer class="my-8"></v-spacer>

                <p>Si une équipe ne parvient pas à trouver un extrait, l'équipe adverse peut entamer un compte à rebours
                  de 10 secondes.
                  Si le décompte se termine sans nouvel extrait, l'équipe qui a fait le décompte marque 1 point.</p>

                <v-spacer class="my-8"></v-spacer>

                <p>La partie reprend ensuite avec l'équipe qui vient de perdre, en commençant une nouvelle série de
                  mots.
                </p>

                <v-spacer class="my-8"></v-spacer>
                <p>La première équipe à atteindre 10 points remporte la partie (mais vous pouvez continuer au-delà des
                  10
                  points si vous le souhaitez).</p>

                <v-spacer class="my-8"></v-spacer>

                <ul class="text-justify px-3">
                  <li class="my-2">Les comptines et les pèmes sont valables</li>
                  <li class="my-2">Les verbes peuvent être conjugués</li>
                  <li class="my-2">On peut chanter plusieurs fois la même chanson dans une partie mais pas pour la même
                    serie de carte</li>
                  <li class="my-2">Loulou, ça ne sert à rien de traiter les autres joueurs de nazes, tu vas quand même perdre...
                  </li>
                </ul>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isActive.value = false" class="px-4 mx-auto" elevation="3" >Fermer</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>



      <!-- Bouton pour afficher les options -->
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps2 }">
          <v-btn icon="mdi-dots-vertical" size="small" class="btn-menu" v-bind="activatorProps2" elevation="0"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title class="text-h4 text-center">Paramètres </v-card-title>
              <v-btn prepend-icon="mdi-reload" variant="tonal" class="my-2 mx-auto" @click="reloadPage">Recommencer la partie</v-btn>
              <v-btn prepend-icon="mdi-share-variant" variant="tonal" class="my-2  mx-auto">Partager l'application</v-btn>
              <v-btn prepend-icon="mdi-github" variant="tonal" class="my-2 mx-auto" href="https://github.com/JuReyms/shabadeft" target="_blank">GitHub</v-btn> 

            <v-card-text>  
              <p text class="text-center"> Cette application gratuite est inspirée librement du jeu de carte Shabada.</p>
          </v-card-text>

            <v-card-actions>
              <v-btn @click="isActive.value = false" class="my-2 mx-auto"  elevation="3">Fermer</v-btn>
            </v-card-actions>
            
            <p text class="text-center py-5 footer">2024 © shabadeft - {{ version }}</p>

          </v-card>
        </template>
      </v-dialog>

    </section>




    <!-- Chargement... -->
    <section v-else class="d-flex flex-column justify-center align-center animate__animated animate__fadeIn">
      <v-img src="/android-chrome-192x192.png" :width="120" :height="120" class="  my-10"></v-img>
      <div class="loader "></div>
    </section>

  </v-sheet>

</template>

<script>

import anime from 'animejs/lib/anime.es.js';

export default {
  data() {
    return {
      songs: [],           // Toutes les chansons
      error: null,         // Erreurs éventuelles
      isLoading: true,     // État de chargement
      selectedSong: null,  // Chanson sélectionnée aléatoirement
      usedIds: [],         // IDs des chansons déjà récupérées
      scoreTeam1: 0,       // Score de l'Équipe 1
      scoreTeam2: 0,       // Score de l'Équipe 2
      version: '1.4.0',     // Version du jeu
      isStart: false,      // Lancement de la partie
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

    startGame() {
      this.isStart = true;
    },

    getRandomSong() {

      if (this.songs.length === 0) return;

      // Filtrer les chansons non encore utilisées
      const availableSongs = this.songs.filter(song => !this.usedIds.includes(song.id));

      if (availableSongs.length === 0) {
        alert("Il n'y a plus de chansons disponibles... Rechargez la page pour recommencer une partie !");
        return;
      }

      // Anime.js: Ajouter l'animation de rotation et d'opacité
      anime({
        targets: '.carte-tourne',
        rotateX: 180,  // Une rotation complète sur l'axe X
        duration: 1500,    // Durée de l'animation en millisecondes
        easing: 'easeInOutQuad', // Courbe d'accélération pour une rotation fluide
        begin: () => {
          // Réduire l'opacité à 0 au début de la rotation
          anime({
            targets: '.carte-typo',
            opacity: 0,
            duration: 250,  // Durée de la transition d'opacité
            easing: 'easeInOutQuad'
          });
        },
        complete: () => {
          // Réinitialiser la rotation pour permettre la prochaine animation
          anime.set('.carte-tourne', { rotateX: 0 });

          // Sélectionner une chanson aléatoire parmi celles disponibles une fois l'animation terminée
          const randomIndex = Math.floor(Math.random() * availableSongs.length);
          this.selectedSong = availableSongs[randomIndex];

          // Ajouter l'ID de la chanson sélectionnée aux IDs utilisés
          this.usedIds.push(this.selectedSong.id);
          console.log('this.usedIds :', this.usedIds);

          // Restaurer l'opacité à 1 après la rotation et changement de texte
          anime({
            targets: '.carte-typo',
            opacity: 1,
            duration: 1000,  // Durée du fondu pour revenir à l'opacité 1
            delay: 100,      // Debut du fondu à 500 millisecondes
            easing: 'easeInOutQuad'
          });
        }
      });
    },


    addPoint(team) {
      if (this.isStart) {
        if (team === 1) {
          this.scoreTeam1++;
        } else if (team === 2) {
          this.scoreTeam2++;
        }


        // Anime.js: Ajouter une animation de "scale" sur le score
        anime({
          targets: '.score-display',
          scale: [1, 1.2],   // Augmente la taille de 1 à 1.2
          duration: 250,     // Durée de l'animation en millisecondes
          easing: 'easeInOutQuad', // Courbe d'accélération pour une transition fluide
          direction: 'alternate',  // Revenir à la taille normale après l'animation
          complete: () => {
            // Remise à l'échelle normale une fois l'animation terminée
            anime.set('.score-display', { scale: 1 });
          }
        });

        // Anime.js: Ajouter une animation de changement de couleur sur le fond score
        anime({
          targets: '.score-bg',
          backgroundColor: [
            { value: '#C5CAE9' }, // Couleur de fond souhaitée pendant l'animation
            { value: '#E8EAF6' }  // Couleur de fond normale à la fin de l'animation
          ],
          duration: 250,     // Durée de l'animation en millisecondes
          easing: 'easeInOutQuad', // Courbe d'accélération pour une transition fluide
          direction: 'alternate'  // Revenir à la couleur normale après l'animation
        });

        this.getRandomSong();
      }
    },

    reloadPage() {
      location.reload();
    }



  }
};
</script>


<style scoped>
/* Ajoutez ici vos styles spécifiques si nécessaire */

.btn-menu {
  position: absolute;
  top: 15px;
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
