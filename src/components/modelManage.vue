<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`智能建模`">
      <template slot="container">
        <!-- <el-alert title="请选择所有的参数" type="info" show-icon style="margin-bottom: 10px;">
        </el-alert> -->
        <el-form ref="form" :model="form" label-width="180px">
          <div class="info">你已选择{{ postData.region }}{{ postData.district }}{{ postData.site }}站点</div>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge">极限学习机ELM模型</div>
            </el-col>
            <el-col :span="6">
              <el-button size="small" plain type="primary" style="margin-top: 10px;"
                @click="selectNum(1)">选择参数</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge">LSTM模型</div>
            </el-col>
            <el-col :span="6">
              <el-button plain type="primary" size="small" style="margin-top: 10px;"
                @click="selectNum(2)">选择参数</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge">GA-ELM模型</div>
            </el-col>
            <el-col :span="6">
              <el-button plain type="primary" size="small" style="margin-top: 10px;"
                @click="selectNum(3)">选择参数</el-button>
            </el-col>
          </el-row>
          <!-- <div class="data">
          <div class="summber">春季晴天</div>
          
          <div class="time">2023.10.12</div>
        </div> -->
          <!-- <div class="odd">
            <el-radio v-model="radio" label="1">单模型</el-radio>
            <el-form-item label="请选择预测模型" prop="model">
              <el-select v-model="form.oneModel" placeholder="请选择预测模型" @change="modal">
                <el-option v-for="(model) in modelList" :key="model.value" :value="model.value"
                  :label="model.label"></el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <!-- <div class="even">
            <el-radio v-model="radio" label="2">组合模型</el-radio>
            <el-form-item label="请选择优化模型" prop="best">
              <el-select v-model="form.best" placeholder="请选择优化模型" @change="addmodal">
                <el-option v-for="(model) in bestList" :key="model.value" :value="model.value"
                  :label="model.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择预测模型" prop="model">
              <el-select v-model="form.AddModel" placeholder="请选择预测模型" @change="addmodal">
                <el-option v-for="(model) in modelList" :key="model.value" :value="model.value"
                  :label="model.label"></el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <!-- <el-form-item label="自动选
              择" prop="select">
              <el-button type="primary" size="small">自适应智能预测模型</el-button>
            </el-form-item> -->

          <!-- <el-form-item label="自动选择" prop="select" style="margin-top: 16px;">
            <el-button type="primary" size="small" style="margin-top: 8px;">自适应智能预测模型</el-button>
          </el-form-item> -->
        </el-form>
      </template>
      <template slot="bottombtn">
        <el-button size="small" plain type="primary">取消</el-button>
        <el-button size="small" plain type="primary" @click="confirm">确定</el-button>
      </template>
    </Dialog>
    <elm :visiableParams1="visiableParams1" @childEvent1="handleChildEvent1" />
    <bsa :visiableParams2="visiableParams2" @childEvent2="handleChildEvent2" />
    <ga :visiableParams3="visiableParams3" @childEvent3="handleChildEvent3" />
  </div>
</template>
  
