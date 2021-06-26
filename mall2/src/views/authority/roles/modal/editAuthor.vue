<template>
  <el-dialog
    title="修改权限"
    :destroy-on-close="true"
    :visible.sync="show"
    width="50%"
    center
    :before-close="handleCancel"
  >
    <div class="form_box">
      <!-- <Tree
        v-for="item in menu.filter(router => !!router.list.length)"
        :key="item.id"
        ref="getTree"
        :permissionmenu="[{ ...item, name: undefined }]"
        :defaultprops="defaultProps"
        :roleitemmenu="
          userForm.menu.find(roleitem => roleitem.name === item.name)
        "
      /> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Tree from "@/components/Tree";
export default {
  components: {
    Tree
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //取消弹窗
    handleCancel() {
      this.$parent.isEditAuthor = false;
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
