<template>
  <div class="top" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="st_titles">优化调度评估总览</div>
    <div class="st_tops">
    </div>
    <div class="dwasda" v-if="tabs">
      <div class="st_bo">
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat`" :option="gethnoption(1)"></chat>
          </div>
          <p class="desc">湖北省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat1`" :option="gethnoption(2)"></chat>
          </div>
          <p class="desc">河南省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat2`" :option="gethnoption(3)"></chat>
          </div>
          <p class="desc">江西省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat3`" :option="gethnoption(4)"></chat>
          </div>
          <p class="desc">湖南省发电</p>
        </div>
      </div>
      <div class="st_bo">
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat4`" :option="gethnoption(5)"></chat>
          </div>
          <p class="desc">全网发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat5`" :option="gethnoption(6)"></chat>
          </div>
          <p class="desc">全网备用</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat6`" :option="gethnoption(7)"></chat>
          </div>
          <p class="desc">全网送电</p>
        </div>
        <div class="nyzb">
          <div>
            <img width="120%" src="../../../../assets/img/ch/绿色服务/service2.png" alt="" class="rotating2_pic" />
          </div>
          <div class="count">
            <chat :id="`hnchat7`" :option="gethnoption(8)"></chat>
          </div>
          <p class="desc">全网用电</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/utils/request.js';
import chat from '../../../../components/EChart.vue'
export default {
  data() {
    return {
      loading: true,
      tabs: false,
      hunanData: {},
      hubeiData: {},
      jiangxiData: {},
      henanData: {},
      power1: [],
      power2: [],
      power3: [],
      power4: [],
      statics: 0,
      hnoption: {
        tooltip: {
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['41%', '49%'],
            radius: ['2%', '60%'],
            roseType: 'radius',
            itemStyle: {
              // borderRadius: 2
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
            ]
          },
        ]
      }
    };
  },
  components: {
    chat
  },
  created() {
    // this.getnowTime()
    // 初始调用一次
    let adjustedTime = this.getnowTime();
    // console.log(adjustedTime, 'nowtime');
    // 定义定时器，每隔15分钟调用一次
    setInterval(function () {
      adjustedTime = this.getnowTime();
    }, 15 * 60 * 1000);

    // util.get('/api/get_overview_data?datetiming=' + adjustedTime)
    //   .then(response => {
    //     // console.log(response,'res');
    //     if (response && response.code === 200) {
    //       // 请求成功的处理逻辑
    //       this.hunanData = response.data[0]
    //       this.hubeiData = response.data[1]
    //       this.jiangxiData = response.data[2]
    //       this.henanData = response.data[3]
    //       this.power1 = response.data[4].generation_summation //全网
    //       this.power3 = response.data[5].receive_generation //受电
    //       this.power4 = response.data[6].real_time_generation //实时用电
    //       this.power2 = response.data[7].backup_generation_sum  //备用总和
    //       // console.log(this.power1,'111');
    //       this.tabs = true
    //       this.loading = false
    //     } else {
    //       // 请求失败的处理逻辑
    //       this.$message.error('服务器错误')
    //       this.tabs = false
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error('服务器错误', error)
    //   });
  },
  methods: {
    gethnoption(val) {
      let obj = JSON.parse(JSON.stringify(this.hnoption))
      obj.tooltip = {
        backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
        borderRadius: 0,
        borderWidth: 0,
        trigger: 'item',

        formatter: function (params) {
          var res = ''
          res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
          return res
        }
      }
      if (val == 1) {
        obj.tooltip = {
          backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          trigger: 'item',

          formatter: function (params) {
            var res = ''
            res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
            return res
          },
          position: function (point, params, dom, rect, size) {
            // 获取可视区域的宽度和高度
            const viewWidth = size.viewSize[0];
            const viewHeight = size.viewSize[1];

            // 获取提示框内容的宽度和高度
            const tooltipWidth = dom.offsetWidth;
            const tooltipHeight = dom.offsetHeight;

            // 设置提示框的位置
            let left = point[0];
            let top = point[1];

            // 判断提示框是否超出可视范围，如果超出则调整位置
            if (left + tooltipWidth > viewWidth) {
              left = viewWidth - tooltipWidth;
            }
            if (top + tooltipHeight > viewHeight) {
              top = viewHeight - tooltipHeight;
            }

            return [left, top];
          },
        }
        obj.series[0].data = [
          { value: this.hubeiData.fire_generation, name: '火力发电' },
          { value: this.hubeiData.water_generation, name: '水力发电' },
          { value: this.hubeiData.take_generation, name: '抽蓄发电' },
          { value: this.hubeiData.light_generation, name: '光伏发电' },
          { value: this.hubeiData.wind_generation, name: '风力发电' }]
        return obj
      } if (val == 2) {
        obj.series[0].data = [
          { value: this.henanData.fire_generation, name: '火力发电' },
          { value: this.henanData.water_generation, name: '水力发电' },
          { value: this.henanData.take_generation, name: '抽蓄发电' },
          { value: this.henanData.light_generation, name: '光伏发电' },
          { value: this.henanData.wind_generation, name: '风力发电' }]
        return obj
      } if (val == 3) {
        obj.series[0].data = [
          { value: this.jiangxiData.fire_generation, name: '火力发电' },
          { value: this.jiangxiData.water_generation, name: '水力发电' },
          { value: this.jiangxiData.take_generation, name: '抽蓄发电' },
          { value: this.jiangxiData.light_generation, name: '光伏发电' },
          { value: this.jiangxiData.wind_generation, name: '风力发电' }]
        return obj
      } if (val == 4) {
        obj.series[0].data = [
          { value: this.hunanData.fire_generation, name: '火力发电' },
          { value: this.hunanData.water_generation, name: '水力发电' },
          { value: this.hunanData.take_generation, name: '抽蓄发电' },
          { value: this.hunanData.light_generation, name: '光伏发电' },
          { value: this.hunanData.wind_generation, name: '风力发电' }]
        return obj
      } if (val == 5) {
        obj.tooltip = {
          backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          trigger: 'item',

          formatter: function (params) {
            var res = ''
            res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
            return res
          },
          position: function (point, params, dom, rect, size) {
            // 获取可视区域的宽度和高度
            const viewWidth = size.viewSize[0];
            const viewHeight = size.viewSize[1];

            // 获取提示框内容的宽度和高度
            const tooltipWidth = dom.offsetWidth;
            const tooltipHeight = dom.offsetHeight;

            // 设置提示框的位置
            let left = point[0];
            let top = point[1];

            // 判断提示框是否超出可视范围，如果超出则调整位置
            if (left + tooltipWidth > viewWidth) {
              left = viewWidth - tooltipWidth;
            }
            if (top + tooltipHeight > viewHeight) {
              top = viewHeight - tooltipHeight;
            }

            return [left, top];
          },
        }
        obj.series[0].data = [
          { value: this.power1[0].data, name: '河南省' },
          { value: this.power1[1].data, name: '江西省' },
          { value: this.power1[2].data, name: '湖北省' },
          { value: this.power1[3].data, name: '湖南省' }]
        return obj
      } if (val == 6) {
        obj.series[0].data = [
          { value: this.power2[0].data, name: '河南省' },
          { value: this.power2[1].data, name: '江西省' },
          { value: this.power2[2].data, name: '湖北省' },
          { value: this.power2[3].data, name: '湖南省' }]
        return obj
      } if (val == 7) {
        obj.series[0].data = [{ value: this.power3[0].data, name: '河南省' },
        { value: this.power3[1].data, name: '江西省' },
        { value: this.power3[2].data, name: '湖北省' },
        { value: this.power3[3].data, name: '湖南省' }]
        return obj
      } if (val == 8) {
        obj.series[0].data = [{ value: this.power4[0].data, name: '河南省' },
        { value: this.power4[1].data, name: '江西省' },
        { value: this.power4[2].data, name: '湖北省' },
        { value: this.power4[3].data, name: '湖南省' }]

        return obj
      }
      // console.log(obj, 111)
      // return obj
    },
    changeStatis(val) {
      this.statics = val;
      setTimeout(() => {
        // 为了体现按钮动画 点击动画时长300ms
        if (val === 1 || val === 3) {
          this.tabs = false;
        } else {
          this.tabs = true;
        }
      }, 150);
    },
    getnowTime() {
      // 获取当前时间
      const now = new Date();
      const year = now.getFullYear(); // 获取当前年份
      const month = now.getMonth() + 1; // 获取当前月份（注意：月份从 0 开始计数）
      const day = now.getDate(); // 获取当前日期
      const hour = now.getHours(); // 获取当前小时数
      const minute = now.getMinutes(); // 获取当前分钟数
      const second = now.getSeconds(); // 获取当前秒
      // 格式化时间字符串
      const formattedTimeStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

      console.log(formattedTimeStr, 'now');
      const timeComponents = formattedTimeStr.split(' ')[1].split(':'); // 将时间字符串分割成时、分、秒三个部分
      let newhour = parseInt(timeComponents[0]);
      let newminute = parseInt(timeComponents[1]);

      // 计算最近的 15 分钟时间
      if (newminute % 15 !== 0) {
        newminute = Math.floor(newminute / 15) * 15; // 向上取整到最近的 15 的倍数
        if (newminute === 60) {
          newhour = (newhour + 1) % 24; // 如果分钟数进位到 60，小时数也需要进位
        }
      }
      // 格式化调整后的时间
      const adjustedTimeStr = `2023-08-24 ${newhour.toString().padStart(2, '0')}:${newminute.toString().padStart(2, '0')}:00`;
      // console.log(adjustedTimeStr, 'ppp');
      return adjustedTimeStr
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  z-index: 99999;
  height: 26vh;
  // height: 100%;
  background-image: url("../../../../assets/img/ch/绿色服务/绿色服务.png");
  background-size: 100% 107%;
  background-repeat: no-repeat;

  .st_dw {
    width: 55%;
    font-size: 1.6vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .smalltab {
    width: 45%;
    position: relative;
    display: flex;
    margin-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;

    img {
      z-index: 9999;
      cursor: pointer;
    }

    .small_tabs {
      position: relative;

      p {
        cursor: pointer;
        z-index: 9999;
        right: 13%;
        top: 4%;
        margin-top: 5%;
        position: absolute;
      }

      font-size: 1vh;
      text-align: right;
    }

    .small_tabsed {
      position: relative;

      p {
        cursor: pointer;
        z-index: 9999;
        left: 8%;
        top: 4%;
        position: absolute;
      }

      font-size: 0.5vh;
      text-align: left;
      margin-left: -1px;
    }
  }

  .st_bo {
    display: flex;
    margin-top: -2%;
    justify-content: space-around;
    height: 20vh;

    .desc {
      font-size: 1.8vh;
      color: #C5C5C5;
      font-family: PingFangSC-Medium, PingFang SC;
      position: relative;
      // top: -6vh;
    }

    p {
      // margin-top: 1vh;
    }

    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;

      .rotating_pic {
        animation: myfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
        animation: nmyfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      // .water_zb {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      // .water_zs{
      //   // 水波纹的大小位置设置
      //   width: 5vw;
      //   height: 5vw;
      //   left: 28%;
      //   top: 0%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      .count {
        position: absolute;
        top: 0;
      }

      .dw {
        font-size: 1vh;
        margin-left: 2px;
        color: #ffbf2c;
      }
    }

    .lsjp {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;

      .rotating_pic {
        animation: myfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
        animation: nmyfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      // .water_jp {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #35ece8;
      //   box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #35ece8;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -11vh;
      }

      .dw {
        font-size: 1vh;
        color: #35ece8;
        margin-left: 2px;
      }
    }

    .lszz {
      flex: 1;
      text-align: center;
      position: relative;

      .rotating_pic {
        animation: myfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
        animation: nmyfirst 1.5s linear infinite;
        /*开始动画后无限循环，用来控制rotate*/
      }

      // .water_zz {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #59ff85;
      //   box-shadow: 2px 2px 30px #59ff85; /* 阴影效果 */
      // }
      // .water_bj {
      //   // 水波纹的大小位置设置
      //   width: 5vw;
      //   height: 5vw;
      //   left: 28%;
      //   top: 0%;
      //   border: 2px solid #35ece8;
      //   box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -11vh;
      }

      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
  }

  .dwasda {
    max-height: 20vh;
    overflow: hidden;
    overflow-y: scroll;
  }

  .dwasda::-webkit-scrollbar {
    width: 4px;
  }

  .dwasda::-webkit-scrollbar-track {
    background: #525579;
  }

  .dwasda::-webkit-scrollbar-thumb {
    background: #4f668e;
    /* 滚动条滑块颜色 */
  }
}
</style>
