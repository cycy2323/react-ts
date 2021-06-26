<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>帖子筛选</h3>
        <div>
          <el-form
            :inline="true"
            :model="userForm"
            class="demo-form-inline searchForm"
            size="small"
          >
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
            <el-form-item label="帖子类型">
              <el-select v-model="userForm.postType" clearable>
                <el-option
                  v-for="item in postTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="帖子状态">
              <el-select v-model="userForm.postStatus" clearable>
                <el-option
                  v-for="item in postStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期">
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
          <h3>帖子列表</h3>
          <el-button type="danger" size="small" @click="handleDelete()"
            >批量删除</el-button
          >
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="dataList"
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="60" />
          <el-table-column label="用户ID" prop="userId" align="center" />
          <el-table-column align="center" label="用户名" prop="username" />
          <el-table-column label="用户昵称" align="center" prop="nickname" />
          <el-table-column
            label="帖子内容"
            align="center"
            min-width="180"
            prop="postText"
          />

          <el-table-column
            label="发布日期"
            prop="postDate"
            align="center"
            min-width="100"
          />
          <el-table-column
            align="center"
            min-width="100"
            fixed="right"
            prop="created_at"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleReview(scope.row)"
                >审核</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="handleView(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </main>
    <div />
    <!-- 详情 -->
    <post-view :show="isView" />
    <!-- 审核 -->
    <post-review :show="isReview" />
  </div>
</template>

<script>
import pagination from "@/components/paginations";
import postView from "./modal/postView";
import postReview from "./modal/postReview";
export default {
  name: "PostReview",
  components: { pagination, postView, postReview },
  data() {
    return {
      loading: false,
      userForm: {
        userId: "",
        username: "",
        nickname: "",
        postType: "",
        postStatus: "",
        startDate: "",
        endDate: ""
      },
      dataList: [
        {
          userId: "453535345366",
          username: "jack_rose",
          nickname: "鸡儿梆硬",
          postText: "基于基于东奔西走士大夫撒旦发生的非朝秦暮楚 df",
          postDate: "2020-12-19  14:20:56"
        }
      ],
      postStatusList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "未通过"
        }
      ],
      postTypeList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "纯文字"
        },
        {
          value: "1",
          label: "纯图片"
        },
        {
          value: "2",
          label: "纯视频"
        },
        {
          value: "3",
          label: "图文结合"
        },
        {
          value: "4",
          label: "文字视频结合"
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
      },
      isView: false,
      isReview: false,
      multipleSelection: []
    };
  },
  mounted() {},
  methods: {
    //   详情
    handleView(item) {
      this.isView = true;
    },
    // 审核
    handleReview(item) {
      this.isReview = true;
    },
    //删除与批量删除
    handleDelete(row) {
      let context = "确认删除该帖子吗？";
      if (this.multipleSelection.length < 1) {
        this.$message(`请勾选多选框进行批量操作`);
      } else {
        this.$confirm(context, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    //批量
    handleSelectionChange(val) {
      if (val.length > 10) {
        this.isTip = true;
        // 截取前10位
        this.multipleSelection = val.slice(0, 10);
        // 截取10位之后的数组  禁止选中
        let tempArr = val.slice(10);
        if (tempArr.length !== 0) {
          tempArr.forEach(ele => {
            this.$refs.multipleTable.toggleRowSelection(ele, false);
          });
        }
      } else {
        //批量勾选
        this.multipleSelection = val;
      }
      let arr = [];
      this.multipleSelection.map(item => {
        return arr.push(item.videoId);
      });
      this.delIds = arr.join(",");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
</style>
