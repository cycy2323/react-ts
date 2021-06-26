<template>
  <div>
    <el-dialog
      :title="dialogTitle.title"
      :destroy-on-close="true"
      :visible.sync="show"
      width="50%"
      class=""
      center
      :before-close="handleCancel"
    >
      <div class="form_box">
        <el-form
          ref="searchForm"
          :model="searchForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="发布平台">
            <el-select v-model="searchForm.platform" clearable>
              <el-option
                v-for="item in optiones"
                :key="item.key"
                :label="item.value"
                :value="item.key"
                placeholder="请选择发布平台"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发布渠道">
            <el-select v-model="searchForm.channelId" clearable>
              <el-option
                v-for="item in channelList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="显示层级">
            <el-select v-model="searchForm.level" clearable>
              <el-option
                v-for="item in option"
                :key="item.key"
                :label="item.value"
                :value="item.key"
                placeholder="请选择显示层级"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公告标题">
            <el-input
              v-model="searchForm.title"
              maxlength="30"
              show-word-limit
              placeholder="请输入公告标题"
              clearable
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input
              v-model="searchForm.context"
              minlength="1"
              maxlength="500"
              show-word-limit
              type="textarea"
              clearable
              placeholder="请输入公告内容"
              rows="5"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" :style="{ marginBottom: '0' }">
        <el-button size="small" @click="handleCancel">取 消</el-button>
        <el-button type="primary" size="small">{{
          dialogTitle.bol ? "确定" : "发布"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { saveNotice } from "@/api/announcement.js";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      searchForm: {
        platform: 0,
        title: "",
        context: "",
        level: 1,
        id: "",
        channelId: "-1"
      },
      option: [
        { key: 1, value: "1级" },
        { key: 2, value: "2级" },
        { key: 3, value: "3级" }
      ],
      optiones: [
        { key: 0, value: "全部" },
        { key: 1, value: "苹果" },
        { key: 2, value: "安卓" }
      ]
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isNotice = false;
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
>>> .el-input__inner,
>>> .el-textarea__inner {
  width: 300px;
}
</style>
