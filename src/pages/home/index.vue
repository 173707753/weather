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
              <div v-for="(item, itemIndex) in group" :key="itemIndex" class="tip"
                :class="{ 'tip': true, 'tipBackground': item.label === selectedTool, 'selected': item.label === selectedTool }"
                @click="toRunMain(item)">
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
          { imgSrc: require("@/assets/img/jiduan/kanban.png"), label: "数据看板", path: '/kanban' },
          { imgSrc: require("@/assets/img/jiduan/dingwei.png"), label: "故障定位", path: '/dingwei' },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/zhenduan.png"), label: "故障诊断", path: '/zhenduan' },
          { imgSrc: require("@/assets/img/jiduan/tuopu.png"), label: "网络拓扑", path: '/tuopu' },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/yujing.png"), label: "风险预警", path: '/yujing' },
          { imgSrc: require("@/assets/img/jiduan/pinggu.png"), label: "韧性评估", path: '/pingu' },

        ],
        [
          { imgSrc: require("@/assets/img/jiduan/shebei.png"), label: "设备监管", path: '/shebei' },
          { imgSrc: require("@/assets/img/jiduan/daping.png"), label: "数据大屏", path: '/main' },
        ]
      ],
      value: new Date(),
      circleUrl: require("@/assets/img/jiduan/管理员.png"),
      selectedTool: { imgSrc: require("@/assets/img/jiduan/kanban.png"), label: "数据看板", path: '/kanban' },
    }
  },
  created() {

  },
  methods: {
    toRunMain(label) {
      this.selectedTool = label.label;
      this.$router.push(label.path);
    },
    toRunLoginHome() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.toRunMain(this.selectedTool)
  },
}
</script>

<style lang="scss" scoped>
.home {
  /deep/ .el-header {
    background-color: #496eee;
    color: #333;
    width: 100vw;
    height: 10vh !important;
  }

  /deep/ .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    width: 16vw !important;
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
    background-color: #ebf0fd;
    border: 2px solid rgb(153, 196, 248);
    border-radius: 1.2vh;
  }

  .tools {
    font-size: 2vh;
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
    background-color: #5588f3;
    border-radius: 2vh;
    color: #fff;
  }

  .tipBackground {
    background-color: #5588f3;
    border-radius: 2vh;
    color: #fff;
  }

  .selected {
    background-color: #5588f3;
    border-radius: 2vh;
    color: #fff;
  }
}
</style>