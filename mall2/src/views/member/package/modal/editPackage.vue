<template>
  <el-dialog
    custom-class="my-dialog"
    center
    title="VIP套餐编辑"
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
        :rules="rules"
      >
        <el-form-item label="VIP套餐名称" prop="channelName">
          <el-input
            v-model="form.packageName"
            show-word-limit
            clearable
            :style="{ width: '300px' }"
          />
        </el-form-item>
        <el-form-item label="VIP说明" prop="channelUrl">
          <el-input
            v-model="form.description"
            show-word-limit
            clearable
            :style="{ width: '300px' }"
          />
        </el-form-item>
        <el-form-item label="原价" prop="account">
          <el-input
            v-model="form.oldPrice"
            show-word-limit
            clearable
            :style="{ width: '300px' }"
          />
        </el-form-item>
        <el-form-item label="现价" prop="iosUrl">
          <el-input
            v-model="form.newPrice"
            show-word-limit
            clearable
            :style="{ width: '300px' }"
          />
        </el-form-item>
        <el-form-item label="套餐时长" prop="azUrl">
          <el-select
            v-model="form.packageTime"
            clearable
            :style="{ width: '300px' }"
          >
            <el-option
              v-for="item in packageList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      packageList: [
        {
          value: "1",
          label: "1个月"
        },
        {
          value: "2",
          label: "3个月"
        },
        {
          value: "3",
          label: "12个月"
        },
        {
          value: "4",
          label: "永久"
        }
      ],
      rules: {
        channelName: [
          { required: true, message: "渠道名称不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        channelUrl: [
          { required: true, message: "渠道url不能为空", trigger: "blur" },
          {
            min: 1,
            max: 120,
            message: "长度在 1 到 120 个字符",
            trigger: "blur"
          }
        ],
        account: [
          { required: true, message: "渠道人账号不能为空", trigger: "blur" }
        ],
        iosUrl: [
          {
            required: true,
            message: "iOS渠道下载地址不能为空",
            trigger: "blur"
          }
        ],
        azUrl: [
          {
            required: true,
            message: "安卓渠道下载地址不能为空",
            trigger: "blur"
          }
        ]
      },
      form: {
        packageName: "",
        description: "",
        oldPrice: "",
        newPrice: "",
        packageTime: "1"
      }
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isPackage = false;
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
