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
        <div class="map_title">
          <div class="map_title_child">
            <div class="child child1"></div>
            <div class="child_num">1111</div>
            <div class="child_title">
              XX数据量（/次）
            </div>
          </div>
          <div class="map_title_child">
            <div class="child child2"></div>
            <div class="child_num">1111</div>
            <div class="child_title">
              XX数据量（/次）
            </div>
          </div>
          <div class="map_title_child">
            <div class="child child3"></div>
            <div class="child_num">1111</div>
            <div class="child_title">
              XX数据量（/次）
            </div>
          </div>
        </div>
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

    // margin-top: 2vh;
    .map_title {
      width: 80%;
      height: 12vh;
      margin-left: 10%;
      // border: 10px solid red;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 4vh;
      background-color: rgb(6, 42, 123);

      .map_title_child {
        width: 30%;
        height: 10vh;
        border: 1px solid rgb(43, 141, 187);
        border-radius: 3vh;
        position: relative;

        .child_num {
          width: 50%;
          position: absolute;
          color: rgb(250, 222, 140);
          font-size: 2vh;
          font-weight: bold;
          text-align: center;
          top: 20%;
          left: 50%;
        }

        .child_title {
          width: 50%;
          position: absolute;
          color: #fff;
          font-size: 1.2vh;
          font-weight: bold;
          text-align: center;
          top: 60%;
          left: 50%;
        }

        .child {
          width: 50%;
          margin-top: 0.5vh;
          height: 9vh;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .child1 {
          background-image: url('../../../assets/img/jiduan/icon_xlz_sy_mhzs.png');
        }

        .child2 {
          background-image: url('../../../assets/img/jiduan/icon_xlz_sy_sycxsl.png');
        }

        .child3 {
          background-image: url('../../../assets/img/jiduan/icon_xlz_sy_yzzl.png');
        }
      }

    }
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