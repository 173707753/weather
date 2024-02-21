<template>
  <div class="home">
    <el-container>
      <el-header>
        <div
          style="display: flex; justify-content:space-between; align-items: center; padding: 0 10px; color: #fff; line-height: 10vh;">
          <div style="font-size:30px; font-weight: 600; ">
            <!-- <i class="el-icon-back"></i> -->
            <span style="margin-left: 15px;">极端天气集成系统</span>
          </div>
          <div @click="toRunLoginHome"><span style="margin-right: 1vw;">欢迎您！监管员</span><span><el-avatar :size="size"
                style="width: 4vh;height: 4vh;" :src="circleUrl"></el-avatar></span></div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="aside">
            <div style="text-align: center; font-size: 2.4vh ;font-weight: bold; margin-top: 2vh; margin-bottom: 4vh;">
              常用工具
            </div>
            <div v-for="(group, index) in toolGroups" :key="index" class="tools">
              <div v-for="(item, itemIndex) in group" :key="itemIndex" class="tip" @click="toRunMain">
                <img :src="item.imgSrc" alt=""
                  style="width: 4vh; height: 4vh;padding: 1vh;border-radius: 1.5vh;background-color: white;">
                <div style="font-size: 1.8vh ;font-weight: bold;">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="contain">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-card class="shadow">
                  <div class="pic">
                    <div>
                      <img src="@/assets/img/jiduan/装置1.png" alt=""
                        style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
                      <div style="text-align: center;">装置1</div>
                    </div>
                    <div>
                      <img src="@/assets/img/jiduan/装置2.png" alt=""
                        style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
                      <div style="text-align: center;">装置2</div>
                    </div>
                    <div>
                      <img src="@/assets/img/jiduan/装置3.png" alt=""
                        style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
                      <div style="text-align: center;">装置3</div>
                    </div>
                    <div>
                      <img src="@/assets/img/jiduan/装置4.png" alt=""
                        style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
                      <div style="text-align: center;">装置4</div>
                    </div>
                    <div>
                      <img src="@/assets/img/jiduan/装置5.png" alt=""
                        style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
                      <div style="text-align: center;">装置5</div>
                    </div>
                  </div>
                  <div>
                    <div class="text">XX装置</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card class="shadow">
                  <div style="font-size: 46px; font-weight: 600;text-align: center; margin-bottom: 15px;">600</div>
                  <el-progress :percentage="10"></el-progress>
                  <div class="text">故障数</div>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card class="shadow">
                  <div style="font-size: 56px; font-weight: 600;text-align: center; color: red; ">24</div>
                  <div class="text" style="margin-left: 4vw; margin-top: 6vh;">代办提醒</div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card class="box">
                  <div><span><i class="el-icon-caret-right"></i></span>管理日历</div>
                  <div class="cal">
                    <div>
                      <div>视频</div>
                      <div>视频</div>
                      <div>视频</div>
                    </div>
                    <div style="width: 60vw;">
                      <el-calendar v-model="value">
                      </el-calendar>
                    </div>
                    <div>
                      <div style="font-size: 18px; font-weight: 600;"> Day3</div>
                      <ul>
                        <li>注意晴天的天气状况</li>
                        <li>注意雨天的天气状况</li>
                        <li>注意多云的天气状况</li>
                        <li>注意雨雪的天气状况</li>
                      </ul>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
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
          { imgSrc: require("@/assets/img/jiduan/数据看板.png"), label: "数据看板" },
          { imgSrc: require("@/assets/img/jiduan/气象数据.png"), label: "气象数据" },
        ],
        [
          { imgSrc: require("@/assets/img/jiduan/极端天气.png"), label: "极端天气" },
          { imgSrc: require("@/assets/img/jiduan/故障诊断.png"), label: "故障诊断" },
        ],
        [
          { imgSrc: require("@/assets/img/jiduan/数据看板 (1).png"), label: "数据看板" },
          { imgSrc: require("@/assets/img/jiduan/数据看板 (2).png"), label: "数据看板" },
        ]
      ],
      value: new Date(),
      circleUrl: require("@/assets/img/jiduan/管理员.png")
    }
  },
  created() {

  },
  methods: {
    toRunMain() {
      this.$router.push("/main");
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

  .shadow {
    height: 25vh;
    border-radius: 10px;
    box-shadow: 8px 18px 14px rgba(61, 107, 223, 0.5);
  }

  .box {
    margin-top: 4vh;
    height: 56vh;
    border-radius: 10px;
    box-shadow: 3px 12px 8px rgba(44, 55, 82, 0.2);
  }

  .pic {
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      background-color: skyblue;
      padding: 0.5vh;
    }
  }

  .text {
    text-align: center;
    margin-top: 4vh;
    color: #fff;
    line-height: 5vh;
    width: 7vw;
    height: 5vh;
    border-radius: 24px;
    background-color: #359afe;
    margin-left: 3vw;
  }

  .cal {
    margin-top: 4vh;
    display: flex;
    // align-items: center;
    justify-content: space-around;
  }
}
</style>