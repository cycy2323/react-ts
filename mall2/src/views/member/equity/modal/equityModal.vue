<template>
  <el-dialog
    custom-class="my-dialog"
    center
    :title="title"
    width="50%"
    :visible.sync="show"
    :before-close="handleCancel"
  >
    <div class="form_box">
      <el-form
        ref="searchForm"
        :model="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="权益名称" prop="channelName">
          <el-input
            v-model="form.equityName"
            show-word-limit
            clearable
            :style="{ width: '300px' }"
          />
        </el-form-item>
        <el-form-item label="权益图标" prop="channelUrl">
          <el-upload
            class="upload-demo"
            action
            :http-request="handleUploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">添加图片</el-button>
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
      rules: {
        channelName: [
          { required: true, message: "渠道名称不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      },
      form: {
        equityName: ""
      }
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isEdit = false;
    },
    // 上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleUploadImg() {}
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
</style>
