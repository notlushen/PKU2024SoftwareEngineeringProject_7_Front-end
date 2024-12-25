<template>
  <div class="divider">
    <div class="header">
      <el-row class="tag-row">
        <el-button :key="tag.id" v-for="tag in tags" type="primary" class="tag" plain round>{{ tag.body }}</el-button>
      </el-row>
      <el-row class="title">
        <el-col>{{ question.title }} </el-col>
      </el-row>
      <el-row class="content">
        <el-col>
          <v-md-editor :model-value="question.body" mode="preview">
          </v-md-editor>
        </el-col>
      </el-row>
      <el-row class="opration">
        <el-col :span="2.5" style="margin-left: 25px">
          <el-button @click="favoriteQuestion" style="width: 120px; height: 40px; font-size: 18px;"
            type="primary"><el-icon>
              <Star />
            </el-icon>{{ question.isFavorited ? '取消收藏' : '收藏' }}</el-button>
        </el-col>
        <el-col :span="2.5" style="margin-left: 20px">
          <el-button @click="likeQuestion" style="width: 120px; height: 40px; font-size: 18px;" type="primary">{{
            question.isLiked ? '取消点赞' : '点赞问题' }}</el-button>
        </el-col>
        <el-col :span="2.5" style="margin-left: 20px">
          <el-button @click="createAnswer" style="width: 120px; height: 40px;font-size: 18px;" type="primary" plain>
            <Edit style="width: 1em; height: 1em;" />写回答
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="answers">
    <div v-for="answer in answers" :key="answer.id" class="answer">
      <div class="answer-content">
        <el-row>
          <el-col :span="2.5">
            <el-icon size="50">
              <User />
            </el-icon>
          </el-col>
          <el-col :span="2.5" class="answer-author">
            {{ answer.author }}
          </el-col>
        </el-row>
        <el-row style="color: #666; font-size: 15; margin-top: 10px;">
          {{ answer.likes }}人赞同了该回答
        </el-row>
        <p>{{ answer.body }}</p>
        <div class="answer-actions">
          <el-button @click="likeAnswer(answer)" type="primary" plain>{{
            answer.isLiked ? '取消' : '点赞' }}</el-button>
        </div>

      </div>
    </div>
  </div>
  <Dialog :show="showDialog" :buttons="buttons" @close="showDialog = false" title="回答正文">
    <div class="create-question">
      <div class="editor">
        <el-form :model="form1" :rules="rules" ref="formRef" label-width="auto" class="form">
          <el-form-item label="" prop="body">
          <EditMarkdown v-model="form1.body"></EditMarkdown>
        </el-form-item>
        </el-form>
      </div>
    </div>
  </Dialog>

</template>

<script setup>
// main.js
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css"
import "@kangc/v-md-editor/lib/theme/style/github.css"
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
import { getCurrentInstance, onMounted } from 'vue';
import hljs from 'highlight.js';
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

import CreateAnswer from '@/views/forum/createAnswer.vue';
import { ref } from 'vue';
import Request from '@/utils/Request.js';
const tags = ref([
  { id: 1, body: 'tag1' },
  { id: 2, body: 'tag2' },
  { id: 3, body: 'tag3' }
]);

const vote = async (content_type, content_id, vote_type) => {
  try {
    let res = await Request({
      url: '/api/vote',
      params: {
        email: sessionStorage.getItem("email"),
        content_type: content_type,
        content_id: content_id,
        vote_type: vote_type,
      },
      dataType: "json",
    });

    if (res.code === 200) {
      ElMessage({
        message: '操作成功',
        grouping: true,
        type: 'success',
      });
      return 1;
    }
    else if (res.code === 400) {
      ElMessage({
        message: '你已经操作过了！',
        grouping: true,
      });
      return 0;

    }

    else {
      ElMessage({
        message: '点赞失败',
        grouping: true,
        type: 'error',
      });
      return -1;

    }
  } catch (error) {
    console.log(error)
  }

};


const Favorite = async (content_type, content_id, action) => {
  try {
    let res = await Request({
      url: '/api/favorite',
      params: {
        email: sessionStorage.getItem("email"),
        content_type: content_type,
        content_id: content_id,
        action: action,
      },
      dataType: "json",
    });

    if (res.code === 200) {
      ElMessage({
        message: '操作成功',
        grouping: true,
        type: 'success',
      });
      return 1;
    }
    else if (res.code === 400) {
      ElMessage({
        message: '你已经操作过了！',
        grouping: true,
      });
      return 0;

    }
    else {
      ElMessage({
        message: '收藏失败',
        grouping: true,
        type: 'error',
      });
      return -1;

    }
  } catch (error) {
    console.log(error)
  }

};



