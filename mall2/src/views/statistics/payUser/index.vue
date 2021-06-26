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

    <div class="base">
      <!-- 渠道基础数据 -->
      <div class="trend">
        <div class="title-box">
          <div class="btns">
            <div
              v-for="item in payBtnsList"
              :key="item.value"
              :class="[idx === item.value ? 'btn-active' : 'btn-txt']"
              @click="handleBtns(item)"
            >
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="e_form">
            <el-form
              class="demo-form-inline search_class"
              label-width="80px"
              :inline="true"
              :model="form"
            >
              <el-form-item label="">
                <el-select v-model="form.platform">
                  <el-option
                    v-for="item in platformOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-select v-model="form.channleId">
                  <el-option
                    v-for="item in channelOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-form>
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
  name: "PayUser",
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
          title: "总付费用户数",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "昨日付费用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "昨日首次付费用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },

        {
          title: "今日付费用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        },
        {
          title: "今日首次付费用户",
          userNums: "0",
          iosImg: require("@/assets/images/ios.png"),
          androidImg: require("@/assets/images/android.png"),
          ios: "苹果",
          iosNums: "0",
          android: "安卓",
          androidNums: "0"
        }
      ],
      payBtnsList: [
        { name: "时段付费用户", value: "1" },
        { name: "时段首次付费用户", value: "2" },
        { name: "每周付费用户", value: "3" },
        { name: "每月付费用户", value: "4" }
      ],
      idx: "1",
      playDateTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
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
@import './style.scss'
</style>
