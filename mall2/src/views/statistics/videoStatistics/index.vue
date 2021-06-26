<template>
  <div class="s-user">
    <!-- 视频数据总览-->
    <div class="base">
      <h3 class="title">播放数据概览</h3>
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

    <div style="margin-top: 20px"></div>

    <div class="base">
      <!-- 时段折线图 -->
      <div class="p_chart">
        <div class="btns">
          <div
            v-for="item in playList"
            :key="item.value"
            :class="[idx === item.value ? 'btn-active' : 'btn-txt']"
            @click="handleBtns(item)"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="p_line">
          <other-chart
            height="450px"
            width="100%"
            :chart-data="videoChartData"
          />
        </div>
      </div>
      <div style="margin-top:50px"></div>
      <!-- 播放次数统计 -->
      <div class="trend">
        <div class="base-content">
          <div class="title-box">
            <h3 class="title">播放次数统计</h3>
          </div>
          <el-row :gutter="32">
            <el-col>
              <el-table
                ref="multipleTable"
                :data="remainList"
                max-height="490"
                :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
                border
                fit
                size="small"
              >
                <el-table-column align="center" label="日期" prop="countDate" />
                <el-table-column align="center" label="新增用户">
                  <el-table-column align="center" label="全部" prop="newUser" />
                  <el-table-column
                    align="center"
                    label="苹果"
                    prop="newUserIOS"
                  />
                  <el-table-column
                    align="center"
                    label="安卓"
                    prop="newUserAZ"
                  />
                </el-table-column>
                <el-table-column align="center" label="次日留存率">
                  <el-table-column align="center" label="全部" prop="nextDay" />
                  <el-table-column
                    align="center"
                    label="苹果"
                    prop="nextDayIOS"
                  />
                  <el-table-column
                    align="center"
                    label="安卓"
                    prop="nextDayAZ"
                  />
                </el-table-column>
                <el-table-column align="center" label="7日留存率">
                  <el-table-column
                    align="center"
                    label="全部"
                    prop="sevenCount"
                  />
                  <el-table-column
                    align="center"
                    label="苹果"
                    prop="sevenCountIOS"
                  />
                  <el-table-column
                    align="center"
                    label="安卓"
                    prop="sevenCountAZ"
                  />
                </el-table-column>
                <el-table-column align="center" label="30日留存率">
                  <el-table-column
                    align="center"
                    label="全部"
                    prop="thirtyCount"
                  />
                  <el-table-column
                    align="center"
                    label="苹果"
                    prop="thirtyCountIOS"
                  />
                  <el-table-column
                    align="center"
                    label="安卓"
                    prop="thirtyCountAZ"
                  />
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
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
import OtherChart from "@/components/vueEcharts/OtherChart";
import { parseTime } from "@/utils/index.js";
import helper from "@/utils/helper.js";
export default {
  name: "VideoStatistics",
  components: {
    OtherChart
  },
  data() {
    return {
      playList: [
        { name: "时段播放url请求量", value: "1" },
        { name: "时段影片播放次数", value: "2" },
        { name: "时段短视频播放次数", value: "3" }
      ],

      baseList: [
        {
          title: "上月用户在APP的平均停留时长",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "本月用户在APP的平均停留时长",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "上月用户平均观影时长",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },

        {
          title: "本月用户平均观影时长",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "昨日影片观影量",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "今日影片观影量",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "昨日短视频观影量",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "今日短视频观影量",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "昨日播放url请求失败率",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        },
        {
          title: "今日播放url请求失败率",
          userNums: "",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "",
          android: "安卓",
          androidNums: ""
        }
      ],
      idx: "1",
      keepIdx: "1",
      playDateTime: [],
      priseDateTime: [],
      userDateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      videoChartData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      praiseWeekData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      uploadWeekData: {
        expectedData: [],
        dateData: [],
        actualData: []
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
@import "@/styles/statistics.scss";
</style>
