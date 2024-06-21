<template>
  home
</template>

<script lang="ts" setup>
// import { ref, reactive } from 'vue';
import HahaServices from '@/services/HahaServices';
import { onMounted } from 'vue';

onMounted(() => {
  console.log(HahaServices.ga('as'));
});

</script>

<style lang="scss" scoped>
</style>
