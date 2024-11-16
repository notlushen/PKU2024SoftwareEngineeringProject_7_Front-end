<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside> -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
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

.el-aside {
  background-color: #f2f2f2; /* 设置侧边栏的背景颜色 */
  color: #333; /* 设置侧边栏的文字颜色 */
  overflow: auto; /* 添加滚动条 */
}

.el-main {
  padding: 20px; /* 设置主要内容区域的内边距 */
  background-color: #fff; /* 设置主要内容区域的背景颜色 */
}
</style>