<template>
  <div class="team">
    <TeamItem v-for="team in teams" :key="team.id" :team="team" />

    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
      layout="total, prev, pager, next, jumper" :total="totalItems">
    </el-pagination>
  </div>
</template>

<script setup name="Team">
import { ref, onMounted } from 'vue';
import TeamItem from '@/components/TeamItem.vue';
import Request from '@/utils/Request.js';
const teams = ref([
  
]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(100);
const fetchTeams = async (page, size) => {
  try {
    let res = await Request({
      url: '/api/teamlist',
      params: {
        page: page,
        page_size: size
      },
      dataType: "json",
    });
   if (res.code === 200) {
    teams.value = res.list;
    totalItems.value = res.total;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("请求异常：", error);
    return false;
  }
};
// 处理当前页变化
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchTeams(currentPage.value, pageSize.value);

};


fetchTeams(currentPage.value, pageSize.value);
console.log(teams)
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

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>