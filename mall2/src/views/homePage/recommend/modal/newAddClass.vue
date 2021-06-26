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
        <el-checkbox-group v-model="checkList" @change="handleCheckboxVal">
          <el-checkbox v-for="it in checkboxList" :key="it.id" :label="it.id">{{
            it.name
          }}</el-checkbox>
        </el-checkbox-group>
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
      checkList: [],
      checkboxList: [
        { id: 1, name: "国产自拍" },
        { id: 2, name: "欧美大片" },
        { id: 3, name: "日本AV" }
      ]
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
    handleCheckboxVal(val) {
      console.log("val :>> ", val);
      console.log("this.checkList :>> ", this.checkList);
    },
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
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
