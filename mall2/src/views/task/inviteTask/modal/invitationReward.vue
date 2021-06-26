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
        ref="ruleForm"
        :model="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="邀请人数选择">
          <el-select v-model="ruleForm.invitNum" clearable>
            <el-option v-for="item in invitNumList" :key="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="长视频观影次数增加">
          <el-select v-model="ruleForm.longTimes" clearable>
            <el-option
              v-for="item in longTimesList"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="短视频观影次数增加">
          <el-select v-model="ruleForm.shortTimes" clearable>
            <el-option
              v-for="item in shortTimesList"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="抖币数奖励" prop="reward">
          <el-input
            v-model="ruleForm.reward"
            show-word-limit
            placeholder="请输入整数"
            clearable
          />
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
      invitNumList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      longTimesList: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15"
      ],
      shortTimesList: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      rules: {
        reward: [
          { required: true, message: "请输入抖币数", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isAdd = false;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
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
</style>
