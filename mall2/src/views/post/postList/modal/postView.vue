<template>
  <el-dialog
    custom-class="my-dialog"
    center
    title="帖子详情"
    width="50%"
    :visible.sync="show"
    :before-close="handleCancel"
  >
    <div class="form_box">
      <div>
        <!-- text -->
        <div class="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
          dolores aliquid fugiat eius ab similique ratione hic tenetur odio, cum
          eveniet facere maxime earum tempora iste. Consectetur sit perferendis
          quisquam.
        </div>
        <!-- img -->
        <!-- <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"
              :preview-src-list="urls"
            ></el-image>
          </div>
        </div> -->
        <!-- video -->
        <div class="d_video">
          <video
            id="container"
            class="video-js vjs-big-play-centered my_video"
            controls
            :src="videoUrl"
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
          ></video>
        </div>
      </div>
    </div>
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
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      urls: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      videoUrl:
        "http://www.doudong888.com/bucket-test/d1m0oybb3qsgtw6n/45b963397aa40d4a0063e0d85e4fe7a1/srp5v8z1n8/20201120/16/b6cf2dba7a2846808551de202937f041"
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isView = false;
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
  height: 100%;
}
.demo-ruleForm {
  width: 80%;
  margin: 0 auto;
}
.demo-image {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.block {
  display: inline;
}
>>> .my-dialog {
  min-height: 35vh;
  .el-dialog__body {
    min-height: 55vh;
    height: 55vh;
    padding: 15px 40px 40px;
  }
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .d_video {
    margin-top: 30px;
    background: #3fdd86;
    min-width: 40vw;
    width: 45vw;
    height: 370px;
  }
  .my_video {
    width: 100%;
    height: 100%;
  }
}
</style>
