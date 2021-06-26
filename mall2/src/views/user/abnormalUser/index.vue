<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>用户筛选</h3>
        <div>
          <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline searchForm"
          >
            <el-form-item label="用户ID">
              <el-input v-model="form.userId" placeholder="请输入用户ID" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>

            <el-form-item label="上传日期">
              <el-date-picker
                v-model="uploadDate"
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
          <h3>用户列表</h3>
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
          <el-table-column align="center" type="selection" width="55" />
          <el-table-column
            align="center"
            prop="id"
            label="用户ID"
            min-width="120"
          />
          <el-table-column label="头像" align="center">
            <template>
              <el-avatar
                class="a_circle"
                :size="50"
                fit="fit"
                src="https://el-admin.xin/avatar/avatar.jpeg"
                @error="errorHandler"
              >
                <img :src="defaultImg" />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="account" align="center" />
          <el-table-column label="昵称" prop="nickname" align="center" />
          <el-table-column
            prop="createTime"
            min-width="100"
            label="注册日期"
            align="center"
          />
          <el-table-column align="center" prop="goldNumber" label="登录IP" />

          <el-table-column
            align="center"
            min-width="200"
            fixed="right"
            prop="created_at"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleBlock(scope.row)"
                >{{ scope.row.isValid ? "封杀" : "解封" }}</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.row)"
                >查看</el-button
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
  </div>
</template>

<script>
import pagination from "@/components/paginations";
export default {
  name: "AbnormalUser",
  components: { pagination },
  data() {
    return {
      loading: false,
      form: {
        userId: "",
        username: "",
        nickname: "",
        startDate: "",
        endDate: ""
      },

      defaultImg: require("@/assets/images/d_avatar@2x.png"),
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      uploadDate: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      userList: [],
      isEdit: true,
      itemData: null
    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    //获取列表数据
    fetchUserList() {
      // let { pageNum, pageSize, total, list } = data.data;
      // this.pages = {
      //   pageNum: pageNum,
      //   pageSize: pageSize,
      //   total: Number(total)
      // };
      // this.userList = list;
    },
    //avatar error
    errorHandler() {
      return true;
    },

    // 封杀/解封
    handleBlock(data) {
      let context = "";
      let title = "";
      if (data.isValid) {
        context = "确认对该用户进行封禁吗？封禁后该用户不可再进行登录";
        title = "封杀用户";
      } else {
        context = "确认解封该用户吗？解封后该用户可以重新进行登录";
        title = "解封用户";
      }
      this.$confirm(context, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {})
        .catch(() => {});
    },
    // delete
    handleDelete(item) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {})
        .catch(() => {});
    },
    // 查看详情
    handleEdit(item) {
      this.itemData = item;
      this.isEdit = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
.a_circle {
  border-radius: 50%;
}
</style>
