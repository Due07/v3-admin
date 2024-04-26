<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/state/user';

defineProps<{ msg: string }>();

const count = ref(0);

const useUser = useUserStore();
// 更新
// useUser.updateUserName('123');
</script>

<template>
  {{ msg }}
  <el-button>asd</el-button>
  <div>{{ useUser.name }}</div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
