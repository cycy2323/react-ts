<template>
  <div class="container">
    <main class="main">
      <div class="film_content">
        <div>
          <div class="film_top">
            <h3>VIP权益列表</h3>
            <el-button type="primary" size="small" @click="handleEdit(false)"
              >添加权益</el-button
            >
          </div>
          <!-- 列表 -->
          <el-table
            ref="multipleTable"
            :data="equityList"
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
            <el-table-column label="权益名称" prop="name" align="center" />
            <el-table-column label="权益图标" align="center">
              <template slot-scope="scope">
                <el-avatar :src="scope.row.icon"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column
              label="修改时间"
              prop="updateTime"
              align="center"
            />

            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  :disabled="scope.row.valided"
                  @click="handleEdit(true, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  :disabled="scope.row.valided"
                  @click="handleDel(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div style="margin-top: 50px">
          <div class="film_top">
            <h3>VIP权益设置</h3>
          </div>
          <!-- 列表 -->
          <el-table
            ref="multipleTable"
            :data="equityList"
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
            <el-table-column label="VIP名称" prop="name" align="center" />
            <el-table-column label="权益显示" align="center" />
            <el-table-column
              label="修改时间"
              prop="updateTime"
              align="center"
            />
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleSetting(scope.row)"
                  >设置VIP权益</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
    <div />
    <!-- 添加，编辑 -->
    <equity-modal :show="isEdit" :title="title" />
    <!-- 设置VIP权益 -->
    <setting-modal :show="isSetting" :title="settingTitle" />
  </div>
</template>
<script>
// import { queryList, setStatus, deleteNotice } from "@/api/announcement.js";
import equityModal from "./modal/equityModal";
import settingModal from "./modal/settingModal";
export default {
  name:"Equity",
  components: {
    equityModal,
    settingModal
  },
  data() {
    return {
      loading: false,
      title: "",
      settingTitle: "",
      isEdit: false,
      isSetting: false,
      equityList: [
        {
          name: "至尊卡标识",
          icon: require("@/assets/images/d_avatar@2x.png"),
          updateTime: "2020-05-20 20:01:30"
        },
        {
          name: "钻石卡标识",
          icon: require("@/assets/images/d_avatar@2x.png"),
          updateTime: "2020-05-20 20:01:30"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    //   添加/编辑
    handleEdit(bool, item) {
      this.isEdit = true;
      if (!bool) {
        this.title = "添加VIP权益";
      } else {
        this.title = "VIP权益";
      }
    },
    // 设置VIP权益
    handleSetting(item) {
      this.isSetting = true;
      this.settingTitle = item.name;
    },

    //删除
    handleDel(item) {
      let content = "确认删除该权益吗？删除后前端对应的VIP权益下不显示该权益";
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
@import "@/assets/styles/style.scss";
</style>
