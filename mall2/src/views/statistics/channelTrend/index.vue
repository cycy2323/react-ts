<template>
  <div class="s-user">
    <div class="base">
      <!-- 时段折线图 -->
      <div class="p_chart">
        <div class="btns">
          <div
            v-for="item in trendList"
            :key="item.value"
            :class="[idx === item.value ? 'btn-active' : 'btn-txt']"
            @click="handleBtns(item)"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="search">
          <el-date-picker
            v-model="trendDateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="handleTrendDateChange"
          />
          <div style="margin: 0 15px;"></div>
          <el-button type="primary" @click="handleTrendSearch">查询</el-button>
        </div>
        <div class="p_line">
          <line-chart
            height="450px"
            width="100%"
            :chart-data="videoChartData"
          />
        </div>
        <div class="base-content">
          <div class="title-box">
            <div class="title">播放次数统计</div>
          </div>
          <el-row :gutter="32">
            <el-col>
              <el-table
                ref="multipleTable"
                max-height="490"
                style="width: 97%; margin: 0 1.5%"
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
              <!--分页组件-->
              <pagination :pages="pages" />
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
import lineChart from "@/components/vueEcharts/Linechart";
import { parseTime } from "@/utils/index.js";
import helper from "@/utils/helper.js";
import pagination from "@/components/paginations";
export default {
  name: "ChannelTrend",
  components: {
    lineChart,
    pagination
  },
  data() {
    return {
      trendList: [
        { name: "日留存率", value: "1" },
        { name: "周留存率", value: "2" },
        { name: "月留存率", value: "3" }
      ],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      idx: "1",
      keepIdx: "1",
      trendDateTime: [],
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
  mounted() {},
  methods: {
    // 切换btns
    handleBtns(it) {
      this.idx = it.value;
    },

    // 日期查询
    handleTrendSearch() {
      if (
        this.trendDateTime.length < 0 &&
        this.trendDateTime[this.idx].length < 0
      )
        return;
      let params = {
        startTime: parseTime(this.trendDateTime[this.idx][0], "{y}-{m}-{d}"),
        endTime: parseTime(this.trendDateTime[this.idx][1], "{y}-{m}-{d}"),
        channelType: 0,
        userType: Number(this.idx)
      };
      this.fetchGetTrend(params);
    },
    // 清除时间
    handleTrendDateChange(val) {
      if (val === null) {
        let params = {
          startTime: "",
          endTime: ""
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss'

</style>