onMounted(() => {
  getQuestion(route.params.questionId)
  getAnswer(route.params.questionId)
})
const getQuestion = async (questionId) => {
  try {
    let res = await Request({
      url: '/api/getquestion',
      params: {
        questionid: questionId,
        email: sessionStorage.getItem("email")
      },
      dataType: "json",
    });
    if (res.code === 200) {
      question.value = res.question

    } else {
      ElMessage({
        message: '获取问题失败',
        grouping: true,
        type: 'error',
      });

    }
  } catch (error) {
    console.log(error)
  }

};
const getAnswer = async (questionId) => {
  try {
    let res = await Request({
      url: '/api/getanswer',
      params: {
        questionid: questionId,
      },
      dataType: "json",
    });
    if (res.code === 200) {
      console.log(answers.value)
      answers.value = res.answers
      console.log(res.answers_list)
      console.log(answers.value)
    } else {
      ElMessage({
        message: '获取问题失败',
        grouping: true,
        type: 'error',
      });


    }
  } catch (error) {

    console.log(error)


  }

};
const question = ref({
  id: 1,
  title: '如何使用Vue 3创建一个知乎详情页？',
  body: '请详细描述如何使用Vue 3创建一个知乎详情页，包括点赞和收藏功能。',
  isLiked: false,
  isFavorited: false
});

const answers = ref([
  {
    id: 1,
    body: '首先，你需要创建一个Vue 3项目...',
    isLiked: false,
    likes: 0,
    author: '用户A'
  },
  {
    id: 2,
    body: '然后，你可以使用组件来构建页面...',
    likes: 0,
    isLiked: false,

    author: '用户B'
  }
  // 更多回答...
]);

async function likeQuestion() {
  if (question.value.isLiked) {
    let result = await vote("question", question.value.id, "cancel");
    if (result === -1) { }
    else {
      question.value.isLiked = !question.value.isLiked;

    }
  }
  else {
    let result = await vote("question", question.value.id, "upvote");
    if (result === -1) { }
    else {
      question.value.isLiked = !question.value.isLiked;

    }
  }

}

async function favoriteQuestion() {
  if (question.value.isFavorited) {
    let result = await Favorite("question", question.value.id, 'remove');
    if (result === -1) { }
    else {
      question.value.isFavorited = !question.value.isFavorited;
    }
  }
  else {
    let result = await Favorite("question", question.value.id, "add");
    if (result === -1) { }
    else {
      question.value.isFavorited = !question.value.isFavorited;
    }
  }

}

async function likeAnswer(answer) {
  if (answer.isLiked === 1) {
    let result = await vote("answer", answer.id, "cancel");
    if (result === 1) {
      answer.likes--;
      answer.isLiked = 0;

    }
    else if (result === 0) {
      answer.isLiked = 0;
    }
    else {

    }
  }
  else {
    let result = await vote("answer", answer.id, "upvote");
    if (result === 1) {
      answer.likes++;
      answer.isLiked = 1;

    }
    else if (result === 0) {
      answer.isLiked = 1;
    }
    else {

    }

  }

}


import EditMarkdown from '@/components/EditMarkdown.vue';
import Dialog from '@/components/Dialog.vue';
import { reactive } from 'vue';
const form1 = reactive({
  body: '',
})
const rules = {
  body: [
    { required: true, message: '回答不能为空', trigger: 'blur' },
  ],
};
const formRef = ref(null);

const submit = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        let res = await Request({
          url: '/api/createanswer',
          params: {
            body: form1.body,
            email: sessionStorage.getItem("email"),
            questionid: question.value.id,
          },
          dataType: "json",
        });
        if (res.code === 200) {
          ElMessage({
            message: '发布成功',
            grouping: true,
            type: 'success',
          });
          window.location.href = window.location.href;
          showDialog.value = false;
        } else {
          ElMessage({
            message: '发布失败',
            grouping: true,
            type: 'error',
          });
        }
      } catch (error) {
      }
    } else {
      ElMessage.error('回答不能为空');
      return false;
    }
  });
}
const showDialog = ref(false);
const buttons = [{
  type: "primary",
  text: "发布回答",
  click: submit,
}]

function createAnswer() {
  showDialog.value = true;
}
</script>
<!-- aldkfjlskdfjlsdkf -->


<style scoped lang="scss">
.divider {
  padding-bottom: 20px;
  padding-top: 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

.header {
  width: 1250px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  margin-top: 10px;
  font-family: '黑体', 'Heiti SC', sans-serif;
  /* 使用黑体字体，对于不支持黑体的系统，使用系统默认的无衬线字体 */
  font-weight: bold;
  /* 字体加粗 */
  font-size: 50px;
  /* 字号设置为30像素 */
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
}

.tag-row {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
}

.content {
  margin-top: 10px;
  font-family: '宋体', 'SimSun', serif;
  /* 使用宋体字体，对于不支持宋体的系统，使用系统默认的衬线字体 */
  font-size: 20px;
  /* 字号设置为20像素 */
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
}

.operation {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
}

.question-detail {
  max-width: 800px;
  margin: auto;
}

.question {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.question h1 {
  margin: 0 0 10px 0;
}

.actions button {
  margin-right: 10px;
}

.answers {
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 1px solid #eee;
  width: 1250px;
  overflow-y: auto; /* 这将在垂直方向上添加滚动条 */
  height: 100%;
}

.answer {
  margin-bottom: 20px;
}

.answer-content {
  margin-bottom: 10px;
}

.answer-author {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 水平居中 */
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  color: #666;
}
</style>