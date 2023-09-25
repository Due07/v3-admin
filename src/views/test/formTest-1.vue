<template>
  <LayoutForm ref="layoutForm" :form-data="form" :column="column">
    <template #ce="{ i, form: forms }">
      {{ JSON.stringify(i) }}
      {{ JSON.stringify(forms) }}
    </template>
  </LayoutForm>
</template>

<script setup lang="ts">
import LayoutForm from '@/components/layout/Form/index.vue';
import { formData, column } from '@/components/layout/Form/test';

import { reactive } from 'vue';

const form = reactive(formData);

</script>

<style lang="scss" scoped></style>
