<template>
    <div class="post-item" @click="goDetails">
      <div class="post-title">
        <router-link :to="`/detail/${post.id}`">#{{post.id}}          </router-link>
        <span>   --- </span>
        <router-link :to="`/detail/${post.id}`">
        {{ post.title }}
      </router-link>
      </div>
      <div class="post-content">{{ post.body }}</div>
      <div class="post-time">{{ post.created_at }}</div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  defineProps({
    post: Object
  });

const router=useRouter();

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