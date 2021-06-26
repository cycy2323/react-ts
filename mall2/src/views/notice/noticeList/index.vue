<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>公告筛选</h3>
        <el-form
          ref="ruleForm"
          class="searchForm"
          :model="ruleForm"
          :inline="true"
          status-icon
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="发布平台">
                <el-select
                  v-model="ruleForm.platform"
                  placeholder="请选择发布平台"
                  clearable
                >
                  <el-option
                    v-for="item in optiones"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发布渠道">
                <el-select v-model="ruleForm.channelId" clearable>
                  <el-option
                    v-for="item in channelOpts"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="公告标题">
                <el-input
                  v-model="ruleForm.title"
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入公告标题"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="发布日期">
                <el-date-picker
                  v-model="startTimeEndTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :style="{ marginLeft: '20px' }">
                <el-button type="primary" icon="el-icon-search" size="small"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item :style="{ marginLeft: '20px' }">
                <el-button
                  type="success"
                  icon="el-icon-delete-solid"
                  size="small"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="film_content">
        <div class="film_top">
          <h3>公告列表</h3>
          <div class="bar_right">
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="handleNotice(false)"
              >发布公告</el-button
            >
          </div>
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
          <el-table-column label="公告标题" prop="title" align="center" />
          <el-table-column
            label="公告内容"
            show-overflow-tooltip
            prop="content"
            align="center"
          />
          <el-table-column
            align="center"
            label="发布平台"
            :formatter="platformOK"
            prop="platform"
          />
          <el-table-column align="center" label="发布渠道" prop="channelName" />
          <el-table-column label="发布人" prop="publishUser" align="center" />
          <el-table-column
            label="发布时间"
            min-width="100"
            prop="publishTime"
            align="center"
          />
          <el-table-column label="层级" align="center">
            <template slot-scope="scope">
              {{ `${scope.row.level}级` }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-button
                style="cursor: text;"
                size="mini"
                :type="scope.row.valided ? 'success' : 'warning'"
              >
                {{ scope.row.valided ? "上架" : "下架" }}
              </el-button>
            </template>
          </el-table-column>
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
                type="primary"
                :disabled="scope.row.valided"
                @click="handleNotice(true, scope.row)"
                >编辑</el-button
              >
              <el-button
                class="btn_change_handle"
                size="mini"
                :type="scope.row.valided ? 'warning' : 'success'"
                @click="validedUpDown(scope.row)"
                >{{ scope.row.valided ? "下架" : "上架" }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelNotice(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <div />

    <!-- 发布消息 -->
    <notice-dialog :show="isNotice" :dialogTitle="dialogTitle" />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";
// import { channelList } from "@/api/channel.js";
import noticeDialog from "./modal/noticeDialog";
import pagination from "@/components/paginations";
export default {
  name:"NoticeList",
  components: {
    noticeDialog,
    pagination
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
      isNotice: false,
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
    handleNotice(bol, item) {
      this.isNotice = true;
      if (bol) {
        this.dialogTitle = {
          title: "编辑公告",
          bol: bol
        };
      } else {
        this.dialogTitle = {
          title: "发布公告",
          bol: bol
        };
      }
    },
    // 上下架
    validedUpDownI(row) {
      if (!row.valided) {
        this.$confirm("确认上架此公告吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
          .then(() => {})
          .catch(() => {});
      } else {
        this.$confirm("确认上架此公告吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    // 删除公告
    handleDelNotice(item) {
      this.$confirm("确认要删除该公告吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
</style>
