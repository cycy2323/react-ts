<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3 class="title">用户充值</h3>
        <div class="form_box">
          <el-form
            ref="searchForm"
            :model="form"
            label-width="150px"
            class="demo-ruleForm"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="form.username"
                show-word-limit
                placeholder="请输入用户名"
                clearable
                :style="{ width: '300px' }"
              />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <el-input
                v-model="form.nickname"
                show-word-limit
                placeholder="请输入用户昵称"
                clearable
                :style="{ width: '300px' }"
              />
            </el-form-item>
            <el-form-item label="充值金额" prop="withdraw">
              <el-input
                v-model="form.withdraw"
                show-word-limit
                placeholder="请输入充值金额"
                clearable
                :style="{ width: '300px' }"
              />
              <span class="tip">注：1元人民币=10抖币</span>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="btn">确认充值</el-button>
        </div>
      </div>
    </main>
    <div />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";
export default {
  name: "User",
  components: {},
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        withdraw: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        withdraw: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入整数", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.main {
  padding: 30px 50px !important;
}
.film_search {
  padding: 5px 0 60px 20px !important;
}
>>> .el-table,
.h-edit {
  font-size: 15px !important;
}
>>> .el-table--small th,
>>> td {
  padding: 15px 0 !important;
}
.form_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.btn {
  width: 150px;
  border-radius: 5px;
}
.tip {
  display: block;
  color: #aaaaaa;
}
@import "@/assets/styles/style.scss";
</style>
