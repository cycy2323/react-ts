<template>
  <div v-if="userInfo" class="userdetails-container">
    <el-card shadow="never">
      <h3>基本信息</h3>
      <el-row class="top-table">
        <el-col :span="4" :style="{ textAlign: 'center' }">
          <div class="m_avatar">
            <el-avatar class="img" :size="60" :src="userInfo.headImage">
              <img src="@/assets/images/avatar.png" />
            </el-avatar>
            <div style="padding: 14px;">
              <div>{{ userInfo.nickname }}</div>
              <div class="member">
                {{
                  userTypeOptions.find(
                    item => Number(userInfo.userType) === item.value
                  ).label
                }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <table border="1" style="width:100%;border-collapse:collapse;">
            <tr>
              <th class="th_tab" align="center">
                <div>ID</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.id }}</div>
              </td>
              <th class="th_tab" align="center">
                <div>用户名</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.account }}</div>
              </td>
            </tr>
            <tr>
              <th class="th_tab" align="center">
                <div>昵称</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.nickname }}</div>
              </td>
              <th class="th_tab" align="center">
                <div>手机号码</div>
              </th>
              <td class="th_tab" align="center">
                <div>
                  {{
                    userInfo.phone === ""
                      ? ""
                      : userInfo.phone.slice(0, 3) +
                        "****" +
                        userInfo.phone.slice(7, 11)
                  }}
                </div>
              </td>
            </tr>
            <tr>
              <th class="th_tab" align="center">
                <div>性别</div>
              </th>
              <td class="th_tab" align="center">
                <div>
                  {{ sexs.find(item => userInfo.sex === item.value).label }}
                </div>
              </td>
              <th class="th_tab" align="center">
                <div>生日</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.birthday }}</div>
              </td>
            </tr>
            <tr>
              <th class="th_tab" align="center">
                <div>注册时间</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.createTime }}</div>
              </td>
              <th class="th_tab" align="center">
                <div>所在地</div>
              </th>
              <td class="th_tab" align="center">
                <div>{{ userInfo.area }}</div>
              </td>
            </tr>
            <tr>
              <th class="th_tab" align="center">
                <div>个性签名</div>
              </th>
              <td class="th_tab" align="center" colspan="3">
                <div>{{ userInfo.remark }}</div>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>

      <!-- 统计信息 -->
      <h3 class="h_title">统计信息</h3>
      <el-table
        :data="[userInfo]"
        :header-cell-style="{ background: '#f5f7fa' }"
        border
        fit
        highlight-current-row
        size="mini"
      >
        <el-table-column label="余额" align="center" prop="balance" />
        <el-table-column label="可用抖币" align="center" prop="goldNumber" />
        <el-table-column label="邀请好友" align="center" prop="friendNum" />
        <el-table-column label="关注" align="center" prop="focusNum" />
        <el-table-column label="粉丝" align="center" prop="fansNum" />
        <el-table-column label="上传视频" align="center" prop="publishNum" />
        <el-table-column label="收藏视频" align="center" prop="praiseNum" />
        <el-table-column
          label="视频获赞"
          align="center"
          prop="videoPraiseNum"
        />
      </el-table>
      <h3>权限开关</h3>
      <el-table
        :header-cell-style="{ background: '#f5f7fa' }"
        border
        :data="permissionList"
        fit
        highlight-current-row
        size="mini"
      >
        <el-table-column align="center" prop="roleTitle" label="权限">
        </el-table-column>
        <el-table-column align="center" label="内容" prop="context" />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.valided"
              inactive-color="#ccc"
              active-color="#13ce66"
              @change="_userValided(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>

      <h3>上传记录</h3>
      <el-table
        :header-cell-style="{ background: '#f5f7fa' }"
        border
        fit
        :data="list"
        highlight-current-row
        size="mini"
      >
        <el-table-column align="center" label="视频ID">
          <template slot-scope="scope">{{ scope.row.videoId }}</template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="视频">
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
                  @click="checkplayFilm(scope.row.videoIdcUrl)"
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
              <i class="el-icon-video-play" style="font-size: 30px"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="视频名称" align="center">
          <template slot-scope="scope">{{ scope.row.videoTitle }}</template>
        </el-table-column>
        <el-table-column label="发布日期" align="center">
          <template slot-scope="scope">{{ scope.row.publishTime }}</template>
        </el-table-column>
        <el-table-column label="大小" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.videoSize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.playNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.praiseNum }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delVideo(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <slot name="pagination"></slot>
    </el-card>
    <!-- 查看视频 -->
    <el-dialog
      center
      class="my_play_video"
      title="播放视频"
      :visible.sync="isPlay"
      width="900px"
      :before-close="handleCancel"
      :modal-append-to-body="false"
    >
      <div class="play_video" style="text-align: center;">
        <video
          id="container"
          class="video-js vjs-big-play-centered"
          controls
          :src="url"
          preload="auto"
          webkit-playsinline="true"
          playsinline="true"
        ></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  components: {},
  props: {
    userInfo: {
      type: Object,
      default: null
    },
    pages: {
      type: Object,
      default: null
    },
    list: {
      type: Array,
      default: []
    },
    permissionList: {
      type: Array,
      default: []
    }
  },
  components: {},

  data() {
    return {
      userTypeOptions: [
        {
          value: -1,
          label: "全部"
        },
        { value: 0, label: "普通用户" },
        { value: 1, label: "会员用户" },
        { value: 2, label: "封禁用户" }
      ],
      sexs: [
        {
          value: 0,
          label: "男"
        },
        {
          value: 1,
          label: "女"
        },
        {
          value: 2,
          label: "保密"
        }
      ],
      isPlay: false,
      url: ""
    };
  },
  created() {},
  methods: {
    // 查看视频
    checkplayFilm(item) {
      this.isPlay = true;
      this.url = item;
    },
    //取消弹窗
    handleCancel() {
      let myVideo = document.getElementById("container");
      myVideo.currentTime = 0;
      myVideo.pause();
      this.isPlay = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tr_all {
  height: 36px;
  width: 400px;
}
.th_table {
  vertical-align: middle;
  background: rgb(245, 247, 250);
}
.th_tab {
  vertical-align: middle;
  height: 48px;
}
.userdetails-container {
  min-height: 50%;
  max-height: 50%;
  .box-card {
    min-width: 100%;
    margin-bottom: 50px;
  }
  .cov {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: none;
    position: absolute;
    text-align: center;
    font-size: 16px;
    box-shadow: 0px 0px 5px black;
  }
  .con {
    z-index: 1100;
    width: 600px;
    height: 200px;
    background-color: white;
    position: fixed;
    right: 30%;
    top: 30%;
    position: fixed;
    box-shadow: 0px 0px 15px black;
  }
  .ptitle {
    width: 100%;
    height: 35px;
    background-color: #3daae9;
    color: white;
    line-height: 35px;
  }
  .dbt {
    border-radius: 5px;
    width: 70px;
    height: 30px;
    background-color: #3daae9;
    right: 20px;
    bottom: 20px;
    position: absolute;
    line-height: 30px;
    color: white;
  }
}
.top-table {
  .el-table__body-wrapper {
    overflow: hidden;
    position: relative;
    display: none;
  }
  .cell {
    padding: 4px 0;
  }
  .is-right {
    background: rgb(249, 249, 249);
  }

  .has-gutter {
    margin-top: -1px;
  }
  .el-table + .el-table {
    margin-top: -1px;
  }
}
.member {
  background: #ffa94c;
  margin: 10px auto;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}

.m_avatar {
  background: rgb(249, 249, 249);
  height: 240px;
  text-align: center;
  .img {
    width: 50px;
    height: 50px;
    margin-top: 85px;
  }
}
.h_title {
  margin-top: 20px;
}
.play_video {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #3fdd86;
  width: 850px;
  height: 478px;
}
#container {
  width: 100%;
  height: 100%;
}
@import "@/assets/styles/style.scss";
</style>
