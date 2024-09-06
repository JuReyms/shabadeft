<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>


.light-mode body, .light-mode .v-toolbar, .light-mode .v-card, .light-mode .v-sheet {
  background-color: #E8EAF6;
  color: #151515;
}

.dark-mode body, .dark-mode .v-toolbar, .dark-mode .v-card, .dark-mode .v-sheet {
  background-color: #151515;
  color: #ebf4f1;
}


</style>
