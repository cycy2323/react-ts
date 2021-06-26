<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>交易筛选</h3>
        <div>
          <el-form :inline="true" :model="userForm">
            <el-form-item label="用户ID">
              <el-input v-model="userForm.userId" placeholder="请输入用户ID" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input
                v-model="userForm.username"
                type="text"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input
                v-model="userForm.nickname"
                type="text"
                placeholder="请输入用户昵称"
              />
            </el-form-item>
            <el-form-item label="交易类型">
              <el-select v-model="userForm.transType" clearable>
                <el-option
                  v-for="item in transTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="交易日期">
              <el-date-picker
                v-model="memberDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small"
                >查询</el-button
              >
              <el-button type="success" icon="el-icon-delete-solid" size="small"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="film_content">
        <div class="film_top">
          <h3>交易列表</h3>
          <el-button type="primary" icon="el-icon-document" size="small"
            >导出</el-button
          >
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
          size="small"
          show-overflow-tooltip
          element-loading-text="Loading"
          border
          max-height="570"
          tooltip-effect="dark"
          fit
          stripe
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          highlight-current-row
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
          />
          <el-table-column label="交易流水号" prop="" align="center" />
          <el-table-column label="用户ID" prop="userId" align="center" />
          <el-table-column align="center" label="用户名" prop="username" />
          <el-table-column label="用户昵称" align="center" prop="nickname" />
          <el-table-column label="交易类型" align="center" prop="" />
          <el-table-column label="抖币数量（个）" align="center" prop="" />
          <el-table-column label="交易日期" align="center" prop="" />
          <el-table-column
            label="账户抖币余额"
            prop="postDate"
            align="center"
            min-width="100"
          />
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <div />
  </div>
</template>

<script>
import pagination from "@/components/paginations";

export default {
  name: "UserDetail",
  components: { pagination },
  data() {
    return {
      loading: false,
      userForm: {
        userId: "",
        username: "",
        nickname: "",
        transType: "",
        startDate: "",
        endDate: ""
      },
      transTypeList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "收入"
        },
        {
          value: "1",
          label: "支出"
        }
      ],
      memberDate: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
</style>
