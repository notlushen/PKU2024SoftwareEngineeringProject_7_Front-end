<template>
  <el-container>
    <el-aside width="200px">
      <div class="question">
        <el-col :span=4 class="sidebar">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
              <template #title>
                <el-icon>
                  <document />
                </el-icon>
                <span>专业课</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <document />
              </el-icon>
              <span>通识课</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <document />
              </el-icon>
              <span>公选课</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <document />
              </el-icon>
              <span>其他课程</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
    </el-aside>
    <el-main>
      <div class="post-list">
        <!-- <div v-for="item in articleListInfo"></div> -->
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>













</template>

<script setup name="Question">
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
  { id: 22, title: '软件工程应该怎么学', body: '软件工程是一门好课。', creater: '用户1' },
  { id: 2, title: '敏捷开发流程中最需要注意什么', body: '敏捷开发流程中最需要注意什么？', creater: '用户1' },
  { id: 3, title: 'Node.js 实战', body: 'Node.js 是一个基于Chrome V8引擎的JavaScript运行环境...', creater: '用户1' },
]);

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

.sidebar {
  width: 100%;
}

@media (max-width: 768px) {
  .question {
    flex-direction: column;
  }
}
</style>