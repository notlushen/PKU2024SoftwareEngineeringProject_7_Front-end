<template>
    <div class="header">
      <div class="avatar">
        <img class="image" src="@/assets/image/avatar.jpg">
      </div>
      <div class="detail">
        <div class= "de-block">
            
        </div>
        <div class="name">
          <p class="na-name">我不是陆神</p>
          <el-button @clicked="editname">编辑个人资料</el-button>
          <!-- 这里需要实现改昵称，加一个输入框 -->
        </div>
  
      </div>
    </div>  
  
  
    <div  class="questionlist">
      <el-tabs type="border-card">
        <el-tab-pane label="提问">User</el-tab-pane>
        <el-tab-pane label="回答">Config</el-tab-pane>
        <el-tab-pane label="收藏">Role</el-tab-pane>
      </el-tabs>
    </div>
    
  </template>
  
  
  <script lang="ts">
  import type { TabsPaneContext } from 'element-plus'
  </script>
  
  <style scoped>
  
  .header {
    height: 300px;
    width: 1360px;
    margin: auto;
    display: flex; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }
  .avatar{
    width: 300px; /* 设置宽度 */
    display: flex; /* 使用flex布局 */
    justify-content: center; /* 水平居中 */
    align-items: flex-end; /* 垂直向下对齐 */
    height: 100%; /* 或者可以设置为具体的高度值 */
    
  }
  .image{
    margin-left: 10px; /* 设置左外边距 */
    margin-right: 10px; /* 设置右外边距 */
    margin-bottom: 20px;
    border: 3px solid #5158e1; 
    border-radius: 8px;
  }
  .de-block{
    height: 160px
  }
  .name{
    width: 1060px;
  
  }
  .na-name{
    font-weight: bold; /* 加粗 */
    font-family: 'Heiti SC', 'Heiti', 'SimHei', sans-serif; /* 黑体字体 */
    font-size: 25px; /* 字体大小 */
  }
  .questionlist{
    width: 1360px;
    margin: auto;
  }
  
  </style>
      