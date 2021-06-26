<template>
  <div class="d_dialog">
    <el-dialog
      custom-class="custom-dialog"
      center
      title="新增分类"
      :visible.sync="showDialog"
      width="40%"
      @close="handleCancel"
    >
      <div class="dis_flex">
        <el-form ref="form" :model="form" class="demo-ruleForm" :rules="rules">
          <el-form-item label="" prop="addName">
            <el-input
              v-model="form.addName"
              show-word-limit
              placeholder="请输入分类的名称"
              clearable
              :style="{ width: '300px' }"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleClickOK">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
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
      form: {
        addName: ""
      },
      rules: {
        addName: [
          { required: true, message: "分类的名称不能为空", trigger: "blur" },
          {
            min: 6,
            max: 8,
            message: "请输入至少不得低于6个字符，最多不得高于8个字符的名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    //   弹窗确定
    handleClickOK() {
      this.$parent.isAdd = false;
    },
    //取消弹窗
    handleCancel() {
      this.$parent.isAdd = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.dis_flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
