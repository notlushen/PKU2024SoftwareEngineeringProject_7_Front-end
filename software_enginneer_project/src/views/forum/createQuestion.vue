<template>
    <div class="create-question">
        <div class="editor">
            <el-form :model="form1" label-width="auto" class="form" @submit.native.prevent>
                <div>
                    <el-card>问题标题</el-card>
                    <el-input v-model="form1.title" placeholder="请输入标题"></el-input>
                </div>
                <div>
                    <el-form-item >
                        <el-select v-model="form1.courseType" placeholder="" class="search-select">
                            <el-option label="专业课" value="专业课" />
                            <el-option label="公选课" value="公选课" />
                            <el-option label="通识课" value="通识课" />
                            <el-option label="其他课" value="其他课" />
                        </el-select>
                        <el-input-tag v-model="form1.tags" :max="2" placeholder="enter up to 2 tags" />
                    </el-form-item>

                </div>
                <el-card>问题正文</el-card>
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

const form1 = reactive({
    title: '',
    content: '',
    tags: [],
    courseType: '专业课',
})
const submit = async () => {
    if (form1.title != '' && form1.content != '') {
        try {

            let res = await Request({
                url: '/api/createquestion',
                params: {
                    title: form1.title,
                    body: form1.content,
                    email: sessionStorage.getItem("email"),
                    tags:form1.tags,
                    courseType:form1.courseType,
                },
                dataType: "json",
            });
            if (res.code === 200) {
                ElMessage({
                    message: '发布成功',
                    grouping: true,
                    type: 'success',
                });
                router.push("/index")
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
        ElMessage({
            message: '内容不能为空',
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
            height: 100%;
        }
    }
}
</style>