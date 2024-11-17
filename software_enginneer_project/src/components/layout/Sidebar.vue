<template>
    <div class="sidebar">
      <div class="section">
        <div class="section-title">热门话题</div>
        <div class="section-content">
          <div class="topic" v-for="topic in topics" :key="topic.id">
            {{ topic.name }}
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">推荐用户</div>
        <div class="section-content">
          <div class="user" v-for="user in users" :key="user.id">
            <div class="user-avatar">{{ user.name[0] }}</div>
            <div class="user-name">{{ user.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const topics = ref([
    { id: 1, name: 'Vue.js' },
    { id: 2, name: 'React.js' },
    { id: 3, name: 'Node.js' },
  ]);
  
  const users = ref([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
  ]);
  </script>
  
  <style scoped>
/* Sidebar.vue 的 CSS */
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 240px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 900; /* 低于 Header 的 z-index */
  overflow-y: auto;
}
.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-content {
  border: 1px solid #eee;
  padding: 10px;
}

.topic,
.user {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .sidebar {
    display: none; /* 在手机端隐藏 sidebar */
  }
}
</style>