<script>
import Dialog from './dialog.vue'
import elm from "@/components/modelParameter/ELM.vue"
import bsa from "@/components/modelParameter/BSA.vue"
import ga from "@/components/modelParameter/GA.vue"
import util from '@/utils/request.js';
export default {
  props: ['openModel', 'switchIndex'],
  name: 'modelManage',
  components: {
    elm, bsa, ga, Dialog,
  },
  data() {
    // var validateOne = (rule, value, callback) => {
    //   if (this.radio === '1') {
    //     if (value === '') {
    //       console.log("if");
    //       callback(new Error('请选择预测模型！'));
    //     } else {
    //       callback();
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    // var validateBest = (rule, value, callback) => {
    //   if (this.radio === '2') {
    //     if (value === '') {
    //       callback(new Error('请选择优化模型！'));
    //     } else {
    //       callback();
    //     }
    //   } else {
    //     callback();
    //   }
    // }
    // var validateAdd = (rule, value, callback) => {
    //   if (this.radio === '2') {
    //     if (value === '') {
    //       callback(new Error('请选择预测模型！'));
    //     } else {
    //       callback();
    //     }
    //   } else {
    //     callback()
    //   }
    // }

    return {
      buttonClickCount: 0,
      visiableParams1: false,
      visiableParams2: false,
      visiableParams3: false,
      radio: '1',
      dialogVisible: false,
      today: new Date(),
      form: {
        oneModel: '',
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
      bestList: [
        {
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
        },
      ],
      gabsfData: [
        {
          date: '',
          time: '7:30',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '8.23',
          actualPower: '8.12',
          totalIrradiation: '92',
          directIrradiation: '85',
          diffuseIrradiance: '51',
          temperature: '5.8',
          relativeIrradiation: '80.5',
          airPressure: '1015'
        },
        {
          date: '',
          time: '7:45',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '12.89',
          actualPower: '12.97',
          totalIrradiation: '133',
          directIrradiation: '120',
          diffuseIrradiance: '67',
          temperature: '6.1',
          relativeIrradiation: '80.6',
          airPressure: '1015.3'
        },
        {
          date: '',
          time: '8:00',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '18.43',
          actualPower: '18.31',
          totalIrradiation: '184',
          directIrradiation: '164',
          diffuseIrradiance: '83',
          temperature: '6.5',
          relativeIrradiation: '80',
          airPressure: '1015.7'
        },
        {
          date: '',
          time: '8:15',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '23.23',
          actualPower: '23.93',
          totalIrradiation: '237',
          directIrradiation: '209',
          diffuseIrradiance: '100',
          temperature: '7',
          relativeIrradiation: '80',
          airPressure: '1015.9'
        },
        {
          date: '',
          time: '8:30',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '29.51',
          actualPower: '29.43',
          totalIrradiation: '288',
          directIrradiation: '251',
          diffuseIrradiance: '116',
          temperature: '8.1',
          relativeIrradiation: '79.7',
          airPressure: '1015.8'
        },
        {
          date: '',
          time: '8:45',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '36.23',
          actualPower: '35.71',
          totalIrradiation: '355',
          directIrradiation: '300',
          diffuseIrradiance: '128',
          temperature: '9',
          relativeIrradiation: '80.2',
          airPressure: '1015.7'
        },
        {
          date: '',
          time: '9:00',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '41.65',
          actualPower: '42.34',
          totalIrradiation: '424',
          directIrradiation: '354',
          diffuseIrradiance: '139',
          temperature: '9.9',
          relativeIrradiation: '82.7',
          airPressure: '1016'
        },
        {
          date: '',
          time: '9:15',
          realGeneration: '',
          predictiveGeneration: '',
          predictedPower: '48.23',
          actualPower: '48.82',
          totalIrradiation: '480',
          directIrradiation: '406',
          diffuseIrradiance: '144',
          temperature: '10.4',
          relativeIrradiation: '84.3',
          airPressure: '1015.8'
        },
      ],
      postData: {
        region: '湖北省',
        district: '宜昌市',
        site: '三峡',
        train_or_test: 'train',
        ga_hidden_num: '20',
        ga_pop_num: '20',
        ga_max_iter: '50',
        ga_cross_prob: '0.5',
        ga_mut_prob: '0.01',
        eml_hidden_num: '50',
        lstm_mse_loss: 'false',
        lstm_optimizer: 'adam',
        lstm_lr_scheduler: 'poly',
        lstm_window_size: '7',
        lstm_hidden_size: '200',
        lstm_layer_num: '2',
        lstm_epochs: '200',
        lstm_batch_size: '16',
        lstm_lr: '0.0001'
      },

    }
  },
  created() {
    this.$bus.$on('formData', (data) => {
      this.postData.region = data.region
      this.postData.district = data.district
      this.postData.site = data.site
    })
    this.$bus.$on('elmData', (elmData) => {
      // console.log(elmData,'111');
      this.postData.eml_hidden_num = elmData.pointCount
    })
    this.$bus.$on('bsaData', (bsaData) => {
      // console.log(bsaData,'222');
      this.postData.lstm_mse_loss = bsaData.params1
      this.postData.lstm_optimizer = bsaData.params2
      this.postData.lstm_lr_scheduler = bsaData.params3
      this.postData.lstm_window_size = bsaData.params4
      this.postData.lstm_hidden_size = bsaData.params5
      this.postData.lstm_layer_num = bsaData.params6
      this.postData.lstm_epochs = bsaData.params7
      this.postData.lstm_batch_size = bsaData.params8
      this.postData.lstm_lr = bsaData.params9
    })
    this.$bus.$on('gaData', (gaData) => {
      // console.log(gaData,'333');
      this.postData.ga_pop_num = gaData.params1
      this.postData.ga_cross_prob = gaData.params2
      this.postData.ga_mut_prob = gaData.params3
      this.postData.ga_max_iter = gaData.params4
      this.postData.ga_hidden_num = gaData.params5
    })
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    selectNum(e) {
      this.buttonClickCount++;
      if (e === 1) {
        this.visiableParams1 = !this.visiableParams1
      } else if (e === 2) {
        this.visiableParams2 = !this.visiableParams2
      } else if (e === 3) {
        this.visiableParams3 = !this.visiableParams3
      }
    },
    // modal(e) {
    //   this.radio = '1'  //选中单模型
    //   // 通过value值来判断选择哪个具体的模型来开启不同的弹框
    //   if (e === '1') {
    //     this.visiableParams1 = !this.visiableParams1 
    //   }
    //   if (e === '2') {
    //     this.visiableParams2 = !this.visiableParams2
    //   }
    //   if (e === '3') {
    //     this.visiableParams3 = !this.visiableParams3 
    //   }
    // },
    handleChildEvent1(data) {
      this.visiableParams1 = data;
    },
    handleChildEvent2(data) {
      this.visiableParams2 = data;
    },
    handleChildEvent3(data) {
      this.visiableParams3 = data;
    },
    addmodal() {
      this.radio = "2"  //选中双模型
    },
    handleClose() {
      this.$emit('ModelState', !this.openModel)
    },
    //传递GA和BSF表单数据
    confirm() {
      // util.post('/api/algorithm', this.postData)
      //   .then((response) => {
      //     if (response && response.code === 200) {
      //       // 请求成功的处理逻辑
      //       console.log(response, 'res');
      //       this.dialogVisible = false
      //     } else {
      //       // 请求失败的处理逻辑
      //       console.error('POST请求失败', response);
      //       this.$message.error('服务器错误')
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('POST请求错误', error);
      //   });

      // util.post('/api/algorithm', this.postData)
      //   .then((response) => {
      //     if (response && response.code === 200) {
      //       // 请求成功的处理逻辑
      //       console.log(response, 'res');
      //     } else {
      //       // 请求失败的处理逻辑
      //       console.error('POST请求失败', response);
      //       this.$message.error('服务器错误')
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('POST请求错误', error);
      //   });
      this.$bus.$emit('GABSF', this.gabsfData);
      // this.dialogVisible = false
    },
  },
  watch: {
    openModel(newV, oldV) {
      if (this.switchIndex === 2) {
        console.log(newV, oldV);
        this.dialogVisible = this.openModel
        if (!this.openModel) {
          this.dialogVisible = true
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.data {
  display: flex;
  margin-bottom: 1.04vw;
  justify-content: flex-end;
  align-items: center;

  .summber {
    width: 6.77vw;
    height: 7.29vw;
    text-align: center;
    line-height: 2.083vw;
    color: #fff;
    background-color: rgb(20, 108, 143);
    ;
    // border: 1px solid #409EFF;
    // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
    margin-right: 0.52vw;
  }

  .time {
    width: 6.77vw;
    height: 2.083vw;
    color: #fff;
    text-align: center;
    line-height: 2.083vw;
    background-color: rgb(20, 108, 143);
    ;
    // border: 1px solid #409EFF;
    // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  }
}

.odd {
  width: 94%;
  height: 4.6875vw;
  padding: 0.78125vw;
  // border: 1px solid #409EFF;
  // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 3px solid #4187B3;
  margin-bottom: 0.78125vw;
}

.even {
  width: 94%;
  height: 11.46vw;
  padding: 0.78125vw;
  // border: 1px solid #409EFF;
  // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  border: 3px solid #4187B3;
  border-radius: 0.52vw;
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

::v-deep .el-form-item__label {
  color: #fff;
}

::v-deep .el-input--prefix .el-input__inner {
  background-color: skyblue;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  padding-right: 0;
}

::v-deep .el-menu-item-group>ul {
  overflow: hidden;
}

::v-deep .el-input__inner {
  background-color: #fff0;
}

.el-select-dropdown {
  // background-color: #ffffff2b !important;
  background-color: #172e33 !important;
  z-index: 9999;
}

.el-select-dropdown__item {
  color: #fff !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: #6997db73 !important;
}

.el-button--primary {
  background-color: #3131b6
}

.el-input__inner {
  color: #fff;
}

.knowledge {
  width: 100%;
  height: 2.6vw;
  color: #fff;
  text-align: center;
  font-size: 0.86vw;
  line-height: 2.6vw;
  // background-color: rgb(20, 108, 143);
  background-color: rgba(0, 25, 47, 0.8);
  // box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  border: 3px solid #4187B3;
  margin-bottom: 0.9375vw;
  cursor: pointer;
}

.info {
  height: 58px;
  color: #fff;
  font-size: 20px;
}

::v-deep .el-alert {
  background-color: #3e4955;

}
</style>