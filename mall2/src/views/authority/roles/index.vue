<template>
  <div class="container">
    <main class="main">
      <div class="film_content">
        <div class="film_top">
          <h3>角色列表</h3>
          <div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="editRoles(false)"
              >添加角色</el-button
            >
            <el-button type="primary" icon="el-icon-document">导出</el-button>
          </div>
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="rolesList"
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
          <el-table-column label="角色" prop="name" align="center" />
          <el-table-column label="职能描述" prop="description" align="center" />
          <el-table-column label="成员数量" prop="num" align="center" />
          <el-table-column
            label="添加时间"
            min-width="130"
            prop="createTime"
            align="center"
          />
          <el-table-column label="是否启用" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isValid"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleSwitch(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="150"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleAuthor(scope.row)"
                >权限设置</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="editRoles(true, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
              <!-- @click="_deleteRole(scope.row.id, scope.$index)" -->
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <div />
    <!-- 添加、编辑角色 -->
    <edit-roles :show="isEditRoles" :title="title" />
    <!-- 修改权限 -->
    <edit-author :show="isEditAuthor" />
  </div>
</template>

<script>
import pagination from "@/components/paginations";
import editRoles from "./modal/editRoles";
import editAuthor from "./modal/editAuthor";
import dataJson from "./data.json";
export default {
  name: "Roles",
  components: { pagination, editRoles, editAuthor },
  data() {
    return {
      loading: false,
      rolesList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isEditRoles: false,
      isEditAuthor: false,
      title: ""
    };
  },
  mounted() {
    this.getFetchData();
  },
  methods: {
    //列表
    getFetchData() {
      const { pageNum, pageSize, total, list } = dataJson.data;
      this.pages = {
        pageNum,
        pageSize,
        total: Number(total)
      };
      this.rolesList = list;
    },
    // 添加、编辑角色
    editRoles(bool, item) {
      this.isEditRoles = true;
      if (bool) {
        this.title = "编辑角色";
      } else {
        this.title = "添加角色";
      }
    },
    // 修改权限
    handleAuthor(item) {
      this.isEditAuthor = true;
    },
    // 删除
    handleDelete(item) {
      this.$confirm("确定删除该角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {})
        .catch(() => {});
    },
    // 修改开关
    handleSwitch(item) {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
.a_circle {
  border-radius: 50%;
}
</style>
