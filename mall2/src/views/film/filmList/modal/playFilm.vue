<template>
  <el-dialog
    center
    title="播放视频"
    :visible.sync="show"
    width="900px"
    :before-close="handleCancel"
  >
    <div style="text-align: center;">
      <video
        id="container"
        class="video-js vjs-big-play-centered"
        width="800"
        height="500"
        controls
        :src="url"
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
      ></video>
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
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      let myVideo = document.getElementById("container");
      myVideo.currentTime = 0;
      myVideo.pause();
      this.$parent.isPlay = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
