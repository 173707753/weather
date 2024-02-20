<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`数据管理`">
      <template slot="container">
        <div class="data">
          <el-form ref="form1" :model="form1">
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <el-radio v-model="radio" label="1" @change="handleDate1">历史数据</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-form-item label="请选择日期" prop="date">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form1.date" type="date" :style="{ width: '9.375vw' }"
                    :clearable="false" size="small" @change="selectdata1" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <el-radio v-model="radio" label="2" @change="handleDate2">天气数据</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-form-item label="请选择日期" prop="weatherDate">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form1.weatherDate" type="date"
                    :style="{ width: '9.375vw' }" :clearable="false" @change="selectdata2" size="small"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <div class="search"><el-button plain size="mini" type="primary">查询数据</el-button></div> -->
          </el-form>
        </div>
      </template>
      <template slot="bottombtn">
        <el-button @click="sureSumbit" size="small" type="primary" plain>确定</el-button>
      </template>
    </Dialog>
  </div>
</template>
  
<script>
import util from '@/utils/request.js';
import Dialog from './dialog.vue'
export default {
  name: 'caseManage',
  props: ["openCase", 'switchIndex'],
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      radio: '1',
      modelType: '1',
      form1: {
        date: '2019-03-07',
        weatherDate: '',
        radio: '1',
      },
      form2: {
        oneModel: "",
        AddModel: '',
        best: '',
      },
      modelList: [
        {
          value: '1',
          label: '极限学习机ELM模型'
        },
        {
          value: '2',
          label: 'BSA模型'
        },
        {
          value: '3',
          label: 'GA模型'
        },
      ],
      bestList: [{
        value: '1',
        label: '遗传算法GA'
      },
      {
        value: '2',
        label: '第二个优化算法'
      },
      {
        value: '3',
        label: '第三个优化算法'
      }],
      // post数据
      postData: {
        region: '湖北省',
        district: '宜昌市',
        site: '三峡',
        start_time: '2019-03-07',
        end_time: '',
      },
      title: '历史数据'
    }
  },
  methods: {
    selectdata1() {
      this.radio = '1'
      this.form1.radio = '1'
      this.form1.weatherDate = ''
      this.title = '历史数据'
    },
    selectdata2() {
      this.radio = '2'
      this.form1.radio = '2'
      this.form1.date = ''
      this.title = '天气数据'
    },
    selectModal1() {
      this.modelType = '1'
      this.form2.AddModel = '',
        this.form2.best = ''
    },
    selectModal2() {
      this.modelType = '2'
      this.form2.oneModel = ''
    },
    selectModal3() {
      this.modelType = '2'
      this.form2.oneModel = ''
    },
    selectModal4() {
      this.modelType = '3'
    },
    handleDate1() {
      this.radio = '1'
      this.form1.radio = '1'
      this.title = '历史数据'
      this.form1.date = '2019-03-07'
      this.form1.weatherDate = ''
    },
    handleDate2() {
      this.radio = '2'
      this.form1.radio = '2'
      this.title = '天气数据'
      this.form1.date = ''
      this.form1.weatherDate = '2019-03-07'
    },
    handleClose() {
      this.$emit('updatePoint')
    },
    closeDialog() {
      this.dialogVisible = false
    },
    submitData(data) {
      if (this.flagform === 2) {
        // console.log(2222);
        this.$bus.$emit('left2Data', data)
      } else {
        // console.log(1111);
        this.$bus.$emit('left1Data', data)
      }
      this.$bus.$emit('titleData', this.title)
      this.$bus.$emit('caseData', this.form1)
    },
    sureSumbit() {
      // console.log(this.form1, 'form1');
      if (this.title === '历史数据') {
        this.postData.start_time = this.form1.date
      } else {
        this.postData.start_time = this.form1.weatherDate
      }
      // util.post('/api/filter_results', this.postData)
      //   .then((response) => {
      //     // console.log(this.postData, 'this.postData');
      //     if (response && response.code === 200) {
      //       // 请求成功的处理逻辑
      //       this.flagform = response.type
      //       this.submitData(response.data)
      //     } else {
      //       // 请求失败的处理逻辑
      //       console.error('POST请求失败', response);
      //       this.$message.error('服务器错误')
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('POST请求错误', error);
      //   });
      this.closeDialog()
    }
  },
  watch: {
    openCase(newV, oldV) {
      if (this.switchIndex === 0) {
        console.log(newV, oldV);
        this.dialogVisible = this.openCase
        if (!this.openCase) { this.dialogVisible = true }
      }
    }
  },
  mounted() {
    this.$bus.$on('formData', (data) => {
      this.postData = []
      this.postData = {
        region: data.region,
        district: data.district,
        site: data.site,
        start_time: data.start_time,
        end_time: '',
      }
      // console.log(this.postData, 'this.postData');
    })
    this.$bus.$on('pointData', (data) => {
      this.form1.date = data.date
      this.form1.weatherDate = data.weatherDate
      this.form1.radio = data.radio
      this.radio = data.radio
    })
  },
  beforeDestroy() {
    this.$bus.$off('formData');
    this.$bus.$off('pointData');
  }
}
</script>
<style lang="scss" scoped>
.data {
  padding: 0.95vw;
  height: 6.77vw;
  border-radius: 0.42vw;
  // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  border: 2px solid #4187B3;
  margin-bottom: 0.55vw;

  .search {
    float: right;
  }
}

.model {
  width: 100%;
  height: 10.9vw;
  padding: 0.625vw;
  border-radius: 0.42vw;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);

}

.el-button--mini {
  float: right;
}

.pointName {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}

.latlng {
  display: flex;
  flex-direction: column;

  .latLngItem {

    line-height: 1vw;
  }
}

.newstyle {
  margin-bottom: 1.82vw;
}

::v-deep .el-form-item {
  margin-bottom: 0.52vw;
}

::v-deep .el-menu-item-group>ul {
  overflow: hidden;
}

/deep/ .el-input__inner {
  background-color: #fff0;
}

.el-select-dropdown {
  background-color: #fff0 !important;
  z-index: 9999;
}

.el-select-dropdown__item {
  color: #fff !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: #6997db73 !important;
}

.el-input__inner {
  color: #fff;
}

::v-deep .el-form-item__label {
  color: #fff !important;
}

/deep/ .el-button--small {
  font-size: 0.8vw;
  font-weight: bold;
  padding: 1vh;
  border-radius: 0.2vw;
}

/deep/.el-button--primary.is-plain {
  color: #fff;
  background: #fff0;
  border-color: #04f2f9;
}

::v-deep .el-radio {
  color: #fff !important;
}
</style>