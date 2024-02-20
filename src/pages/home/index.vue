<template>
  <div class="home">
    <div class="home_bottom">
      <router-link to="/login">
        登录
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding-top: 1%;
  background-image: url('../../assets/img/jiduan/daping_bgimg.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

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