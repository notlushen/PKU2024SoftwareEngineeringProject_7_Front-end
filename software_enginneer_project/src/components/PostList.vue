<template>
    <div class="post-list">
      <div v-for="item in articleListInfo"></div>
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PostItem from '@/components/PostItem.vue';
  const posts = ref([
    { id: 1, title: '软件工程应该怎么学', content: '软件工程是一门好课。' },
    { id: 2, title: '敏捷开发流程中最需要注意什么', content: '敏捷开发流程中最需要注意什么？' },
    { id: 3, title: 'Node.js 实战', content: 'Node.js 是一个基于Chrome V8引擎的JavaScript运行环境...' },
  ]);
  const api={
    loadArticle:"/forum/loadAriticle"
  };
  const articleListInfo=ref({});
  const loadArticle=async ()=>{
    let result=await Proxy.request({
      url:api.loadArticle,
    });
     if(!result){
      return;
     }
  }
  loadArticle();
  </script>
  
  <style scoped>
  .post-list {
    flex: 1;
  }
  
  @media (max-width: 768px) {
    .post-list {
      margin-top: 20px;
    }
  }
  </style>