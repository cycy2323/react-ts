<template>
  <div class="s-user">
    <!-- 基础数据概览 -->
    <div class="base">
      <div class="title">基础数据概览</div>
      <div class="base-content">
        <el-row :gutter="32">
          <div v-for="(item, idx) in baseList" :key="idx">
            <el-col :xs="12" :sm="8" :md="6" :lg="4">
              <el-card class="box-card" shadow="hover">
                <div>{{ item.title }}</div>
                <h4>{{ item.userNums }}</h4>
              </el-card>
              <div class="des">
                <img class="des-img" :src="item.iosImg" alt />
                <p class="text_right">{{ item.ios }}</p>
                <p>{{ item.iosNums }}</p>
              </div>
              <div class="des">
                <img class="des-img" :src="item.androidImg" alt />
                <p class="text_right">{{ item.android }}</p>
                <p>{{ item.androidNums }}</p>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
    <div style="margin-top: 20px" />

    <div class="base">
      <!-- 整体趋势 -->
      <div class="trend">
        <div class="title">整体趋势</div>
        <div class="base-content">
          <el-row :gutter="32">
            <el-col :sm="24" :md="16">
              <div class="btns">
                <div
                  v-for="item in trendList"
                  :key="item.value"
                  :class="[idx === item.value ? 'btn-active' : 'btn-txt']"
                  @click="handleTrendBtns(item)"
                >
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="right-date"
                v-for="(item, index) in trendList"
                :key="index"
              >
                <el-date-picker
                  v-if="item.value === idx"
                  v-model="trendDateTime[idx]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @change="handleDateChange"
                />
              </div>
            </el-col>
            <el-col :sm="12" :md="2">
              <el-button type="primary" @click="handleTrendSearch"
                >查询</el-button
              >
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col>
              <div v-if="idx === '0'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="newCountUserData"
                />
              </div>
              <div v-if="idx === '1'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="activeCountUserData"
                />
              </div>
              <div v-if="idx === '2'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="startCountData"
                />
              </div>
              <div v-if="idx === '3'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="keepCountData"
                />
              </div>
              <div v-if="idx === '4'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="startNumsData"
                />
              </div>
              <div v-if="idx === '5'" class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="toatalUsersData"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 20px" />

      <!-- 在线用户趋势 -->
      <div class="trend">
        <div class="title">在线用户趋势</div>
        <div class="base-content">
          <el-row :gutter="16">
            <el-col :sm="12" :md="6" :push="16">
              <div class="right-date">
                <el-date-picker
                  v-model="onlineDateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @change="handleOnlineChange"
                />
              </div>
            </el-col>

            <el-col :sm="12" :md="2" :push="16">
              <el-button type="primary" @click="handleOnlineSearch"
                >查询</el-button
              >
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col>
              <div class="line_chart">
                <line-chart
                  height="450px"
                  width="100%"
                  :chart-data="onlineStatisticsData"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 20px" />

      <!-- TOP -->
      <div class="top">
        <el-row>
          <el-col :md="24" :lg="11" :offset="-1">
            <div class="top">
              <el-row :gutter="16">
                <el-col :span="12">
                  <div class="title subtitle">TOP版本</div>
                </el-col>
                <el-col :span="12">
                  <div class="btns">
                    <div
                      v-for="item in versionList"
                      :key="item.value"
                      :class="[
                        versionIdx === item.value ? 'btn-active' : 'btn-txt'
                      ]"
                      @click="handleTopVersionBtns(item)"
                      class="btn-txt"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="16">
                <el-col :span="24">
                  <div class="btns plantform">
                    <div
                      v-for="item in plantform"
                      :key="item.value"
                      :class="[
                        plantformIdx === item.value ? 'btn-active' : 'btn-txt'
                      ]"
                      @click="handlePlantformBtns(item)"
                      class="btn-txt"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="16">
                <el-col :span="24">
                  <div class="line_chart">
                    <Barchart
                      height="500px"
                      width="100%"
                      :chart-data="annularWeekData"
                      v-if="annularWeekData.countList.length > 0"
                    />
                    <div v-else class="no_data">暂无数据</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :md="24" :lg="11" :offset="1">
            <el-row :gutter="16">
              <el-col :span="12">
                <div class="title subtitle">TOP渠道</div>
              </el-col>
              <el-col :span="12">
                <div class="top-text">
                  <div
                    v-for="item in topChannelList"
                    :key="item.value"
                    :class="[
                      channelIdx === item.value ? 'btn-active' : 'btn-txt'
                    ]"
                    @click="handleTopChannelBtns(item)"
                    class="btn-txt"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="24">
                <div class="btns plantform"></div>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="24">
                <div class="line_chart">
                  <Barchart
                    height="500px"
                    width="100%"
                    :chart-data="channelWeekData"
                    v-if="channelWeekData.countList.length > 0"
                  />
                  <div v-else class="no_data">暂无数据</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserStatistics,
  getChannelDetail,
  getDiscountStatistics,
  getAnnularStatistics,
  getChannelList,
  onlineStatistics
} from "@/api/statistics_api";
import { parseTime } from "@/utils/index.js";
import LineChart from "@/components/vueEcharts/Linechart";
import Barchart from "@/components/vueEcharts/Barchart";
export default {
  name: "UserStatistics",
  components: {
    LineChart,
    Barchart
  },
  data() {
    return {
      trendList: [
        { name: "新增用户", value: "0" },
        { name: "活跃用户", value: "1" },
        { name: "启动次数", value: "2" },
        // { name: "留存用户", value: "3" },
        // { name: "平均启动次数", value: "4" },
        { name: "总用户", value: "5" }
      ],
      versionList: [
        { name: "新增用户", value: "0" },
        { name: "活跃用户", value: "1" },
        { name: "总用户", value: "2" }
      ],
      topChannelList: [
        // { name: "下载量", value: "0" },
        // { name: "安装量", value: "1" },
        { name: "注册量", value: "2" }
      ],
      plantform: [{ name: "iOS", value: "0" }, { name: "安卓", value: "1" }],
      baseList: [
        {
          title: "总用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "总注册用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "今日新增用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "今日活跃用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "昨日新增用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "昨日活跃用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "当前在线用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        }
      ],
      idx: "0",
      versionIdx: "0",
      channelIdx: "2",
      trendDateTime: [],
      keepDateTime: [],
      onlineDateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      newCountUserData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      activeCountUserData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      startCountData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      keepCountData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      startNumsData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      toatalUsersData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      onlineStatisticsData: {
        expectedData: [],
        dateData: [],
        actualData: []
      },
      dataParams: {
        startTime: "",
        endTime: "",
        channelType: 0,
        userType: 0
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      channelList: [],
      annularWeekData: {
        dateList: [],
        name: "",
        countList: []
      },
      channelWeekData: {
        dateList: [],
        name: "",
        countList: []
      },
      plantformIdx: "0"
    };
  },
  mounted() {
    Promise.all[
      (this.fetchGetData(),
      this.fetchGetTrend(),
      this.fetchAnnularData(),
      this.getOnlineStatistics())
    ];
  },
  methods: {
    // 基础数据概览
    fetchGetData() {
      getUserStatistics().then(res => {
        if (res.code === 200 && res.data !== null) {
          const { appUserStatisticsVo } = res.data;
          this.baseList[0].userNums = appUserStatisticsVo.sumUser;
          this.baseList[0].iosNums = appUserStatisticsVo.iosSumUser;
          this.baseList[0].androidNums = appUserStatisticsVo.azSumUser;

          this.baseList[1].userNums = appUserStatisticsVo.registerUser;
          this.baseList[1].iosNums = appUserStatisticsVo.iosRegisterUser;
          this.baseList[1].androidNums = appUserStatisticsVo.azRegisterUser;

          this.baseList[2].userNums = appUserStatisticsVo.todayNewUser;
          this.baseList[2].iosNums = appUserStatisticsVo.iosTodayNewUser;
          this.baseList[2].androidNums = appUserStatisticsVo.azTodayNewUser;

          this.baseList[3].userNums = appUserStatisticsVo.todayActiveUser;
          this.baseList[3].iosNums = appUserStatisticsVo.iosTodayActiveUser;
          this.baseList[3].androidNums = appUserStatisticsVo.azTodayActiveUser;

          this.baseList[4].userNums = appUserStatisticsVo.yesterdayNewUser;
          this.baseList[4].iosNums = appUserStatisticsVo.iosYesterdayNewUser;
          this.baseList[4].androidNums = appUserStatisticsVo.azYesterdayNewUser;

          this.baseList[5].userNums = appUserStatisticsVo.yesterdayActiveUser;
          this.baseList[5].iosNums = appUserStatisticsVo.iosYesterdayActiveUser;
          this.baseList[5].androidNums =
            appUserStatisticsVo.azYesterdayActiveUser;

          this.baseList[6].userNums = appUserStatisticsVo.onlineCount;
          this.baseList[6].iosNums = appUserStatisticsVo.iosonlineCount;
          this.baseList[6].androidNums = appUserStatisticsVo.azOnlineCount;
        }
      });
    },

    // 整体趋势
    fetchGetTrend(data) {
      let params = {
        startTime: "",
        endTime: "",
        channelType: 0,
        userType: 0
      };
      params = Object.assign(params, data);
      getDiscountStatistics(params).then(res => {
        if (res.code === 200 && res.data !== null) {
          const { azUserWeekInfoList, userWeekInfoList } = res.data;
          // 新增用户
          this.newCountUserData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.newCountUserData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.newCountUserData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });

          // 活跃用户 activeCountUserData
          this.activeCountUserData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.activeCountUserData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.activeCountUserData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });

          // 启动次数 startCountData
          this.startCountData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.startCountData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.startCountData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });

          // 留存用户 keepCountData
          this.keepCountData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.keepCountData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.keepCountData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });

          //平均启动次数 startNumsData
          this.startNumsData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.startNumsData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.startNumsData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });

          // 总用户 toatalUsersData
          this.toatalUsersData.expectedData = userWeekInfoList.map(item => {
            return item.count;
          });
          this.toatalUsersData.dateData = userWeekInfoList.map(item => {
            return item.createTime;
          });
          this.toatalUsersData.actualData = azUserWeekInfoList.map(item => {
            return item.count;
          });
        }
      });
    },

    // 用户在线统计
    getOnlineStatistics(data) {
      let params = {
        startTime: "",
        endTime: ""
      };
      params = Object.assign({}, params, data);
      onlineStatistics({ ...params })
        .then(res => {
          if (Number(res.code) === 200) {
            const { azUserWeekInfoList, userWeekInfoList } = res.data;
            // 在线用户
            this.onlineStatisticsData.expectedData = userWeekInfoList.map(
              item => {
                return item.count;
              }
            );
            this.onlineStatisticsData.dateData = userWeekInfoList.map(item => {
              return item.createTime;
            });
            this.onlineStatisticsData.actualData = azUserWeekInfoList.map(
              item => {
                return item.count;
              }
            );
          }
        })
        .catch(() => {});
    },

    // top统计
    fetchAnnularData(data) {
      let params = {
        channelType: 0,
        userType: 0,
        originType: 0
      };
      params = Object.assign(params, data);
      getAnnularStatistics(params).then(res => {
        if (res.code === 200 && res.data !== null) {
          const { annularWeek, channelWeek } = res.data;
          this.annularWeekData.countList = annularWeek.map(item => {
            return { value: item.count, name: "版本" + item.version };
          });
          this.versionList.filter(it => {
            it.value == this.versionIdx &&
              (this.annularWeekData.name = it.name);
          });
          this.annularWeekData.dateList = annularWeek.map(item => {
            return "版本" + item.version;
          });
          this.channelWeekData.countList = channelWeek.map(item => {
            return { value: item.count, name: item.channelName };
          });
          this.topChannelList.filter(it => {
            it.value == this.channelIdx &&
              (this.channelWeekData.name = it.name);
          });
          this.channelWeekData.dateList = channelWeek.map(item => {
            return item.channelName;
          });
        }
      });
    },

    // 整体趋势时间查询
    handleTrendSearch() {
      let params = {};
      if (
        this.trendDateTime.length <= 0 ||
        this.trendDateTime[this.idx].length <= 0
      ) {
        params = {
          startTime: "",
          endTime: "",
          channelType: 0,
          userType: Number(this.idx)
        };
      } else {
        params = {
          startTime: parseTime(this.trendDateTime[this.idx][0], "{y}-{m}-{d}"),
          endTime: parseTime(this.trendDateTime[this.idx][1], "{y}-{m}-{d}"),
          channelType: 0,
          userType: Number(this.idx)
        };
      }
      this.fetchGetTrend(params);
    },
    //   整体趋势
    handleTrendBtns(item) {
      this.idx = item.value;
      this.trendDateTime = [];
      if (
        this.trendDateTime.length > 0 &&
        this.trendDateTime[this.idx].length > 0
      ) {
        this.dataParams.startTime = parseTime(
          this.trendDateTime[this.idx][0],
          "{y}-{m}-{d}"
        );
        this.dataParams.endTime = parseTime(
          this.trendDateTime[this.idx][1],
          "{y}-{m}-{d}"
        );
      } else {
        this.dataParams.startTime = "";
        this.dataParams.endTime = "";
      }
      switch (item.value) {
        case "0":
          this.dataParams.userType = 0;

          this.fetchGetTrend(this.dataParams);
          break;
        case "1":
          this.dataParams.userType = 1;

          this.fetchGetTrend(this.dataParams);
          break;
        case "2":
          this.dataParams.userType = 3;
          this.fetchGetTrend(this.dataParams);
          break;
        case "3":
          this.dataParams.userType = 4;
          this.fetchGetTrend(this.dataParams);
          break;
        case "4":
          this.dataParams.userType = 5;
          this.fetchGetTrend(this.dataParams);
          break;
        case "5":
          this.dataParams.userType = 2;
          this.fetchGetTrend(this.dataParams);
          break;

        default:
          break;
      }
    },
    // top version 切换
    handleTopVersionBtns(item) {
      this.versionIdx = item.value;
      let params = {
        userType: this.versionIdx,
        channelType: 0,
        originType: 0
      };
      params.originType = 0;
      switch (item.value) {
        case "0":
          this.fetchAnnularData(params);
          break;
        case "1":
          this.fetchAnnularData(params);
          break;
        case "2":
          this.fetchAnnularData(params);
          break;

        default:
          break;
      }
    },
    // 系统切换、ios与安卓
    handlePlantformBtns(item) {
      this.plantformIdx = item.value;
      let params = {
        userType: this.versionIdx,
        channelType: 0,
        originType: this.plantformIdx
      };
      switch (item.value) {
        case "0":
          params.originType = item.value;
          this.fetchAnnularData(params);
          break;
        case "1":
          params.originType = item.value;
          this.fetchAnnularData(params);
          break;
        default:
          break;
      }
    },
    // top channel 切换
    handleTopChannelBtns(item) {
      // this.channelIdx = item.value;
      this.channelIdx = "2";
      this.plantformIdx = "0";
      this.versionIdx = "0";
      let params = {
        userType: 0,
        channelType: this.channelIdx,
        originType: 0
      };
      switch (item.value) {
        case "0":
          this.fetchAnnularData(params);
          break;
        case "1":
          this.fetchAnnularData(params);
          break;
        case "2":
          this.fetchAnnularData(params);
          break;

        default:
          break;
      }
    },
    // 用户在线查询
    handleOnlineSearch() {
      let params = {};
      if (this.onlineDateTime.length <= 0) {
        params = {
          startTime: "",
          endTime: ""
        };
      } else {
        params = {
          startTime: parseTime(this.onlineDateTime[0], "{y}-{m}-{d}"),
          endTime: parseTime(this.onlineDateTime[1], "{y}-{m}-{d}")
        };
      }
      this.getOnlineStatistics(params);
    },
    // 清除时间
    handleDateChange(val) {
      if (val === null) {
        this.dataParams.startTime = "";
        this.dataParams.endTime = "";
        this.fetchGetTrend(this.dataParams);
      }
    },
    handleOnlineChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
        this.getOnlineStatistics(params);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
