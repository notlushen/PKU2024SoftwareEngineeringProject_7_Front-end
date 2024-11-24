<template>
    <div class="post-item" @click="goDetails">
      <div class="post-title">
        <span>#{{post.id  }}</span>
        {{ post.title }}
      </div>
      <div class="post-content">{{ post.content }}</div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  defineProps({
    post: Object
  });
const router=useRouter();
function goDetails(v) {
  router.push('/detail');
}
  </script>
  
  <style scoped>
  .post-item {
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 4px;
  }
  
  .post-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .post-content {
    color: #666;
  }
  </style>