<template>
  <div class="home">
    <div class="post-list">
      <!-- <div v-for="item in articleListInfo"></div> -->
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PostItem from '@/components/PostItem.vue';
import Request from '@/utils/Request.js';
onMounted(async () => {
  try {
    let res = await Request({
      url: '/api/pushlist',
      params: {
      },
      dataType: "json",
    });
    if (res.code === 200) {
      posts.value = res.list;
      return true;
    } else {

      return false;
    }
  } catch (error) {
    console.error("请求异常：", error);
    return false;
  }
})
const posts = ref([
  { id: 22, title: '软件工程应该怎么学', body: '软件工程是一门好课。' ,creater:'用户1'},
  { id: 2, title: '敏捷开发流程中最需要注意什么', body: '敏捷开发流程中最需要注意什么？',creater:'用户1'} ,
  { id: 3, title: 'Node.js 实战', body: 'Node.js 是一个基于Chrome V8引擎的JavaScript运行环境...',creater:'用户1'} ,
]);
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  width: 100%;
}

.container {
  display: flex;

  width: 100%;
}

.main-content {
  flex: 1;
  padding: 0 20px;
}

.post-list {
  flex: 1;
}

@media (max-width: 768px) {
  .post-list {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>