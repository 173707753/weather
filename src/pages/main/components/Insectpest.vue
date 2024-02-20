<template>
  <div class="Insectpest">
    <div class="Insectpest_t">
      <!-- 左边数据 -->
      <div class="Insectpest_t_left">
        <div class="title_left">大数据管理</div>
        <div class="scrollable-content">
          <left1 style="height: 48%;" />
          <left2 style="height: 48%;margin-top: 2vh" />
          <!-- <left3 style="margin-top: 2vh" /> -->

        </div>
      </div>
      <!-- 中间地图 -->
      <div class="Insectpest_t_center">
        <!-- <div style="text-align: center;color: rgb(55, 209, 259);font-size: 32px;position: absolute;">
          电力碳中和智能化调度
        </div> -->
        <Map />
      </div>
      <!-- 右边数据 -->
      <!-- <div class="title">源网储荷优化调度</div> -->
      <div class="Insectpest_t_right">
        <div class="box">
          <div class="returnHome">
            <!-- <router-link to="/home">返回</router-link> -->
          </div>
          <div class="title_right">人工智能模型</div>
          <div class="nowTime">{{ currentTime }}</div>
        </div>
        <div class="content">
          <div class="top" style="height: 48%;">
            <chart1 />
          </div>
          <div class="bot" style="height: 48%;">
            <chart2 />
          </div>
          <!-- <div class="bot" style="height: 48%;">
            <chart3 />
          </div> -->
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="Insectpest_b">
      <div class="Insectpest_b_left">
        <!-- <left5 /> -->
      </div>
      <div class="Insectpest_b_center">
        <warningInformation />
      </div>
      <div class="Insectpest_b_right">
        <!-- <greenServices /> -->
      </div>
    </div>
  </div>
</template>

<script>
import left1 from './Insectpest/left/left1'
import left2 from './Insectpest/left/left2'
// import left3 from './Insectpest/left/left3'
// import left5 from './Insectpest/left5'
import Map from './Insectpest/map'
import chart1 from './Insectpest/rightDate/chart1'
import chart2 from './Insectpest/rightDate/chart2'
// import chart3 from './Insectpest/rightDate/chart3'
// import watcherStatistical from './Insectpest/watcherStatistical'
// import watcherEnvironmental from './Insectpest/watcherEnvironmental'
import warningInformation from './Insectpest/warningInformation'
// import greenServices from './Insectpest/greenServices'

import Vue from 'vue';
export const EventBus = new Vue()
export default {
  components: {
    Map,
    left1,
    left2,
    // left3,
    warningInformation,
    chart1,
    chart2,
    // chart3,
  },
  data() {
    return {
      currentTime: this.getCurrentTime(),
      role: 'watcher'
    }
  },
  // created() {
  //   this.role = 'production' // 生产者
  // },
  created() {
    this.role = 'production' // 生产者
    // 每隔一秒更新一次时间
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，防止内存泄漏
    clearInterval(this.timer);
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      return `${this.padZero(currentHour)}:${this.padZero(currentMinute)}:${this.padZero(currentSecond)}`;
    },
    padZero(value) {
      // 辅助函数用于确保数字始终有两位，例如：2 -> "02"
      return value < 10 ? `0${value}` : value;
    }
  }
}
</script>

<style lang="scss" scoped>
.Insectpest {
  width: 100%;
  height: 100%;

  .Insectpest_t {
    display: flex;
    justify-content: space-between;
    padding: 0 1vh;
    margin-top: 0.2vh;
  }

  .Insectpest_t_left {
    width: 27%;
    height: 58.5vh;
    position: relative;
    margin-top: 1.3%;

    .title_left {
      position: absolute;
      font-size: 1.25vw;
      color: red;
      font-weight: 600;
      top: -8%;
      left: 38%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 20vw;
    }

    .scrollable-content {
      width: 100%;
      height: 148.2%;
      /* 启用垂直滚动条 */
      overflow-y: auto;
      overflow-x: hidden;

      /* 自定义滚动条样式 */
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: #4f668e;
        /* 滚动条滑块的颜色 */
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #525579;
        /* 滚动条轨道的颜色 */
        border-radius: 4px;
      }
    }
  }

  .Insectpest_t_center {
    margin-top: 2vh;
    width: 45%;
    height: 58.5vh;
    position: relative;
    overflow: hidden;
  }

  .Insectpest_t_right {
    width: 27%;
    height: 58.5vh;
    position: relative;

    .box {
      display: flex;
      width: 100%;
      height: 40px;
      padding-bottom: 10px;
      color: #fff;
      // background: pink;
      font-size: 3vh;
      // text-align: center;
      // align-items: center;
      align-items: flex-end;
      justify-content: space-around;
      position: absolute;
      top: -30px;
      right: 0;
      font-weight: 600
    }

    .returnHome {
      width: 100%;
      position: absolute;
      left: 94%;
      top: -2%;
      z-index: 999;

      a {
        text-decoration: none;
        background-color: rgba(25, 58, 115, .5);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 1.8vh;
        transition: background-color 0.3s;
      }

      a:hover {
        background-color: #0073e6;
      }
    }

    .title_right {

      font-size: 1.25vw;
      color: red;
      padding-left: 27%;
      font-weight: 600 ma;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 20vw;
    }

    .nowTime {
      color: #fff;
      font-size: 2vh;
      // align-items: end;
    }

    .content {
      width: 100%;
      height: 148%;
      overflow-x: hidden;
      overflow-y: scroll;
      margin-top: 26px;
    }

    /* 定义滚动条的样式 */
    .content::-webkit-scrollbar {
      width: 4px;
    }

    .content::-webkit-scrollbar-track {
      background: #525579;
    }

    .content::-webkit-scrollbar-thumb {
      background: #4f668e;
      /* 滚动条滑块颜色 */
    }

    .top {
      width: 100%;
      height: 100%;
      // height: 34vh;
      // background-color: red;
    }

    .bot {
      margin-top: 2vh;
      width: 100%;
      height: 100%;
      // height: 34vh;
      // background-color: red;
    }
  }

  .Insectpest_b {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 0.5%;

    .Insectpest_b_left {
      width: 27%;
      // background-color: #fff;
      height: 26vh;
    }

    .Insectpest_b_center {
      width: 45%;
      height: 25.7vh;
      // background-color: #fff;
    }

    .Insectpest_b_right {
      width: 27%;
      height: 26vh;
      // background-color: #fff;
    }
  }

}
</style>