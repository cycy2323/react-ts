<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>成员筛选</h3>
        <el-form
          ref="ruleForm"
          class="searchForm"
          :model="ruleForm"
          :inline="true"
          status-icon
          label-width="100px"
          size="small"
        >
          <el-form-item label="成员账号">
            <el-input
              v-model="ruleForm.account"
              placeholder="请输入成员账号"
              clearable
            />
          </el-form-item>

          <el-form-item label="成员用户名">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入成员用户名"
              clearable
            />
          </el-form-item>

          <el-form-item label="成员角色">
            <el-select v-model="ruleForm.roles" clearable>
              <el-option
                v-for="item in rolesList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>

          <el-form-item :style="{ marginLeft: '20px' }">
            <el-button type="primary" icon="el-icon-search" size="small"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item :style="{ marginLeft: '20px' }">
            <el-button type="success" icon="el-icon-delete-solid" size="small"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="film_content">
        <div class="film_top">
          <h3>成员列表</h3>
          <div class="bar_right">
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="handleEdit(false)"
              >添加成员</el-button
            >
            <el-button type="primary" icon="el-icon-document">导出</el-button>
          </div>
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="memberList"
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
            label="成员账号"
            prop="loginAccount"
            align="center"
          />
          <el-table-column
            label="成员用户名"
            prop="memberName"
            align="center"
          />
          <el-table-column label="所属角色" align="center">
            <!-- <template slot-scope="scope">{{
              selectRole &&
              selectRole.length &&
              selectRole.find(item => item.value === scope.row.belongRole)
                ? selectRole.find(item => item.value === scope.row.belongRole)
                    .name
                : ""
            }}</template> -->
          </el-table-column>
          <el-table-column label="添加时间" prop="createTime" align="center" />
          <el-table-column
            label="最后登录"
            prop="lastLoginTime"
            align="center"
          />
          <el-table-column prop="created_at" align="center" label="是否启用">
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.disOK"
                v-model="scope.row.isValid"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
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
                @click="handleEdit(true, scope.row)"
                >编辑</el-button
              >

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
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
    <!-- 添加、编辑 -->
    <edit-member :show="isEdit" />
  </div>
</template>
<script>
import pagination from "@/components/paginations";
import editMember from "./modal/editMember";
import dataJson from "./data.json";
export default {
  name:"Member",
  components: {
    pagination,
    editMember
  },
  data() {
    return {
      rolesList: [
        { key: "-1", value: "全部" },
        { key: "1", value: "普通用户" },
        { key: "2", value: "会员用户" },
        { key: "3", value: "封禁用户" }
      ],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      ruleForm: {
        account: "",
        username: "",
        roles: "-1"
      },
      memberList: [],
      isEdit: false
    };
  },
  mounted() {
    this.getFetchData();
  },
  methods: {
    //获取列表
    getFetchData() {
      const { pageNum, pageSize, total, list } = dataJson.data;
      this.pages = {
        pageNum,
        pageSize,
        total: Number(total)
      };
      this.memberList = list;
    },
    // 编辑、添加
    handleEdit(bool, item) {
      this.isEdit = true;
    },
    // 删除公告
    handleDelete(item) {
      this.$confirm("确认要删除该成员吗？", "提示", {
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
