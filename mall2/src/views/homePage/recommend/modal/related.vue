<template>
  <div class="d_dialog">
    <el-dialog
      custom-class="custom-dialog"
      title="影片关联"
      :visible.sync="showDialog"
      width="50%"
      @close="handleCancel"
    >
      <div class="top">
        <el-row class="row-bg">
          <el-col :md="24" :lg="11">
            <div class="date">
              <span>上传日期</span>&nbsp;&nbsp;&nbsp;
              <el-date-picker
                v-model="DateTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="handleDateChange"
              />
            </div>
          </el-col>
          <el-col :md="10" :lg="6" :offset="1">
            <el-input
              v-model="movieName"
              show-word-limit
              placeholder="影片名称"
              clearable
              style="width: 200px"
            />
          </el-col>
          <el-col :md="10" :lg="4">
            <div class="btns">
              <el-button type="primary">搜索</el-button>
              <el-button type="primary">批量选择</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="content">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
          show-overflow-tooltip
          element-loading-text="Loading"
          border
          max-height="450"
          tooltip-effect="dark"
          fit
          stripe
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          highlight-current-row
          class="custom_table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="60" />
          <el-table-column label="影片" prop="" align="center">
          </el-table-column>
          <el-table-column label="影片名称" prop="" align="center">
          </el-table-column>
          <el-table-column label="上传日期" align="center" prop="">
          </el-table-column>
        </el-table>
      </div>
      <div class="dialog-footer">
        <span slot="footer">
          <el-button type="primary" @click="handleClickOK">确认关联</el-button>
        </span>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/paginations";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    pagination
  },
  data() {
    return {
      loading: false,
      DateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      movieName: "",
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 20
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
    //   全选
    handleSelectionChange(val) {},
    //时间选择
    handleDateChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
      }
    },
    //   弹窗确定
    handleClickOK() {
      this.$parent.isAss = false;
    },
    //取消弹窗
    handleCancel() {
      this.$parent.isAss = false;
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
.date,
.dialog-footer {
  @extend .dis_flex;
  flex-direction: row;
}
.content {
  margin-top: 20px;
}
.dialog-footer {
  margin-top: 20px;
  justify-content: space-between;
  .block {
    margin-top: 0;
  }
}
</style>
