<template>
  <div class="question">
    <DetailAnswer />
  </div>
  <div class="answer">

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import DetailAnswer from '@/components/DetailAnswer.vue';

const post = ref(
  { id: 22, title: '软件工程应该怎么学', content: '软件工程是一门好课。' },
);

</script>

<style scoped></style>