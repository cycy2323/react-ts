<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <div class="film_top">
          <h3>普通用户邀请奖励</h3>
          <div class="bar_right">
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="handleModal(false)"
              >新增邀请奖励</el-button
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
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"
          />
          <el-table-column label="邀请人数" prop="title" align="center" />
          <el-table-column
            label="长视频观影增加次数"
            show-overflow-tooltip
            prop="content"
            align="center"
          />
          <el-table-column
            align="center"
            label="短视频观影增加次数"
            prop="platform"
          />
          <el-table-column align="center" label="抖币奖励" prop="channelName" />
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
                type="primary"
                :disabled="scope.row.valided"
                @click="handleModal(true, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelTask(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 50px">
          <h3>VIP用户邀请奖励</h3>
          <div class="subtitle">每成功邀请1人</div>
          <el-table
            border
            style="width: 100%"
            v-loading="loading"
            :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
            size="small"
            max-height="540"
            show-overflow-tooltip
            element-loading-text="Loading"
            tooltip-effect="dark"
            fit
            stripe
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            highlight-current-row
          >
            <el-table-column
              prop="codeKey"
              align="center"
              label="增加VIP天数"
            />
            <el-table-column align="center" label="获得抖币数">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.value"
                  class="h-flex"
                  :min="0"
                  :disabled="id === scope.row.id ? false : true"
                  @change="handleChangeGold(scope.row.value)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    handleClickGold(
                      scope.row,
                      id === scope.row.id ? '确认' : '修改'
                    )
                  "
                >
                  <span class="h-edit">{{
                    id === scope.row.id ? "确认" : "修改"
                  }}</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
    <div />
    <invitation-reward :show="isAdd" :title="title" />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";

import invitationReward from "./modal/invitationReward";
export default {
  name: "InviteTask",
  components: {
    invitationReward
  },
  data() {
    return {
      loading: false,
      isAdd: false,
      title: ""
    };
  },
  mounted() {},
  methods: {
    //新增、编辑
    handleModal(bool, item) {
      this.isAdd = true;
      if (bool) {
        this.title = "新增邀请奖励";
      } else {
        this.title = "编辑邀请奖励";
      }
    },
    //删除
    handleDelTask(item) {
      let content =
        "确定删除该邀请奖励吗？删除后用户邀请对应的人数将无法获得相应的奖励";
      this.$confirm(content, "提示", {
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
.subtitle {
  line-height: 3;
  font-size: 16px;
  background: #f2f2f2;
  text-align: center;
  color: #333333;
  font-weight: 600;
}
.main {
  padding: 30px 50px !important;
}
.film_search {
  padding: 15px 40px 60px !important;
}
>>> .el-table--small th,
>>> td {
  font-size: 15px !important;
}
@import "@/assets/styles/style.scss";
</style>
