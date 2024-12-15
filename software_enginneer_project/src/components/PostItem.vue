<template>
    <div class="post-item" @click="goDetails">
      <el-row style="height: 50px; margin-bottom: 10px;">
        <el-col :span="2.5">
          <el-card shadow="never" class="post-id">{{post.id}}</el-card>
        </el-col>
        <el-col :span="2.5" class="post-title">
          <router-link :to="`/detail/${post.id}`">{{ post.title }}</router-link>
        </el-col>
        <el-col :span="2" class="post-creater">
          <el-icon><UserFilled /></el-icon>{{ post.creater }}
        </el-col>
      </el-row>
      <div class="post-time">{{ post.created_at }}</div>
      <div class="post-content">{{ post.body }}</div>
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
    width: 1240px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 4px;
  }
  
  .post-title {
    height: 40px;
    margin-left: 20px; 
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }
  
  .post-content {
    color: #666;
  }
  .post-creater{
    color: #666;
    font-size: 15px;
    margin-left: auto;  
    margin-top: auto;
    margin-bottom: auto;
  }
  .post-id{
    height: 40px;
    width: 80px;
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }

  </style>
 