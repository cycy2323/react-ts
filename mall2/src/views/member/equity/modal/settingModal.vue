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
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="it in checkBoxList"
          :key="it.key"
          :value="it.key"
          :label="it.value"
        ></el-checkbox>
      </el-checkbox-group>
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
      checkBoxList: [
        { key: "1", value: "至尊卡标识" },
        { key: "2", value: "钻石卡标识" },
        { key: "3", value: "无限观影" },
        { key: "4", value: "社区评论" },
        { key: "5", value: "免播放广告" },
        { key: "6", value: "动态优先审核" },
        { key: "7", value: "更换头像" }
      ],
      checkList: []
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isSetting = false;
      this.checkList = [];
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
  line-height: 3;
  width: 65%;
  margin: 0 auto;
}
</style>
