<template>
  <div class="s-user">
    <!-- 基础数据概览-->
    <div class="base">
      <div class="title">基础数据概览</div>
      <div class="base-content">
        <el-row :gutter="32">
          <div v-for="(item, idx) in baseList" :key="idx">
            <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
              <el-card class="box-card" shadow="hover">
                <div>{{ item.title }}</div>
                <h4>{{ item.userNums }}</h4>
              </el-card>
              <div v-show="item.iosImg" class="des">
                <img class="des-img" :src="item.iosImg" alt />
                <p class="text_right">{{ item.ios }}</p>
                <p>{{ item.iosNums }}</p>
              </div>
              <div v-show="item.androidImg" class="des">
                <img class="des-img" :src="item.androidImg" alt />
                <p class="text_right">{{ item.android }}</p>
                <p>{{ item.androidNums }}</p>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
    <div style="margin-top: 15px"></div>

    <div class="base">
      <div class="title">渠道筛选</div>
      <div class="base-content">
        <el-row :gutter="32">
          <el-form
            class="demo-form-inline search_class"
            label-width="80px"
            :inline="true"
            :model="form"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="渠道名称">
                  <el-select v-model="form.channelId">
                    <el-option
                      v-for="item in channelOptions"
                      :key="item.id"
                      :label="item.channelName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="9">
                <el-form-item label="日期选择">
                  <el-date-picker
                    size="mini"
                    v-model="playDateTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div>
                  <el-button type="primary" size="small" @click="handleSearch"
                    >查询</el-button
                  >
                  <el-button size="small" type="success" @click="handleRest"
                    >重置</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </div>

    <div style="margin-top:15px"></div>

    <div class="base">
      <!-- 渠道基础数据 -->
      <div class="trend">
        <div class="title-box">
          <div class="title">渠道基础数据</div>
          <div class="bar_right" style="position: relative;right: 0px">
            <el-button
              :icon="'el-icon-document'"
              type="primary"
              :loading="downloadLoging"
              size="small"
              @click="handleDownload('channel')"
              >导出Excel</el-button
            >
          </div>
        </div>
        <div style="margin-top: 20px"></div>
        <el-table
          ref="multipleTable"
          max-height="500"
         :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
          border
          fit
          size="small"
        >
          <el-table-column align="center" label="渠道ID" prop="channelId" />
          <el-table-column align="center" label="渠道名称" prop="channelName" />
          <!-- <el-table-column
          align="center"
          label="下载量(总)"
          prop="dowloadCount"
        />
        <el-table-column
          align="center"
          label="安装量(总)"
          prop="installCount"
        /> -->
          <el-table-column
            align="center"
            label="注册量(总)"
            prop="registerCount"
          />
          <el-table-column
            align="center"
            label="当日新增用户"
            prop="newCount"
          />
          <el-table-column
            align="center"
            label="当日活跃用户"
            prop="activeCount"
          />
          <el-table-column align="center" label="第一次启动次数" prop="first" />
          <el-table-column
            align="center"
            label="启动次数（总）"
            prop="startCount"
          />
          <el-table-column
            align="center"
            label="单次使用时长(平均)"
            width="180"
            prop="useTime"
          />
          <el-table-column
            align="center"
            fixed="right"
            width="180"
            prop="created_at"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination :pages="pages" />
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   getVideoStatistics,
//   getPlayStatistics,
//   getPraiseStatistics,
//   getUploadStatistics,
// } from "@/api/statistics";
import { parseTime } from "@/utils/index.js";
import helper from "@/utils/helper.js";
import pagination from "@/components/paginations";
export default {
  name: "ChannelUser",
  components: {
    pagination
  },
  data() {
    return {
      form: {
        id: "",
        channelId: "0",
        stateDate: "",
        endDate: ""
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      channelOptions: [{ id: "0", channelName: "全部" }],
      baseList: [
        {
          title: "渠道总用户",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "渠道总注册用户",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "渠道昨日新增用户",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },

        {
          title: "渠道今日新增用户",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "渠道当前在线用户",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        }
      ],
      downloadLoging: false,
      idx: "1",
      keepIdx: "1",
      playDateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  mounted() {
    // Promise.all[
    //   (this.fetchGetData(),
    //   this.fetchGetPlay(),
    //   this.fetchGetPraiseStatistics(),
    //   this.fetchGetUploadStatistics())
    // ];
  },
  methods: {
    fetchGetData() {
      getVideoStatistics().then(res => {
        if (res.code === 200 && res.data !== null) {
          const { videoStatisticsVo } = res.data;
          this.baseList[0].userNums = helper.formatSeconds(
            videoStatisticsVo.beforeRemainTime
          );
          this.baseList[0].iosNums = helper.formatSeconds(
            videoStatisticsVo.iosBeforeRemainTime
          );
          this.baseList[0].androidNums = helper.formatSeconds(
            videoStatisticsVo.azBeforeRemainTime
          );

          this.baseList[1].userNums = helper.formatSeconds(
            videoStatisticsVo.beforeAverageTime
          );
          this.baseList[1].iosNums = helper.formatSeconds(
            videoStatisticsVo.iosBeforeAverageTime
          );
          this.baseList[1].androidNums = helper.formatSeconds(
            videoStatisticsVo.azBeforeAverageTime
          );

          this.baseList[2].userNums = helper.formatSeconds(
            videoStatisticsVo.monthRemainTime
          );
          this.baseList[2].iosNums = helper.formatSeconds(
            videoStatisticsVo.iosMonthRemainTime
          );
          this.baseList[2].androidNums = helper.formatSeconds(
            videoStatisticsVo.azMonthRemainTime
          );

          this.baseList[3].userNums = helper.formatSeconds(
            videoStatisticsVo.monthAverageTime
          );
          this.baseList[3].iosNums = helper.formatSeconds(
            videoStatisticsVo.iosMonthAverageTime
          );
          this.baseList[3].androidNums = helper.formatSeconds(
            videoStatisticsVo.azMonthAverageTime
          );

          this.baseList[4].userNums = videoStatisticsVo.yesterdayTotal;
          this.baseList[4].iosNums = videoStatisticsVo.iosYesterdayTotal;
          this.baseList[4].androidNums = videoStatisticsVo.azYesterdayTotal;

          this.baseList[5].userNums = videoStatisticsVo.todayTotal;
          this.baseList[5].iosNums = videoStatisticsVo.iosTodayTotal;
          this.baseList[5].androidNums = videoStatisticsVo.azTodayTotal;

          this.baseList[6].userNums = videoStatisticsVo.backTotal;

          this.baseList[7].userNums = videoStatisticsVo.appTotal;
        }
      });
    },

    //查询
    handleSearch() {
      if (this.playDateTime.length > 0) {
        this.form.stateDate = parseTime(
          this.playDateTime[0].getTime(),
          "{y}-{m}-{d}"
        );
        this.form.endDate = parseTime(
          this.playDateTime[1].getTime(),
          "{y}-{m}-{d}"
        );
      }
      let params = { ...this.form };
    },
    //重置
    handleRest() {
      this.form = {
        id: "",
        channelId: "",
        channeld: "",
        stateDate: "",
        endDate: ""
      };
      this.playDateTime = [];
    },
    // 切换btns
    handleBtns(it) {
      this.idx = it.value;
    },

    //播放统计查询
    handlePlaySearch() {
      if (this.playDateTime.length <= 0) return;
      let params = {
        startTime: parseTime(this.playDateTime[0], "{y}-{m}-{d}"),
        endTime: parseTime(this.playDateTime[1], "{y}-{m}-{d}")
      };
      this.fetchGetPlay(params);
    },
    // 收藏统计查询
    handlePriseSearch() {
      if (this.priseDateTime.length <= 0) return;
      let params = {
        startTime: parseTime(this.priseDateTime[0], "{y}-{m}-{d}"),
        endTime: parseTime(this.priseDateTime[1], "{y}-{m}-{d}")
      };
      this.fetchGetPraiseStatistics(params);
    },
    //用户上传统计查询
    handleUserSearch() {
      if (this.userDateTime.length <= 0) return;
      let params = {
        startTime: parseTime(this.userDateTime[0], "{y}-{m}-{d}"),
        endTime: parseTime(this.userDateTime[1], "{y}-{m}-{d}")
      };
      this.fetchGetUploadStatistics(params);
    },
    // 清除时间
    handlePlayDateChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
        this.fetchGetPlay(params);
      }
    },
    handlePriseDateChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
        this.fetchGetPraiseStatistics(params);
      }
    },
    handleUpdateDateChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
        this.fetchGetUploadStatistics(params);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss'

</style>
