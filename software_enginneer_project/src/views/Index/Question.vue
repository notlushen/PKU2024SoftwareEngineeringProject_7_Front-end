<template>
    <div class="question">
    <el-col :span=4 class="sidebar">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><document /></el-icon>
            <span>专业课</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>通识课</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>公选课</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><document /></el-icon>
          <span>其他课程</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </div>

  </template>
  
  <script setup name="Question">
  import { ref, onMounted } from 'vue';


  </script>
  
  <style scoped>

  .question {
    display: flex;

    width: 100%;
  }
  
  .main-content {
    flex: 1;
    padding: 0 20px;
  }
  .sidebar{
    width: 100%;
  }
  @media (max-width: 768px) {
    .question {
      flex-direction: column;
    }
  }
  </style>