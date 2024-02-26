<template>
  <div class="home">
    <el-container>
      <el-header>
        <div
          style="display: flex; justify-content:space-between; align-items: center; padding: 0 10px; color: #fff; line-height: 10vh;">
          <div style="font-size:30px; font-weight: 600; ">
            <!-- <i class="el-icon-back"></i> -->
            <span style="margin-left: 15px;">城市韧性电网</span>
          </div>
          <div @click="toRunLoginHome" style="cursor: pointer;"><span
              style="margin-right: 1vw;">欢迎您！监管员</span><span><el-avatar style="width: 4vh;height: 4vh;"
                :src="circleUrl"></el-avatar></span></div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="aside">
            <div style="text-align: center; font-size: 2.4vh ;font-weight: bold; margin-top: 2vh; margin-bottom: 4vh;">
              常用工具
            </div>
            <div v-for="(group, index) in toolGroups" :key="index" class="tools">
              <div v-for="(item, itemIndex) in group" :key="itemIndex" class="tip" @click="toRunMain(item.label)">
                <img :src="item.imgSrc" alt=""
                  style="width: 4vh; height: 4vh;padding: 1vh;border-radius: 1.5vh;background-color: white;">
                <div style="font-size: 1.8vh ;font-weight: bold;">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toolGroups: [
        [
          { imgSrc: require("@/assets/img/jiduan/kanban.png"), label: "数据看板" },
          { imgSrc: require("@/assets/img/jiduan/dingwei.png"), label: "故障定位" },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/zhenduan.png"), label: "故障诊断" },
          { imgSrc: require("@/assets/img/jiduan/tuopu.png"), label: "网络拓扑" },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/yujing.png"), label: "风险预警" },
          { imgSrc: require("@/assets/img/jiduan/pinggu.png"), label: "韧性评估" },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/shebei.png"), label: "设备监管" },
          { imgSrc: require("@/assets/img/jiduan/daping.png"), label: "数据大屏" },
        ]
      ],
      value: new Date(),
      circleUrl: require("@/assets/img/jiduan/管理员.png")
    }
  },
  created() {

  },
  methods: {
    toRunMain(label) {
      if (label === '数据看板') {
        this.$router.push("/kanban");
      } else if (label === '故障定位') {
        this.$router.push("/dingwei")
      } else if (label === '数据大屏') {
        this.$router.push("/main");
      }
    },
    toRunLoginHome() {
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  /deep/ .el-header {
    background-color: rgb(14, 110, 219);
    color: #333;
    width: 100vw;
    height: 10vh !important;
  }

  /deep/ .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    width: 16vw;
    height: 90vh;
    padding: 15px;
  }

  /deep/ .el-main {
    background-color: #fff;
    color: #333;
    width: 84vw;
    height: 90vh;
  }

  .aside {
    height: 86vh;
    background-color: rgb(181, 209, 233);
    border: 1px solid rgb(17, 124, 196);
    border-radius: 8px;
  }

  .tools {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 4vh;
  }

  .tip {
    width: 10vh;
    height: 10vh;
    padding-top: 1vh;
    cursor: pointer;
    // background-color: blue;
  }

  .tip:hover {
    background-color: #359afe;
    border-radius: 2vh;
    color: #fff;
  }
}
</style>