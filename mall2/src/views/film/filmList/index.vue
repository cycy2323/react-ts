<template>
  <div class="container">
    <main class="main">
      <div class="film_search">
        <h3>视频筛选</h3>
        <div>
          <el-form
            :inline="true"
            :model="filmForm"
            class="demo-form-inline searchForm"
          >
            <el-form-item label="影片ID">
              <el-input v-model="filmForm.filmId" placeholder="请输入影片ID" />
            </el-form-item>
            <el-form-item label="影片名称">
              <el-input
                v-model="filmForm.filmName"
                type="text"
                placeholder="请输入影片名称"
              />
            </el-form-item>
            <el-form-item label="影片分类">
              <el-select v-model="filmForm.filmGategory">
                <el-option
                  v-for="item in filmTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="转码">
              <el-select
                v-model="filmForm.standard"
                placeholder="请选择是否转码"
              >
                <el-option
                  v-for="item in filmOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
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
          <h3>数据列表</h3>
          <div class="bar_right">
            <span class="transcode">正在转码中</span>
            <el-button
              type="primary"
              icon="el-icon-camera-solid"
              size="small"
              @click="handleClickTrans"
              >转码</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-upload"
              size="small"
              @click="handleUpload"
              >上传</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="handleDelete(false)"
              >批量删除</el-button
            >
          </div>
        </div>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="filmList"
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
          <el-table-column label="影片ID" prop="videoId" align="center" />
          <el-table-column min-width="110" align="center" label="影片">
            <template slot-scope="scope">
              <el-image
                class="tb_image"
                :src="scope.row.videoImg"
                fit="cover"
                @click="checkplayFilm(scope.row.videoIdcUrl)"
              >
                <div slot="placeholder" class="tb_image_pl">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="tb_image_pl">
                  <img
                    class="tb_img"
                    src="@/assets/images/d_avatar@2x.png"
                    alt="图片加载失败"
                  />
                </div>
              </el-image>
              <div
                class="play_icon"
                @click="checkplayFilm(scope.row.videoIdcUrl)"
              >
                <i class="el-icon-video-play" style="font-size:30px"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="片名" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <a
                class="v_name"
                size="mini"
                type="text"
                @click="checkplayFilms(scope.row)"
                >{{ scope.row.videoTitle }}</a
              >
            </template>
          </el-table-column>
          <el-table-column
            label="分类"
            show-overflow-tooltip
            prop=""
            align="center"
          />
          <el-table-column label="时长" align="center"> </el-table-column>
          <el-table-column label="上传日期" align="center"> </el-table-column>

          <el-table-column label="收藏数" prop="" align="center" />
          <el-table-column label="评论数" prop="" align="center" />
          <el-table-column label="播放数" prop="" align="center" />
          <el-table-column label="格式" prop="" align="center" />
          <el-table-column label="清晰度" prop="" align="center" />
          <el-table-column label="是否转码" align="center">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.standard == 0
                    ? "否"
                    : scope.row.standard == 1
                    ? "是"
                    : ""
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="" align="center" />
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
                type="danger"
                @click="handleDelete(true, scope.row)"
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
    <!-- 查看视频 -->
    <play-film :show="isPlay" :url="filmUrl"></play-film>
    <!-- 转码 -->
    <transcode :show="isTrans"></transcode>
    <!-- 上传 -->
    <upload :show="isUpload"></upload>
  </div>
</template>

<script>
import filmData from "./data.json";
import pagination from "@/components/paginations";
import playFilm from "./modal/playFilm";
import transcode from "./modal/transcode";
import upload from "./modal/upload";
export default {
  name: "FileList",
  components: { pagination, playFilm, transcode, upload },
  data() {
    return {
      loading: false,
      filmForm: {
        filmId: "",
        filmGategory: "",
        standard: "",
        startDate: "",
        endDate: "",
        filmName: "",
        filmStatus: ""
      },
      filmTypeList: [{ key: "0", value: "全部" }],
      filmOptions: [
        { key: "-1", value: "全部" },
        { key: "1", value: "是" },
        { key: "0", value: "否" }
      ],
      uploadDate: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      filmList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isPlay: false,
      filmUrl: "",
      multipleSelection: [],
      delIds: [],
      isTrans: false,
      isUpload: false
    };
  },
  mounted() {
    this.fetchFilmData();
  },
  methods: {
    //获取影片数据
    fetchFilmData() {
      let { pageNum, pageSize, total, list } = filmData.data;
      this.pages = {
        pageNum: pageNum,
        pageSize: pageSize,
        total: Number(total)
      };
      this.filmList = list;
    },
    // 查看视频
    checkplayFilm(item) {
      this.isPlay = true;
      this.filmUrl = item;
    },
    //转码
    handleClickTrans() {
      this.isTrans = true;
    },
    // 上传
    handleUpload() {
      this.isUpload = true;
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
    },
    //删除与批量删除
    handleDelete(bol, row) {
      if (bol) {
        this.$confirm(
          "该确认删除该影片吗？删除后该影片将从前端下架，用户不可见",
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
        if (this.multipleSelection.length < 1) {
          this.$message(`请勾选多选框进行批量操作`);
        } else {
          this.$confirm("是否确定批量删除视频？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          })
            .then(() => {})
            .catch(() => {});
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
</style>
