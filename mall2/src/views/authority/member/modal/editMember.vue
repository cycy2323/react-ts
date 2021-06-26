<template>
  <el-dialog
    title="成员"
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
        label-width="100px"
      >
        <el-form-item label="登录账号" prop="loginAccount">
          <el-input
            v-model="userForm.loginAccount"
            placeholder="请输入登录账号"
            clearable
          />
        </el-form-item>
        <el-form-item label="成员姓名" prop="name">
          <el-input
            v-model="userForm.name"
            placeholder="请输入成员姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="所属角色" prop="roles">
          <el-input
            v-model="userForm.roles"
            placeholder="请输入所属角色"
            clearable
          />
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input
            v-model="userForm.passworld"
            placeholder="非必填"
            clearable
          />
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="userForm.pwd" placeholder="非必填" clearable />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="userForm.description"
            type="textarea"
            clearable
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入备注信息"
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
    }
  },
  data() {
    return {
      userForm: {
        loginAccount: "",
        name: "",
        roles: "",
        passworld: "",
        pwd: "",
        description: ""
      },
      rules: {
        loginAccount: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "成员姓名不能为空", trigger: "blur" }
        ],
        roles: [
          { required: true, message: "所属角色不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isEdit = false;
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
