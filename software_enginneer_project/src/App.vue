<template>
  <el-config-provider :message="config" :locale="locale">

    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>

</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn;

import { RouterView, RouterLink } from 'vue-router';
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const config = reactive({
  max: 3,
  autoInsertSpace: true,

})


</script>

<style></style>