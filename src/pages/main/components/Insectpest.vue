<template>
  <div class="Insectpest">
    <div class="Insectpest_t">
      <!-- 左边数据 -->
      <div class="Insectpest_t_left">
        <div class="scrollable-content">
          <left1 style="height: 33%;" />
          <left2 style="margin-top: 0.5%;height: 33%;" />
          <left3 style="margin-top: 0.5%;height: 33%;" />
        </div>
      </div>
      <!-- 中间地图 -->
      <div class="Insectpest_t_center">
        <Map />
      </div>
      <!-- 右边数据 -->
      <div class="Insectpest_t_right">
        <div class="content">
          <chart1 style="height: 33%;" />
          <chart2 style="margin-top: 0.5%;height: 33%;" />
          <chart3 style="margin-top: 0.5%;height: 33%;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import left1 from './Insectpest/left/left1'
import left2 from './Insectpest/left/left2'
import left3 from './Insectpest/left/left3'
import Map from './Insectpest/map'
import chart1 from './Insectpest/rightDate/chart1'
import chart2 from './Insectpest/rightDate/chart2'
import chart3 from './Insectpest/rightDate/chart3'
export default {
  components: {
    Map,
    left1,
    left2,
    left3,
    chart1,
    chart2,
    chart3,
  },
  data() {
    return {
      currentTime: this.getCurrentTime(),
      role: 'watcher'
    }
  },
  created() {
    this.role = 'production' // 生产者
  },
  beforeDestroy() {
  },
  methods: {
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
    width: 22%;
    height: 87vh;
    position: relative;

    .scrollable-content {
      width: 100%;
      height: 100%;
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
    width: 55%;
    height: 87vh;
    position: relative;
    overflow: hidden;
    margin-top: 2vh;
  }

  .Insectpest_t_right {
    width: 22%;
    height: 87vh;
    position: relative;

    .content {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
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

  }

  // .Insectpest_b {
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 0 20px;
  //   margin-top: 0.5%;

  //   .Insectpest_b_left {
  //     width: 22.5%;
  //     // background-color: #fff;
  //     height: 26vh;
  //   }

  //   .Insectpest_b_center {
  //     width: 55%;
  //     height: 25.7vh;
  //     // background-color: #fff;
  //   }

  //   .Insectpest_b_right {
  //     width: 22.5%;
  //     height: 26vh;
  //     // background-color: #fff;
  //   }
  // }

}
</style>