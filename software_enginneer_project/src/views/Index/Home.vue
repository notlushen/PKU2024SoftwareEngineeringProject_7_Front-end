<template>
    <div class="home">
    <Postlist></Postlist>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Postlist from '@/components/Postlist.vue';
  
  // 可以在setup函数中执行组件的初始化逻辑
  onMounted(() => {
    console.log('Home component is mounted');
  });
  </script>
  
<style scoped >
  .home {
    display: flex;
    justify-content: center; 
    width: 100%; }
  
  .container {
    display: flex;

    width: 100%;
  }
  
  .main-content {
    flex: 1;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
  }
  </style>