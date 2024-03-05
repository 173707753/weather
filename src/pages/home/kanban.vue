<template>
  <div class="contain">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="shadow">
          <div class="pic">
            <div>
              <img src="@/assets/img/jiduan/装置1.png" alt="" style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
              <div style="text-align: center;">装置1</div>
            </div>
            <div>
              <img src="@/assets/img/jiduan/装置2.png" alt="" style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
              <div style="text-align: center;">装置2</div>
            </div>
            <div>
              <img src="@/assets/img/jiduan/装置3.png" alt="" style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
              <div style="text-align: center;">装置3</div>
            </div>
            <div>
              <img src="@/assets/img/jiduan/装置4.png" alt="" style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
              <div style="text-align: center;">装置4</div>
            </div>
            <div>
              <img src="@/assets/img/jiduan/装置5.png" alt="" style="width: 6vh; height: 6vh; border-radius: 1.5vh;">
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
          <div style="font-size: 2vh;font-weight: bold;">
            <span><i class="el-icon-caret-right"></i></span>管理日历
          </div>
          <div class="cal">
            <div>
              <div class="video">视频</div>
              <div class="video">视频</div>
              <div class="video">视频</div>
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
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
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

    /deep/.el-icon-caret-right::before {
      color: #359afe;
      font-size: 3vh;
    }
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

    .video {
      border: 1px solid skyblue;
      border-radius: 0.8vh;
      padding: 0.5vh;
      cursor: pointer;
    }
  }
}
</style>