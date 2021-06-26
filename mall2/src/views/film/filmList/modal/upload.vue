<template>
  <el-dialog
    center
    custom-class="custom-dialog"
    title="视频上传"
    :before-close="handleCancel"
    :visible.sync="show"
    width="50%"
    :close-on-click-modal="false"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="Loading"
  >
    <el-form
      ref="upruleForm"
      :model="uploadForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>
        <el-input
          v-model="uploadForm.videoTitle"
          minlength="2"
          maxlength="30"
          show-word-limit
          type="textarea"
          placeholder="请输入视频名称"
          rows="2"
        />
      </el-form-item>
      <el-upload
        id="files"
        ref="upload"
        multiple
        class="upload-demo"
        style="padding-right: 20px; text-align: center;"
        accept=".mp4, .MP4"
      >
        <el-button
          style="position: absolute;left: 130px;margin-top: 0px;"
          size="small"
          type="primary"
          >选择视频上传</el-button
        >
        <div style="margin-top: 50px;margin-left: -100px;">
          <span class="font-warn"
            >* 只能上传大于10秒且小于300M视频，最多10个视频</span
          >
        </div>
      </el-upload>
      <el-form-item style="margin-top:20px;">
        <el-select placeholder="请选择官方账号昵称">
          <!-- <el-option
            v-for="item in nickIdOptions"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          /> -->
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleUploadFilm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      uploadForm: {
        videoTitle: ""
      }
    };
  },
  methods: {
    //确定
    handleUploadFilm() {},
    //取消弹窗
    handleCancel() {
      this.$parent.isUpload = false;
    }
  }
};
</script>
