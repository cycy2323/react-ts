<template>
  <el-dialog
    custom-class="my-dialog"
    center
    title="帖子发布"
    width="50%"
    :visible.sync="show"
    :before-close="handleCancel"
  >
    <div class="form_box">
      <el-form ref="ruleForm" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="">
          <el-select
            v-model="ruleForm.account"
            clearable
            placeholder="选择官方账号"
            style="width:50%"
          >
            <!-- <el-option /> -->
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="">
          <el-input
            v-model="ruleForm.content"
            show-word-limit
            placeholder="请输入帖子内容"
            clearable
            type="textarea"
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 10 }"
            maxlength="2000"
          />
        </el-form-item>
        <el-form-item label="">
          <el-upload
            class="upload-demo"
            action
            :http-request="handleUpload"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" style="width: 100px" type="primary"
              >上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary">确 定</el-button>
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
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ruleForm: {
        invitNum: "",
        longTimes: "",
        shortTimes: "",
        reward: ""
      },
      accountList: []
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isPost = false;
    },
    // 上传
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {},
    handleUpload() {}
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
.demo-ruleForm {
  width: 80%;
  margin: 0 auto;
}
</style>
