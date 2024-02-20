<template>
  <div class="home">
    <div class="home_top">
      <img src="../../assets/img/home/top.png" width="100%" height="auto" alt="">
      <div class="home_title">
        <!-- <img src="../../assets/img/home/wz.png" width="20%" height="auto" alt=""> -->
        <div style="color: rgb(226, 236, 255);font-size:1.45vw;font-weight: bold;position: absolute;left: 37%;">
          <!-- 电力碳中和智能化调度 -->
          新型电力系统电力保供优化调度系统研究
        </div>
      </div>
      <div class="home_g">
        <img src="../../assets/img/home/g.png" width="40%" height="auto" alt="">
      </div>
    </div>
    <div class="home_center">
      <div class="left">
        <div :key="itermStyleKeyzz" @mouseenter="changeMask('itermStyleKeyzz', 'itermStylezz', 'in')"
          @mouseleave="changeMask('itermStyleKeyzz', 'itermStylezz', 'out')" :class="itermStylezz" class="item">
          <div>
            <p>运行数据管理</p>
            <img width="8%" height="auto" alt="">
          </div>
          <img class="bg" src="../../assets/img/home/left1.png" alt="">
        </div>
        <div @click="tozb" @mouseenter="changeMask('itermStyleKeyly', 'itermStylely', 'in')"
          @mouseleave="changeMask('itermStyleKeyly', 'itermStylely', 'out')" :key="itermStyleKeyly" class="item"
          :class="itermStylely">
          <div style="right:38%">
            <p>运行评估指标</p>
            <img width="8%" height="auto" alt="">
          </div>
          <img class="bg" src="../../assets/img/home/left2.png" alt="">
        </div>

        <div @mouseenter="changeMask('itermStyleKeych', 'itermStylech', 'in')"
          @mouseleave="changeMask('itermStyleKeych', 'itermStylech', 'out')" :key="itermStyleKeych" class="item"
          :class="itermStylech">
          <div>
            <p>调度知识管理</p>
            <img width="8%" height="auto" alt="">
          </div>
          <img class="bg" src="../../assets/img/home/left3.png" alt="">
        </div>
      </div>
      <div class="center">
        <img src="../../assets/img/home/xz.gif" width="120%" height="auto" alt="">
      </div>
      <div class="right">
        <div @click="getfade" :key="itermStyleKeyyz" @mouseenter="changeMask('itermStyleKeyyz', 'itermStyleyz', 'in')"
          @mouseleave="changeMask('itermStyleKeyyz', 'itermStyleyz', 'out')" :class="itermStyleyz" class="item">
          <div style="margin-left: 8%;">
            <!-- <img width="8%" height="auto" src="../../assets/img/home/智慧养殖.png" alt=""> -->
            <p>多能协同调度</p>
          </div>
          <img class="bg" src="../../assets/img/home/right1.png" alt="">
        </div>
        <div :key="itermStyleKeysy" @mouseenter="changeMask('itermStyleKeysy', 'itermStylesy', 'in')"
          @mouseleave="changeMask('itermStyleKeysy', 'itermStylesy', 'out')" :class="itermStylesy" class="item">
          <div style="left:-10%">
            <!-- <img width="8%" height="auto" src="../../assets/img/home/智慧溯源.png" alt=""> -->
            <p>备用精准测算</p>
          </div>
          <img class="bg" src="../../assets/img/home/right2.png" alt="">
        </div>
        <div :key="itermStyleKeydj" @mouseenter="changeMask('itermStyleKeydj', 'itermStyledj', 'in')"
          @mouseleave="changeMask('itermStyleKeydj', 'itermStyledj', 'out')" :class="itermStyledj" class="item">
          <div style="margin-left: 8%;">
            <!-- <img width="8%" height="auto" src="../../assets/img/home/数字党建.png" alt=""> -->
            <p>运行优化评估</p>
          </div>
          <img class="bg" src="../../assets/img/home/right3.png" alt="">
        </div>
      </div>
    </div>
    <div class="home_bottom">
      <!-- <router-link to="/login">
        登录
      </router-link> -->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      itermStylezz: 'animated fadeInDown', // 种植的动画
      itermStylely: '', //林业的动画
      itermStylech: '', //虫害的动画
      itermStyleKeyzz: 'itermStyleKeyzz', //建值 用来刷新动画
      itermStyleKeyly: 'itermStyleKeyly', //建值 用来刷新动画
      itermStyleKeych: 'itermStyleKeych', //建值 用来刷新动画
      itermStyleyz: 'animated fadeInDown', // 养殖的动画
      itermStylesy: '', //溯源的动画
      itermStyledj: '', //党建的动画
      itermStyleKeyyz: 'itermStyleKeyyz', //建值 用来刷新动画
      itermStyleKeysy: 'itermStyleKeysy', //建值 用来刷新动画
      itermStyleKeydj: 'itermStyleKeydj', //建值 用来刷新动画
      mousetype: '',
    }
  },
  created() {
    setTimeout(() => {
      this.itermStylely = 'animated fadeInDown'
      this.itermStylesy = 'animated fadeInDown'
    }, 200)
    setTimeout(() => {
      this.itermStylech = 'animated fadeInDown'
      this.itermStyledj = 'animated fadeInDown'
    }, 400)
  },
  methods: {
    // 点击缩小
    getfade(k, c) {
      this.$router.push('main')
    },
    tozb() {
      // this.$router.push('stark')
    },
    changeMask(k, c, t) {
      // console.log(k,c,t)
      if (this.mousetype === t) return
      this.mousetype = t
      /*
         k 键值
         c class类名
         t 移入还是移出
       */
      if (t === 'in') {
        this[c] = 'animated pulse'
        this[k] = this[k] + '1'
      } else {
        this.mousetype = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding-top: 1%;
  background-image: url('../../assets/img/home/bg_new.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

  .home_top {
    position: relative;

    .home_title {
      top: 20%;
      width: 100%;
      text-align: center;
      position: absolute;
    }
  }

  .home_center {
    display: flex;
    margin-top: 2% !important;
    width: 90%;
    justify-content: center;
    margin: auto;
    padding-left: 8%;
    align-items: center;

    .left {
      text-align: right;
      margin-right: -13%;
      z-index: 99;

      .item {
        .bg {
          width: 80%;
          height: auto;
          display: block;
          margin-top: 2%;
        }

        position: relative;
        cursor: pointer;

        div {
          width: 100%;
          position: absolute;
          right: 34%;
          top: 24%;
          font-size: 1.8vw;
          justify-content: flex-end;
          // text-align: right;
          display: flex;
          align-items: center;
          color: #8ADBFF;
        }
      }
    }

    .center {
      z-index: 9;
    }

    .right {
      text-align: right;
      margin-left: 1%;
      z-index: 99;

      .item {
        .bg {
          width: 80%;
          height: auto;
          display: block;
          margin-top: 2%;
        }

        position: relative;
        cursor: pointer;

        div {
          width: 100%;
          position: absolute;
          left: -22%;
          top: 24%;
          font-size: 1.8vw;
          justify-content: center;
          // text-align: right;
          display: flex;
          align-items: center;
          color: #8ADBFF;
        }
      }
    }
  }

  .home_bottom {
    font-size: 2vh;
    width: 100%;
    position: absolute;
    left: 93%;
    top: 3%;
    z-index: 999;

    /* 新增的样式规则 */
    a {
      text-decoration: none;
      /* 去掉下划线 */
      // background-color: rgb(25, 58, 115);
      /* 背景颜色 */
      color: white;
      /* 文本颜色 */
      padding: 5px 10px;
      /* 内边距 */
      border-radius: 5px;
      /* 圆角 */
      font-size: 2vh;
      /* 字体大小 */
      transition: background-color 0.3s;
      /* 添加过渡效果 */
    }

    a:hover {
      color: #0073e6;
      /* 鼠标悬停时的背景颜色 */
    }
  }

}
</style>