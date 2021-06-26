<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <div class="form_box">
          <h2 class="title">充值客服QQ号设置</h2>
          <el-form
            ref="searchForm"
            :model="form"
            class="demo-ruleForm"
            :rules="rules"
          >
            <el-form-item prop="qq">
              <el-input
                v-model="form.qq"
                show-word-limit
                placeholder="请输入QQ号"
                clearable
                :style="{ width: '300px' }"
              />
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" class="btn">确定</el-button>
        </div>
      </div>
    </main>
    <div />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";
export default {
  name: "CustomerService",
  components: {},
  data() {
    return {
      form: {
        qq: ""
      },
      rules: {
        qq: [{ required: true, message: "请输入QQ号", trigger: "blur" }]
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
  padding: 50px 60px 60px !important;
}
.film_search:hover {
  box-shadow: none !important;
}
.title {
  line-height: 2;
}
.form_box {
  display: flex;
  //   justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 220px;
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
>>> .el-input {
  line-height: 4;
  .el-input__inner {
    height: 45px;
  }
}
.btn {
  width: 300px;
}
@import "@/assets/styles/style.scss";
</style>
