<template>
  <div class="container">
    <main class="main">
      <div class="film_content">
        <div class="film_top">
          <h3>VIP套餐列表</h3>
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
        :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
          size="small"
          max-height="540"
          show-overflow-tooltip
          element-loading-text="Loading"
          border
          tooltip-effect="dark"
          fit
          stripe
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          highlight-current-row
        >
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column label="VIP名称" prop="title" align="center" />
          <el-table-column
            label="VIP说明"
            show-overflow-tooltip
            prop="content"
            align="center"
          />
          <el-table-column
            align="center"
            label="原价（抖币）"
            prop="platform"
          />
          <el-table-column
            align="center"
            label="现价（抖币）"
            prop="channelName"
          />
          <el-table-column
            label="VIP套餐时长"
            prop="publishUser"
            align="center"
          />
          <el-table-column
            label="修改人"
            min-width="100"
            prop="publishTime"
            align="center"
          />
          <el-table-column
            label="修改时间"
            min-width="100"
            prop="publishTime"
            align="center"
          />

          <el-table-column
            align="center"
            min-width="100"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="btn_change_handle"
                size="mini"
                :type="scope.row.valided ? 'warning' : 'success'"
                @click="validedUpDown(scope.row)"
                >{{ scope.row.valided ? "下架" : "上架" }}</el-button
              >
              <el-button
                class="btn_change_handle"
                size="mini"
                type="primary"
                :disabled="scope.row.valided"
                @click="handleEdit(true, scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <div />
    <!-- vip套餐编辑 -->
    <edit-package :show="isPackage" />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";
import editPackage from "./modal/editPackage";
import pagination from "@/components/paginations";
export default {
  name:"Package",
  components: {
    pagination,
    editPackage
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); //如果当天可选，就不用减8.64e7
        }
      },
      startTimeEndTime: [],
      optiones: [
        { key: 0, value: "全部" },
        { key: 1, value: "苹果" },
        { key: 2, value: "安卓" }
      ],
      channelOpts: [{ key: "-1", value: "全部渠道" }],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      isPackage: false,
      ruleForm: {
        channelId: "-1",
        platform: 0,
        title: "",
        beginDate: "",
        endDate: ""
      },
      dialogTitle: {
        title: "",
        bol: false
      }
    };
  },
  created() {},
  methods: {
    //   发布公告
    handleEdit(item) {
      this.isPackage = true;
    },
    // 上下架
    validedUpDownI(row) {
      if (!row.valided) {
        this.$confirm(
          "确定上架该VIP套餐吗？上架后用户可进行该套餐的购买",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }
        )
          .then(() => {})
          .catch(() => {});
      } else {
        this.$confirm(
          "确定下架该VIP套餐吗？下架后用户在前端不可见该VIP套餐",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }
        )
          .then(() => {})
          .catch(() => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
</style>
