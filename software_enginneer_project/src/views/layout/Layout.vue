<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>

      <el-container>
        <el-main>
          <el-scrollbar height="90vh">

          <router-view></router-view>
        </el-scrollbar>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import { ref } from 'vue'

import { useRouter,useRoute } from 'vue-router';
const router =useRouter();
const route =useRoute();

</script>

<style scoped>
.common-layout {
  height: 100vh; /* 设置整个布局的高度为视口高度 */
  overflow: hidden; /* 防止内容溢出 */
}

.el-header {
  padding: 0; /* 移除头部的内边距 */
  height: 60px; /* 设置头部的高度 */
  background-color: #fff; /* 设置头部的背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.el-main {
  padding: 20px; /* 设置主要内容区域的内边距 */
  background-color: #fff; /* 设置主要内容区域的背景颜色 */
  height: max-content;
}
</style>