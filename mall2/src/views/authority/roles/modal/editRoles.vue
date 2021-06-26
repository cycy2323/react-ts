<template>
  <el-dialog
    :title="title"
    :destroy-on-close="true"
    :visible.sync="show"
    width="50%"
    class=""
    center
    :before-close="handleCancel"
  >
    <div class="form_box">
      <el-form
        ref="ruleForm"
        :model="userForm"
        :rules="rules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="userForm.name"
            placeholder="请输入角色名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="职能描述" prop="description">
          <el-input
            v-model="userForm.description"
            type="textarea"
            clearable
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入职能描述"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import { saveNotice } from "@/api/announcement.js";
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
      userForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "角色名字不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "角色描述不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isEditRoles = false;
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
