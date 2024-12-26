<template>
    <div class="create-question">
        <div class="editor">
            <el-form :model="form1" label-width="auto" class="form">
                <div>
                    <el-form-item label="组队标题">
                    <el-input v-model="form1.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                </div>
                <el-form-item label="总人数">
                    <el-input-number v-model="form1.total_members" :min="2" :max="100" @change="" />
                </el-form-item>
                <el-form-item label="截止日期">
                    <el-date-picker v-model="form1.expiration_date" type="datetime" :disabled-date="disabledDate" placeholder="Pick a Date" 
                        format="YYYY/MM/DD HH:mm:ss" 
                        value-format="YYYY-MM-DD h:m:s"/>
                </el-form-item>
                <el-card>组队详情</el-card>
                <EditMarkdown v-model="form1.content"></EditMarkdown>
                <el-form-item>
                    <el-button type="primary" @click="submit">发布</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditMarkdown from '@/components/EditMarkdown.vue';
import { reactive } from 'vue';
import Request from '@/utils/Request.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';
const disabledDate= (time:any)=> {
          // 禁用选择过去的日期
          return time.getTime() < Date.now();
}
const form1 = reactive({
    title: '',
    content: '',
    total_members: 0,
    expiration_date: '',
})
const submit = async () => {
    const a = Date.now();
    console.log(a)
    if (form1.title != '' && form1.content != ''&&form1.total_members!=0) {
        try {
            let res = await Request({
                url: '/api/createteam',
                params: {
                    title: form1.title,
                    description: form1.content,
                    email: sessionStorage.getItem("email"),
                    total_members: form1.total_members,
                    expiration_date: form1.expiration_date,
                },
                dataType: "json",
            });
            if (res.code === 200) {
                ElMessage({
                    message: '发布成功',
                    grouping: true,
                    type: 'success',
                });
                router.push("/index/team")
            } else {
                ElMessage({
                    message: '发布失败',
                    grouping: true,
                    type: 'error',
                });
            }
        } catch (error) {
        }
    }
    else {
        console.log(form1.expiration_date)

        ElMessage({
            message: '内容存在问题，请检查',
            grouping: true,
            type: 'error',
        });
    }
}
</script>

<style scoped>
.create-question {
    display: flex;
    width: 100%;
    height: 100vh;

    .editor {
        width: 100%;

        .form {
            max-width: 100%;
            width: 100%;
            height: 100%;
        }
    }
}
</style>