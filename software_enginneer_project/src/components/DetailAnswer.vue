<template>
    <div class="question-detail">
      <div class="question">
        <h1>{{ question.title }}</h1>
        <p>{{ question.content }}</p>
        <div class="actions">
          <button @click="likeQuestion">{{ question.isLiked ? '已赞' : '赞' }}</button>
          <button @click="favoriteQuestion">{{ question.isFavorited ? '已收藏' : '收藏' }}</button>
        </div>
      </div>
      <div class="answers">
        <div v-for="answer in answers" :key="answer.id" class="answer">
          <div class="answer-content">
            <p>{{ answer.content }}</p>
            <div class="answer-actions">
              <button @click="likeAnswer(answer)">{{ answer.likes }} 赞</button>
            </div>
          </div>
          <div class="answer-author">
            <span>回答者：{{ answer.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const question = ref({
    id: 1,
    title: '如何使用Vue 3创建一个知乎详情页？',
    content: '请详细描述如何使用Vue 3创建一个知乎详情页，包括点赞和收藏功能。',
    isLiked: false,
    isFavorited: false
  });
  
  const answers = ref([
    {
      id: 1,
      content: '首先，你需要创建一个Vue 3项目...',
      likes: 0,
      author: '用户A'
    },
    {
      id: 2,
      content: '然后，你可以使用组件来构建页面...',
      likes: 0,
      author: '用户B'
    }
    // 更多回答...
  ]);
  
  function likeQuestion() {
    question.value.isLiked = !question.value.isLiked;
  }
  
  function favoriteQuestion() {
    question.value.isFavorited = !question.value.isFavorited;
  }
  
  function likeAnswer(answer) {
    answer.likes++;
  }
  </script>
  
  <style scoped>
  .question-detail {
    max-width: 800px;
    margin: auto;
  }
  
  .question {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #eee;
    margin-bottom: 20px;
  }
  
  .question h1 {
    margin: 0 0 10px 0;
  }
  
  .actions button {
    margin-right: 10px;
  }
  
  .answers {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #eee;
  }
  
  .answer {
    margin-bottom: 20px;
  }
  
  .answer-content {
    margin-bottom: 10px;
  }
  
  .answer-author {
    font-size: 0.8em;
    color: #666;
  }
  </style>