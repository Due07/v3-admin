<template>
    <LayoutForm :form-data="form" :column="column" />
</template>
<script setup lang="ts">
import LayoutForm from '@/components/layout/Form/Form.vue';
import { formData, column } from '@/components/layout/Form/test';
import { reactive } from 'vue';

const form = reactive(formData);

</script>
<style scoped lang="scss">
</style>
