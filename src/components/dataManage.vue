<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`GIS管理`">
      <template slot="container">
        <el-tabs>
          <el-tab-pane label="数据管理">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="请选择省份" prop="province">
                <el-select v-model="form.province" placeholder="请选择省份">
                  <el-option v-for="(prov, index) in provinceList" :key="index" :value="prov">{{ prov }}</el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="请选择县市" prop="city">
                <el-select v-model="form.city" placeholder="请选择县市">
                  <el-option v-for="(city, index) in cityList" :key="index" :value="city">{{ city }}</el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="请选择站点" prop="point">
                <el-select v-model="form.point" placeholder="请选择站点">
                  <el-option v-for="(point, index) in pointList" :key="index" :value="point">{{ point }}</el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="请选择日期" prop="date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="form.date" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="天气聚类">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="请选择日期" prop="dateFormDate">
                <div class="block">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.dateFormDate" type="daterange"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template slot="bottombtn">
        <el-button size="small" plain type="primary" @click="resetForm">取消</el-button>
        <el-button size="small" plain type="primary" @click="submitForm">确定</el-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import util from '@/utils/request.js';
import Dialog from './dialog.vue'
export default {
  name: 'datacity',
  props: ['opendig', 'switchIndex'],
  components: {
    Dialog,
  },
  data() {
    return {
      form: {
        province: '湖北省',
        city: '宜昌市',
        point: '三峡',
        date: '2019-03-07',
        dateFormDate: [],
      },
      provinceList: [], //省
      cityList: [], // 市县
      pointList: [],
      cityData: [], //所有的总数据
      dialogVisible: false,
      rules: {
        province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
        city: [{ required: true, message: '请先输入省份', trigger: 'blur' }],
        point: [{ required: true, message: '请输入站点', trigger: 'blur' }],
        date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
      },
      // post数据
      postData: {
        region: '湖北省',
        district: '宜昌市',
        site: '三峡',
        start_time: '2019-03-07',
        end_time: '',
      },
      sedPostData: {
        region: '湖北省',
        district: '宜昌市',
        site: '三峡',
        datetimes1: '2019-03-07',
        datetimes_start: '2019-03-07',
        datetimes_end: '2019-03-30',
      },
      flagform: '',
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    handleClose() {
      this.$emit('updateState', !this.opendig)
    },
    computerArea(data) {
      this.postData.start_time = ''
      this.postData.end_time = ''
      if (data.dateFormDate.length === 2) {
        this.postData.start_time = data.dateFormDate[0]
        this.postData.end_time = data.dateFormDate[1]
        this.form.dateFormDate = ''
      } else {
        this.postData.region = data.province
        this.postData.district = data.city
        this.postData.site = data.point
        this.postData.start_time = data.date
        this.postData.end_time = ''
        this.form.date = ''
      }
      this.sedPostData.region = data.province
      this.sedPostData.district = data.city
      this.sedPostData.site = data.point
      this.sedPostData.datetimes1 = data.date
      this.sedPostData.datetimes_start = data.dateFormDate[0]
      this.sedPostData.datetimes_end = data.dateFormDate[1]
      // console.log(this.postData, 'this.postData');
    },
    submitData(data) {
      if (data.length === 0) {
        this.$message.error('该天没有数据')
      } else {
        if (this.flagform === 2) {
          // console.log(2222);
          this.$bus.$emit('left2Data', data)
        } else {
          // console.log(1111);
          this.$bus.$emit('left1Data', data)
        }
      }
    },
    submitForm() {
      this.computerArea(this.form)
      this.flagTimes = 2
      // console.log(this.form, 'this.forms');
      // console.log(this.postData, 'this.postData');
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          // util.post('/api/filter_results', this.postData)
          //   .then((response) => {
          //     if (response && response.code === 200) {
          //       // 请求成功的处理逻辑
          //       console.log(response.type, 'response.type');
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
        } else {
          console.log('error submit!!');
          return false;
        }
        localStorage.setItem('area', JSON.stringify(this.sedPostData))
        // 传递省区数据
        this.$bus.$emit('formData', this.postData)
      });
    },
    resetForm() {
      this.dialogVisible = false
      this.$refs.form.resetFields();
      // 传递省区数据
      this.$bus.$emit('formData', this.form)
    },
    // 计算省份 市区 站点数据
    computerRegion(data) {
      this.cityData = data
      const provinceList = data.map(item => item.site_name);
      this.provinceList = provinceList;
    },
    // 处理树状结构的省市站点数据
    findNodeByName(site_name, tree = this.cityData) {
      for (const node of tree) {
        if (node.site_name === site_name) {
          return node;
        }
        if (node.children) {
          const result = this.findNodeByName(site_name, node.children);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
  },
  created() {
  },
  mounted() {
    // util.get('/api/get_site_tree')
    //   .then((response) => {
    //     if (response && response.code === 200) {
    //       // console.log(response, '11111');
    //       // 请求成功的处理逻辑
    //       this.computerRegion(response.data)
    //     } else {
    //       // 请求失败的处理逻辑
    //       console.error('POST请求失败', response);
    //       this.$message.error('服务器错误')
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('GET /api/get_region 请求错误', error);
    //   });
    // util.post('/api/filter_results', this.postData)
    //   .then((response) => {
    //     if (response && response.code === 200) {
    //       // console.log(response.data, '11111');
    //       // 请求成功的处理逻辑
    //       this.flagTimes = 2
    //       this.$bus.$emit('left1Data', response.data)
    //     } else {
    //       // 请求失败的处理逻辑
    //       // console.error('POST请求失败', response);
    //       this.$message.error('服务器错误')
    //     }
    //     this.$bus.$emit('left2Data', response.data)
    //   })
    //   .catch((error) => {
    //     console.error('POST请求错误', error);
    //   });
    // 传递省区数据
    this.$bus.$emit('formData', this.postData)
    localStorage.setItem('area', JSON.stringify(this.sedPostData))
  },
  watch: {
    opendig(newV, oldV) {
      if (this.switchIndex === 1) {
        console.log(newV, oldV);
        this.dialogVisible = this.opendig
        if (!this.opendig) { this.dialogVisible = true }
        newV === false && this.$refs.form?.resetFields();
      }
    },
    // 监听省份
    'form.province'(newProvince) {
      this.form.city = ''
      this.form.point = ''
      const provinceData = this.findNodeByName(newProvince);
      if (provinceData && provinceData.children) {
        const cityList = provinceData.children.map(city => city.site_name);
        this.cityList = cityList;
      }
    },
    // 监听县市
    'form.city'(newCity) {
      this.form.point = ''
      const provinceData = this.findNodeByName(this.form.province);
      if (provinceData && provinceData.children) {
        const cityData = this.findNodeByName(newCity, provinceData.children);
        if (cityData && cityData.children) {
          const pointList = cityData.children.map(point => point.site_name);
          this.pointList = pointList;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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

::v-deep .el-menu-item-group>ul {
  overflow: hidden;
}

::v-deep .el-input__inner {
  background-color: #fff0;
}

::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background-color: rgba(16, 15, 15, 0);
}

::v-deep .el-select-dropdown {
  // background-color: #fff0 !important;
  background-color: #172e33 !important;
  z-index: 999999;
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

::v-deep .el-tabs--border-card {
  background: none;
  border: none;
}

::v-deep .el-tabs--border-card>.el-tabs__header {
  background: none;
  border-bottom: none;
}

::v-deep .el-popper[x-placement^=bottom] {
  background-color: #172e33 !important;
}

::v-deep .el-date-editor .el-range-input {
  background: rgba(0, 25, 47, 0.8);
  color: #fff;
}

::v-deep .el-date-editor .el-range-separator {
  color: #fff;
}

::v-deep .el-tabs__nav-wrap::after {
  background: rgba(0, 0, 0, 0);
}

::v-deep .el-tabs__item {
  color: #fff;
  font-size: 0.833vw;
}
</style>