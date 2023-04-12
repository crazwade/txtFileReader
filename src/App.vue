<script setup lang="ts">
import TxtFileReader from './components/TxtFileReader.vue'

console.log(`版本號: ${import.meta.env.VITE_APP_VERSION}`);
</script>

<template>
  <TxtFileReader />
</template>

