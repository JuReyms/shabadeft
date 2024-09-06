<template>
  <!-- Bouton pour changer de thème -->
<v-btn @click="toggleTheme"  class="my-2 mx-auto" :prepend-icon="isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny'">
  {{ isDarkTheme ? 'Thème sombre' : 'Thème clair' }}
</v-btn>

  
 
  </template>
  
  <script>
  
  export default {
    name: 'ThemeToggle',
  
    data() {
      return {
        colorMode: useColorMode(),
      }
    },
  
    computed: {
      // Déterminer si le thème actuel est sombre
      isDarkTheme() {
        return this.colorMode.preference === 'dark'
      }
    },
  
    methods: {
      // Fonction pour basculer entre le thème sombre et clair
      toggleTheme() {
        this.colorMode.preference = this.isDarkTheme ? 'light' : 'dark'
      }
    }
  }
  </script>
  
  