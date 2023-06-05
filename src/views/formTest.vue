<template>
    <LayoutForm :form-data="form" :column="column">
        <template #ce="{ i, form: forms }">
            {{ JSON.stringify(i) }}
            {{ JSON.stringify(forms) }}
        </template>
    </LayoutForm>
</template>
<script setup lang="ts">
import LayoutForm from '@/components/layout/Form/Form.vue';
import { formData, column } from '@/components/layout/Form/test';
import { reactive } from 'vue';

const form = reactive(formData);

</script>
<style scoped lang="scss">
</style>
