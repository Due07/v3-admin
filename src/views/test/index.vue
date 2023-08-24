<template>
  <div>
    index
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';

export default {
  setup(props, context) {
    console.log(props, context);
    const featureRef = ref('1');
    const featureState = reactive({ property: 'value' });

    return {
      featureRef,
      featureState,
    };
  },
};
</script>

<style lang="scss" scoped></style>
