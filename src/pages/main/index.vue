<template>
  <div class="main">
    <div class="returnHome">
      <router-link to="/home"><i class="el-icon-back"></i><span style="margin-left: 0.2vh;">返回</span></router-link>
    </div>
    <div class="main_top">
      <div class="left">
        <img width="100%" height="90%" src="../../assets/img/jiduan/title.png" alt="">
        <div class="alltitle">
          城 市 韧 性 电 网 大 屏
        </div>
      </div>
    </div>
    <div class="main_center">
      <Insectpest style="z-index:-9" />
    </div>
  </div>
</template>

<script>
import Insectpest from './components/Insectpest'
// import util from '@/utils/request.js';
export default {
  components: {
    Insectpest,
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  },
  mounted() {
  },
  beforeDestroy() {
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/jiduan/daping_bgimg.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

  .returnHome {
    width: 100%;
    position: absolute;
    left: 2%;
    top: 2%;
    z-index: 999;

    a {
      text-decoration: none;
      background-color: rgba(6, 42, 123, 0.6);
      color: #fff;
      border-radius: 1vh;
      padding: 0.5vh 1.2vh;
      font-size: 1.8vh;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    a:hover {
      background-color: rgb(23, 147, 252);
    }
  }

  .main_top {
    display: flex;

    .left {
      position: relative;
      padding: 0.1875rem 0 0 0.25rem;
    }
  }
}

.alltitle {
  font-size: 1.9vw;
  /* color: rgb(226 236 255 / 0%); */
  font-weight: bold;
  position: absolute;
  top: 25%;
  left: 41%;
  -webkit-text-stroke: 1px #413c47;
  -webkit-text-fill-color: #fff;
  animation: shine 2.4s infinite;
  /*设置动画*/
}

@keyframes shine {

  /*创建动画*/
  0%,
  100% {
    color: #fff;
    text-shadow: 0 0 10px #0000FF, 0 0 10px #0000FF;
  }

  50% {
    text-shadow: 0 0 10px #0000FF, 0 0 40px #0000FF;
  }
}

.unityContainer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // margin-left: 50vw;
  // transform: translateX(-50%);
  // margin-top: 12vh;
  // width: 48vw;
  // height: 62vh;
}
</style>