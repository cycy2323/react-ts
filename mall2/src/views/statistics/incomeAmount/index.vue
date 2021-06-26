<template>
  <div class="s-user">
    <!-- 付费用户数据-->
    <div class="base">
      <div class="title">付费用户数据</div>
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

    <div style="margin-top:15px"></div>

    <div class="base container">
      <div class="trend">
        <div class="title-box">
          <div class="title">时段收入</div>
          <div class="e_form">
            <el-date-picker
              size="small"
              v-model="playDateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div style="margin-top: 20px"></div>
        <div class="line_chart">
          <other-chart height="450px" width="100%" chart-data="" />
        </div>
        <div class="e_table">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            max-height="500"
          :header-cell-style="{ background: 'rgba(6, 209, 204,.7)' }"
            border
            fit
            size="small"
            show-overflow-tooltip
            tooltip-effect="dark"
            stripe
          >
            <el-table-column prop="day" width="150" align="center">
            </el-table-column>
            <el-table-column
              property="date"
              label="日期"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="date"
              label="日期"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column property="address" label="地址" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin-top:50px"></div>
      <div class="trend">
        <div class="title-box">
          <div class="title">每日收入趋势</div>
          <div class="e_form">
            <el-date-picker
              size="small"
              v-model="incomeDateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
            />
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div style="margin-top: 20px"></div>
        <div class="line_chart">
          <other-chart height="450px" width="100%" chart-data="" />
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js";
import helper from "@/utils/helper.js";
import OtherChart from "@/components/vueEcharts/OtherChart";
export default {
  name: "IncomeAmount",
  components: { OtherChart },
  data() {
    return {
      form: {
        platform: "0",
        channleId: "0"
      },
      channelOptions: [{ key: "0", value: "全部渠道" }],
      platformOptions: [{ key: "0", value: "全部终端" }],
      baseList: [
        {
          title: "总收入金额",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "昨日收入金额",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "今日收入金额",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },

        {
          title: "上月收入金额",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "本月收入金额",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        }
      ],

      playDateTime: [],
      incomeDateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [
        {
          day: "今日",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          day: "昨日",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
    };
  },
  mounted() {},
  methods: {
    // 切换btns
    handleBtns(it) {
      this.idx = it.value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/statistics.scss";
</style>
