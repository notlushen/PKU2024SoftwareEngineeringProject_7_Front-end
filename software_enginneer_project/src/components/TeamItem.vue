<template>
<div class="team-item">
      <el-row style="height: 50px; margin-bottom: 10px;">
        <el-col :span="2.5">
          <el-card shadow="never" class="team-id">{{ localTeam.id }}</el-card>     
        </el-col>
        <el-col :span="2.5" class="team-title">
          {{ localTeam.title }}
        </el-col>
        <el-col :span="2" class="post-creater">
        <el-icon>
          <UserFilled />
        </el-icon>{{ localTeam.creater }}
      </el-col>
      </el-row>
      <el-row>
        <div class="team-content">
          {{ localTeam.body }}
        </div>
      </el-row>
      <el-row>
        <el-col :span="2.5" class="">
          <el-icon><User /></el-icon>
          当前成员：{{ localTeam.members }}
        </el-col>
      </el-row>
      <el-row justify="end" :gutter="20">

      <el-row>
        <el-col :span="2.5" class="date">
          <el-icon><User /></el-icon>
          当前人数：{{ localTeam.current_members }}/{{ localTeam.total_members }}
        </el-col>
        <el-col :span="2.5" class="date">
          <el-icon><Timer /></el-icon>
          截止日期：{{ localTeam.expiration_date }}
        </el-col>
        <el-col :span="2.5" class="button">
          <el-button type="primary" plain @click="react" :disabled="localTeam. is_expired">
            加入组队
          </el-button>
        </el-col>
      </el-row>
      </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Request from '@/utils/Request.js';

const props = defineProps({
  team: Object
});
const localTeam = ref(props.team);
const router = useRouter();
const react=async()=>{
  try {
    let res = await Request({
      url: '/api/jointeam',
      params: {
        email: sessionStorage.getItem("email"),
        team_id: localTeam.value.id,
      },
      dataType: "json",
    });

    if (res.code === 200) {
      ElMessage({
        message: '操作成功',
        grouping: true,
        type: 'success',
      });
      localTeam.value.current_members++;
      return 1;
    }
    else if (res.code === 400) {
      ElMessage({
        message: res.message,
        grouping: true,
      });
      return 0;

    }
    else {
      ElMessage({
        message: res.message,
        grouping: true,
        type: 'error',
      });
      return -1;

    }
  } catch (error) {
    console.log(error)
  }

}
</script>

<style scoped>
.team-item {
  width: 1240px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #eee;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 4px;
}

.team-title {
  height: 40px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.team-content {
  margin-left: 20px;
}
.post-creater {
  color: #666;
  font-size: 15px;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}
.team-id {
  height: 40px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 10px;
}
</style>