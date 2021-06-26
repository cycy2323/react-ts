<template>
  <div class="s-user">
    <div class="base">
      <div class="p_chart">
        <h4>短视频上传</h4>
        <div class="btns">
          <div
            v-for="item in uploadList"
            :key="item.value"
            :class="[idx === item.value ? 'btn-active' : 'btn-txt']"
            @click="handleBtns('video', item)"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="p_text">
          昨日上传<span class="p_num">20</span>部，审核通过<span class="p_num"
            >19</span
          >部
        </div>
      </div>
    </div>
    <div style="margin-top:30px"></div>
    <div class="base">
      <div class="p_chart">
        <h4>帖子发布</h4>
        <div class="btns">
          <div
            v-for="item in postList"
            :key="item.value"
            :class="[index === item.value ? 'btn-active' : 'btn-txt']"
            @click="handleBtns('post', item)"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="p_text">
          昨日上传<span class="p_num">20</span>部，审核通过<span class="p_num"
            >19</span
          >部
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserUpload",
  components: {},
  data() {
    return {
      idx: "1",
      index: "1",
      uploadList: [
        { name: "昨日上传", value: "1" },
        { name: "今日上传", value: "2" },
        { name: "上周上传", value: "3" },
        { name: "本周上传", value: "4" },
        { name: "上月上传", value: "5" },
        { name: "本月上传", value: "6" }
      ],
      postList: [
        { name: "昨日发布", value: "1" },
        { name: "今日发布", value: "2" },
        { name: "上周发布", value: "3" },
        { name: "本周发布", value: "4" },
        { name: "上月发布", value: "5" },
        { name: "本月发布", value: "6" }
      ]
    };
  },
  mounted() {},
  methods: {
    // 切换btns
    handleBtns(type, it) {
      type === "video" ? (this.idx = it.value) : (this.index = it.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.p_chart {
  .btns {
    width: 70%;
    justify-content: space-between;
  }
  .p_line {
    margin-top: 40px;
  }
  .p_text {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    .p_num {
      color: #02a7f0;
    }
  }
}
.btns {
  @extend .disflex;
}
.btn-txt,
.btn-active {
  // width: 130px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 30px;
  border-radius: 20px;
  font-size: 14px;
}
.btn-active {
  background: #169bd5;
  color: #fff;
}
.btn-txt {
  border: 1px solid #ccc;
}

@import "@/styles/statistics.scss";
</style>
