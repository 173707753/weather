<template>
  <div class="top">
    <div class="st_titles"> K-means聚类结果表</div>
    <el-table height="10.5vw" :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }" :data="tableData"
      style="width: 90%;margin-left: 5%;margin-top: -0.5%;" border>
      <el-table-column prop="year" label="年份" align="center">{{ this.postData.datetimes }}</el-table-column>
      <el-table-column prop="season" label="季节" align="center"></el-table-column>
      <el-table-column prop="weather" label="天气类型" align="center"></el-table-column>
      <el-table-column prop="days_count" label="天数" align="center"></el-table-column>
      <!-- <el-table-column prop="pressure" label="气压(hpa)" align="center"
                  v-if="tableData.some(item => item.pressure ? item.pressure : item.pressure === 0 ? true : false)"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import util from '@/utils/request.js';
// import charts from './charts.vue';
export default {
  // components: { charts },
  data() {
    return {
      tabs: false,
      statics: 0,
      isClickOverBot: false,
      allcharts: {},
      tableData: [
      ],
      postData: {
        region: '湖北省',
        district: '宜昌市',
        site: '三峡',
        datetimes: '2019',
      },
    };
  },
  methods: {
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
    showChart(data) {
      this.isClickOverBot = !this.isClickOverBot;
      this.allcharts = data;
      // console.log(this.allcharts, '数据');
    },
    computerDays(data) {
      for (let i = 0; i < data.length; i++) {
        switch (data[i].season) {
          case 'autumn':
            data[i].season = '秋季'
            break;
          case 'spring':
            data[i].season = '春季'
            break;
          case 'summer':
            data[i].season = '夏季'
            break;
          case 'winter':
            data[i].season = '冬季'
            break;
          default:
            break;
        }
        switch (data[i].weather) {
          case 'cloudy':
            data[i].weather = '多云'
            break;
          case 'rain_snow':
            data[i].weather = '雨雪'
            break;
          case 'sunny':
            data[i].weather = '晴天'
            break;
          default:
            break;
        }
      }
      this.tableData = []
      let testData = data.slice(3, 9)
      this.tableData.push(...testData)
      data.splice(3, 6)
      this.tableData.push(...data)
    }
  },
  mounted() {
    // util.post('/api/get_kmeans', this.postData)
    //   .then((response) => {
    //     if (response && response.code === 200) {
    //       // 请求成功的处理逻辑
    //       // console.log(response.data, '11111');
    //       this.computerDays(response.data)
    //     } else {
    //       // 请求失败的处理逻辑
    //       // console.error('POST请求失败', response);
    //       this.$message.error('服务器错误')
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('POST请求错误', error);
    //   });
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  z-index: 99999;
  // height: 20vh;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../../../assets/img/ch/chbg_new.png');

  /deep/.el-table tr {
    background-color: rgba(0, 25, 47, 0.7);
  }

  /deep/ .el-table,
  .el-table__expanded-cell {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
  }

  /deep/.el-table thead {
    background-color: rgba(0, 25, 47, 0.7);
  }

  /deep/.el-table tbody tr:hover>td {
    background-color: rgba(67, 145, 228, 0.2);
  }

  /deep/.el-table--scrollable-y .el-table__body-wrapper:-webkit-scrollbar {
    /*隐藏滚轮*/
    // display: none;
  }

  /deep/.el-table--border,
  .el-table--group {
    border-color: 4187B3;
  }

  ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: rgba(32, 86, 131, 0.3);
  }

  //里面滑块
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);



    -webkit-box-shadow: inset 0 0 wpx rgba(0, 0, 0, .3);
    background-color: #205683;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.2);
  }

  /deep/.el-table--border th.el-table__cell.gutter:last-of-type {
    display: none;
  }
}
</style>

