<template>
  <el-dialog
    title="消息发布"
    :destroy-on-close="true"
    :visible.sync="show"
    width="50%"
    class="dialog-style my-dialog"
    center
    :before-close="handleCancel"
  >
    <div class="form_box">
      <el-form
        ref="ruleForm"
        :model="form"
        :style="{ width: '280px' }"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="发送平台">
          <el-select v-model="form.plamform" clearable>
            <el-option
              v-for="item in optionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              placeholder="请选择发送平台"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <div class="username_box">
            <el-checkbox v-model="checkbox" @change="handleChange" />
            <el-input
              class="username_input"
              v-model="form.userName"
              clearable
              placeholder="请输入用户名"
            />
          </div>
          <p v-show="checkbox">仅为此单个用户发送消息</p>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input
            v-model="form.title"
            minlength="1"
            maxlength="30"
            show-word-limit
            type="textarea"
            clearable
            placeholder="请输入消息标题"
            rows="2"
          />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            v-model="form.context"
            minlength="1"
            maxlength="500"
            show-word-limit
            type="textarea"
            clearable
            placeholder="请输入消息内容"
            rows="4"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="_publishMessage('ruleForm')"
        >发布</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    optionsList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      form: {
        plamform: "-1",
        userName: "",
        title: "",
        context: ""
      },
      checkbox: false,
      rules: [{ required: true, message: "渠道名称不能为空", trigger: "blur" }]
    };
  },
  mounted() {},
  methods: {
    // 切换checkbox
    handleChange(val) {
      this.checkbox = val;
    },
    //取消弹窗
    handleCancel() {
      this.$parent.isRelease = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.form_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.username_box {
  @extend .form_box;
  flex-direction: row;
  justify-content: space-between;
  width: 250px;
}
.username_input {
  width: 220px;
  >>> .el-input__inner {
    width: 100% !important;
  }
}
>>> .el-input__inner,
>>> .el-textarea__inner {
  width: 250px;
}
p{
    margin: 0;
    padding: 0;
}
</style>
