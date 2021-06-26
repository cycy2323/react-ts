<template>
  <div class="container">
    <main class="main">
      <div class="film_content">
        <div class="film_top">
          <h3>视频筛选</h3>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleNewAdd"
            >新增分类</el-button
          >
        </div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="list"
          :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
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
            label="序号"
            align="center"
            width="60"
            type="index"
          />
          <el-table-column label="分类名称" prop="name" align="center" />

          <el-table-column label="状态" prop="status" align="center">
          </el-table-column>
          <el-table-column label="影片数" prop="movies" align="center">
          </el-table-column>
          <el-table-column label="上架时间" align="center" prop="updateTime">
          </el-table-column>
          <el-table-column
            align="center"
            min-width="130"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="btn_change_handle"
                size="mini"
                :type="scope.row.movies != 0 ? 'success' : 'info'"
                @click="handleShelf(scope.row)"
                >{{ !scope.row.upStatus ? "上架" : "下架" }}</el-button
              >
              <el-button
                class="btn_change_handle"
                size="mini"
                type="primary"
                @click="handleRelated(scope.row)"
                >{{ scope.row.association ? "影片关联" : "" }}</el-button
              >
              <el-button
                class="btn_change_handle"
                size="mini"
                @click="handleDelete(scope.row)"
                :type="
                  scope.row.upStatus && scope.row.association
                    ? 'info'
                    : 'danger'
                "
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <!-- 新增分类 -->
    <newAddClass :show="isAdd" />
    <!-- 影片关联 -->
    <related :show="isAss" :data="assData" />
  </div>
</template>
<script>
import pagination from "@/components/paginations";
import newAddClass from "./modal/newAddClass.vue";
import related from "./modal/related.vue";

// import { videoList } from "@/api/home/classification";

export default {
  name: "Classification",
  components: { pagination, newAddClass, related },
  data() {
    return {
      loading: false,
      list: [
        {
          name: "国产自拍",
          status: "展示中",
          movies: "200",
          updateTime: "2020-08-28  12:24:32",
          upStatus: true,
          association: true
        },
        {
          name: "日本AV",
          status: "已屏蔽",
          movies: "100",
          updateTime: "2020-08-28  12:24:32",
          upStatus: false,
          association: true
        },
        {
          name: "欧美大片",
          status: "展示中",
          movies: "0",
          updateTime: "2020-08-28  12:24:32",
          upStatus: false,
          association: true
        },
        {
          name: "动漫专场",
          status: "已屏蔽",
          movies: "200",
          updateTime: "2020-08-28  12:24:32",
          upStatus: true,
          association: true
        }
      ],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 20
      },
      isAdd: false,
      isShelf: false,
      isAss: false,
      assData: {}
    };
  },
  watch: {
    "pages.pageSize"(nval, oval) {
      this.pages.pageSize = nval;
    },
    "pages.pageNum"(nval, oval) {
      this.pages.pageNum = nval;
    }
  },
  mounted() {},
  methods: {
    // 新增分类
    handleNewAdd() {
      this.isAdd = true;
    },
    //   上下架
    handleShelf(item) {
      if (item.movies == 0) return;
      this.isShelf = true;
      if (!item.upStatus) {
        this.$confirm(
          `该分类下有 <span style="color: #2EB5F0">${
            item.movies
          }</span> 个影片，确定上架该影片类型吗？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true,
            dangerouslyUseHTMLString: true
          }
        )
          .then(() => {})
          .catch(() => {});
      } else {
        this.$confirm(
          `该分类下有 <span style="color: #2EB5F0">${
            item.movies
          }</span> 个影片，确定下架该影片类型吗？下架后前端用户不可见`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true,
            dangerouslyUseHTMLString: true
          }
        )
          .then(() => {})
          .catch(() => {});
      }
    },
    // 影片关联
    handleRelated(row) {
      this.isAss = true;
      this.assData = row;
      this.getVideoList();
    },
    //获取影片关联列表
    getVideoList() {
      videoList()
        .then(res => {
          //   this.lists = [];
          //   this.loading = false;
          //   this.lists = res.data.list;
          //   this.total = Number(res.data.total);
          //   this.listes = [];
          //   this.listes = JSON.parse(JSON.stringify(this.lists));
        })
        .finally(() => {
          //   this.loading = false;
        });
    },
    //删除
    handleDelete(row) {
      if (row.upStatus && row.association) return;
      this.$confirm(
        "该确认删除该分类吗？删除后该分类下关联的影片将进行释放",
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
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 20px 40px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom_table {
  //   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  margin: 5px 0 20px 0;
}
@import "@/assets/styles/style.scss";
</style>
