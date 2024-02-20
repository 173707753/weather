<template>
  <div class="main">
    <div class="returnHome">
      <router-link to="/home">返回</router-link>
    </div>
    <div class="main_top">
      <div class="left">
        <img width="100%" height="90%" src="../../assets/img/ch/顶部背景_new.png" alt="">
        <img style="position: absolute;left: 5%;top: 29%;" width="90%" height="25%" src="../../assets/img/ch/测试.webp"
          alt="">
        <div class="alltitle">
          极 端 天 气 集 成 系 统
        </div>

        <!-- <div class="right">
          <div v-for="(item, index) in tabList" :key="index" class="tabs">
            <div class="tabitem" @click="chaneTab(index)">
              添加动画效果
              <div class="bg"></div>
              <div class="blob"></div>
              <img class="newImg" width="100%" v-if="item.show" height="48vh" src="../../assets/img/ch/tabhover.png"
                alt="">
              <img class="newImg" width="100%" v-else height="48vh" src="../../assets/img/ch/tabbg.png" alt="">
              <div style="color: rgb(226, 236, 255); z-index: 999 ;margin-top: -5px;">{{ item.title }}</div>
            </div>
            <div class="tabimg">
            </div>
          </div>
          <div style="cursor:pointer;" @click="helpTip"><i title="帮助" class="iconfont">&#xe72d;</i></div>
          <helpTip v-if="helpTipVisible" :helpTipVisible="helpTipVisible"></helpTip>
        </div> -->
        <!-- <div class="ports">
          <Dialog v-if="dialogVisible" :title="`数据导入`">
            <template slot="imports">
              <div style="display: flex;">
                <el-upload ref="upload" style="margin-left: 26%;margin-top: 10%;" class="upload-demo" :drag="true" submit
                  action="#" accept=".xlsx,.xls" :limit="parseInt('1')" :multiple="true" :before-remove="beforeRemove"
                  :auto-upload="false" :on-exceed="handleExceed" :file-list="fileList" :on-change="handleChange">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
                    <div slot="tip" class="el-upload__text">只能上传xlsx或xls文件，且不超过5MB</div>
                  </div>
                  <div :file-list="fileList" :before-remove="beforeRemove">
                    <div v-for="(file, index) in fileList" :key="index" :file="file" :index="index">
                      <el-tooltip class="item" effect="dark" content="点击删除" placement="top">
                        <el-icon class="el-icon-close" @click="handleRemove(file, fileList)"></el-icon>
                      </el-tooltip>
                      <img :src="file.url" class="el-upload-list-item-thumbnail" />
                    </div>
                  </div>
                </el-upload>
              </div>
              <div style=" display: flex;margin-left: 23%;margin-top: 4%;">
                <el-radio v-model="radio1" label="1" border>测试数据导入</el-radio>
                <el-radio v-model="radio1" label="2" border>训练数据导入</el-radio>
                <div @click="openPDF"
                  style="padding: 0.3vw 0.5vw;border: 1px solid #04f2f9;border-radius: 0.6vw;font-size: 0.8vw;height: 2.6vh;">
                  下载模板</div>
              </div>
            </template>
            <template slot="bottombtn">
              <el-button @click="submit" size="small" type="primary" plain>提交</el-button>
            </template>
          </Dialog>
          <el-button @click="changeVisible" size="small" type="primary" plain>数据导入<i
              style="padding-left: 0.2vw;font-weight: bold;" class="el-icon-upload2"></i></el-button>
          <div style="position: absolute;top:0vw;right:-5.5vw;" title="Excel导出" @click="exportbg">
            <el-button size="small" type="primary" plain>报告导出<i style="padding-left: 0.2vw;font-weight: bold;"
                class="el-icon-download"></i></el-button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="main_center">
      <Insectpest style="z-index:-9" :class="tabList[2].class" />
    </div>
    <!--  -->
    <!-- <dataManage :opendig="opendig" :switchIndex="switchIndex" @updateState="updateState"></dataManage>
    <modelManage :openModel="openModel" :switchIndex="switchIndex" @ModelState="ModelState"></modelManage>
    <caseManage :openCase="openCase" :switchIndex="switchIndex" @CaseState="CaseState"></caseManage>
    <knowledgeManage :openKnow="openKnow" :switchIndex="switchIndex" @KnowState="KnowState"></knowledgeManage> -->
  </div>
</template>

<script>
import Insectpest from './components/Insectpest'
// import dataManage from '@/components/dataManage.vue'
// import modelManage from '@/components/modelManage.vue'
// import caseManage from '@/components/caseManage.vue'
// import knowledgeManage from '@/components/knowledgeManage.vue'
// import Dialog from '@/components/dialog.vue'
// import util from '@/utils/request.js';
// import helpTip from './components/Insectpest/helpTip.vue'
export default {
  components: {
    Insectpest,
    // dataManage, modelManage, caseManage, knowledgeManage, Dialog, helpTip
  },
  data() {
    return {
      radio1: '1',
      helpTipVisible: false,
      dialogVisible: false,
      opendig: false,
      openCase: false,
      openModel: false,
      openKnow: false,
      tabList: [
        {
          title: '数据管理',
          show: false,
          type: 'itermStylely',
          class: 'animated fadeIn',
        },
        {
          title: 'GIS管理',
          show: false,
          type: 'itermStylely',
          class: 'animated fadeIn',
        },
        {
          title: '智能建模',
          show: false,
          type: 'itermStylech',
          class: 'animated fadeIn',
        },
        {
          title: '方案管理',
          show: false,
          type: 'itermStyleyz',
          class: 'animated fadeIn',
        },
      ],
      // 省份数据
      data1: {
        selectedProvince: '河南省',
        selectedArea: '洛北济源',
        selectedTime: '2023-08-24'
      },
      upfilelist: [],
      flag: 2,
      fileList: [],
      switchIndex: '',
      switchData: '',
      formFlag: '',
      formNumber: 1,
    }
  },
  created() {
    // this.tabList[0].show = true;
    // this.tabList.map(val => {
    // console.log(val);
    // if (val.type === this.$route.query.type) {
    //   val.show = true
    // }

    // })

  },
  methods: {
    openPDF() {
      // var newWindow = window.open("", "_blank");
      // newWindow.document.write('<embed src="/pdf/导入模板.pdf" type="application/pdf" width="100%" height="100%" />');
      // util.get('/api/get_template')
      //   .then(response => {
      //     // 处理POST请求的响应
      //     const url = `/api/get_template?template.xlsx`
      //     this.downloadFile(url, 'template.xlsx')
      //     console.log(response, 'response');
      //   })
      //   .catch(error => {
      //     // 处理POST请求的错误
      //     this.$message.error('POST请求错误')
      //     console.error('POST请求错误', error);
      //   });
    },
    helpTip() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/reading.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "帮助" }, 300);

      // if (this.helpTipVisible) { this.helpTipVisible = false }
      // this.helpTipVisible = !this.helpTipVisible
    },
    chaneTab(index) {
      // console.log(index, 'index');
      this.switchIndex = index;
      this.helpTipVisible = false
      if (index === 0) {
        this.openCase = !this.openCase
      }
      else if (index === 1) {
        this.opendig = !this.opendig
      }
      else if (index === 2) {
        this.openModel = !this.openModel
      }
      else {
        this.openKnow = !this.openKnow
      }
      this.tabList.map(val => {
        // val.class = 'animated fadeOut'
        val.show = false
      })
      this.tabList[index].class = 'animated fadeIn'
      this.tabList[index].show = true
    },
    updateState(newState) {
      this.opendig = newState
    },
    ModelState(newState) {
      this.openModel = newState
    },
    CaseState(newState) {
      this.openCase = newState
    },
    KnowState(newState) {
      this.openKnow = newState
    },
    // 弹窗管理
    changeVisible() {
      this.fileList = []
      this.dialogVisible = true
      this.helpTipVisible = false
    },
    closeDialog() {
      this.dialogVisible = false
    },
    // 文件上传处理方法
    handleRemove(file, fileList) {
      console.log(file, fileList, '456');
    },
    handlePreview(file) {
      console.log(file, '123');
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 文件上传前的处理方法
    handleChange(file) {
      // console.log(file.raw, 'file');
      this.upfilelist.push(file.raw);
      const isLt5M = file.size / 1024 / 1024 < 5; // 判断文件大小是否小于5MB
      if (!isLt5M) {
        this.$message.error('文件大小不能超过5MB');
      }
      return isLt5M;
    },
    // 提交上传文件
    submit() {
      // const formData = new FormData();
      // formData.append('file', this.raw);
      let file = {
        file: this.upfilelist,
        type: this.radio1,
      }
      if (this.formFlag || this.formNumber === 1) {
        // util.postFormData('/api/get_file', file)
        //   .then(response => {
        //     // 处理POST请求的响应
        //     if (response && response.code === 200) {
        //       // 请求成功的处理逻辑
        //       this.formFlag = response.code
        //       console.log(response, '上传成功');
        //       this.$message.success('上传成功')
        //       // this.$refs.upload.submit();
        //     } else {
        //       // 请求失败的处理逻辑
        //       this.$message.error('服务器错误')
        //     }
        //   })
        //   .catch(error => {
        //     // 处理POST请求的错误
        //     this.$message.error('POST请求错误')
        //     console.error('POST请求错误', error);
        //   });
      } else {
        this.$message.warning('数据处理中，请勿多次提交')
      }
      this.formNumber += 1
    },
    // 导出按钮
    exportbg() {
      let obj = JSON.parse(localStorage.getItem('area'))
      // console.log(obj, '导出按钮')
      const url = `/api/pdf_send?region=${obj.region}&district=${obj.district}&datetimes1=${obj.datetimes1}&site=${obj.site}&datetimes_start=${obj.datetimes_start}&datetimes_end=${obj.datetimes_end}`
      this.downloadFile(url, '报告.docx')
    },
    downloadFile(filePath, name) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = filePath
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    },

  },
  mounted() {
  },
  beforeDestroy() {
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/jiduan/daping_bgimg.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

  .returnHome {
    width: 100%;
    position: absolute;
    left: 2%;
    top: 2%;
    z-index: 999;

    a {
      text-decoration: none;
      background-color: rgba(25, 58, 115, .5);
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 1.8vh;
      transition: background-color 0.3s;
    }

    a:hover {
      background-color: #0073e6;
    }
  }

  .main_top {
    display: flex;

    .left {
      position: relative;
      padding: 0.1875rem 0 0 0.25rem;

      .right {
        position: absolute;
        color: #fff;
        display: flex;
        width: 34%;
        justify-content: space-around;
        right: 32vw;
        top: 6vw;
        z-index: 99;

        .tabs {
          width: 100%;
          position: relative;

          .tabitem {
            cursor: pointer;
            font-size: 1vmax;
            font-weight: bold;
            // margin-top: -0.8vmax;
            position: relative;
            width: 7.8vw;
            height: 2.8vw;
            border-radius: 1vw;
            z-index: 999;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
          }

          .bg {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 8.5vw;
            height: 2.7vw;
            z-index: 2;
            backdrop-filter: blur(24px);
            border-radius: 10px;
            overflow: hidden;
            // outline: 2px solid white;
          }

          .blob {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            width: 4.8vw;
            height: 1.7vw;
            border-radius: 50%;
            // background-color: #ff0000;
            background-color: rgb(7, 36, 252);
            opacity: 1;
            filter: blur(12px);
            animation: blob-bounce 5s infinite ease;
          }

          @keyframes blob-bounce {
            0% {
              transform: translate(-100%, -100%) translate3d(0, 0, 0);
            }

            25% {
              transform: translate(-100%, -100%) translate3d(100%, 0, 0);
            }

            50% {
              transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
            }

            75% {
              transform: translate(-100%, -100%) translate3d(0, 100%, 0);
            }

            100% {
              transform: translate(-100%, -100%) translate3d(0, 0, 0);
            }
          }

          .newImg {
            position: absolute;
            margin-top: -0.4vmax;
            z-index: 99;
            cursor: pointer;
            // right: 32%;
            right: 0;
            top: 11px;
          }

        }

        .iconfont {
          position: absolute;
          top: 29%;
          right: -11%;
          font-size: 1.3vw;
        }

        .iconfont:hover {
          color: rgba(0, 255, 255, 1);
        }


      }

      .ports {
        position: absolute;
        color: #fff;
        cursor: pointer;
        top: 0.5vw;
        right: 9vw;

        /deep/ .el-upload-dragger {
          background-color: rgba(32, 86, 131, 0.8);
          border-radius: 0.6vw;
          margin-left: -1.74vw;
          width: 18vw;
          height: 20vh;
        }

        /deep/ .el-upload-dragger .el-upload__text {
          color: #fff;
          font-size: 0.6vw;
        }

        /deep/ .el-upload-list__item {
          font-size: 0.8vw;
          // font-weight: bold;
          line-height: 1vw;
          background-color: rgba(32, 86, 131, 0.3);
          margin-left: -1.65vw;
          margin-top: 0.5vw;
          width: 18vw;
          border: 0.1vw solid #04f2f9;
        }

        /deep/ .el-icon-close {
          display: inline-block;
          color: #04f2f9;
          top: 0.1vw;
          right: 0.1vw;
        }


        /deep/ .el-upload-list__item-name [class^=el-icon] {
          color: #fff;
        }

        /deep/ .el-upload-list__item {
          color: #fff;
        }

        /deep/ .el-upload-list__item-name {
          color: #fff;
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

        /deep/.el-radio {
          margin-right: 1.2vw;
          color: #fff;
          background-color: rgba(32, 86, 131, 0.3);
        }

        /deep/ .el-radio__label {
          padding-left: -0.2vw;
          font-size: 0.8vw;
        }

        /deep/ .el-radio.is-bordered {
          padding: 0.6vw 0.6vw 0 0.6vw;
          border-radius: 0.6vw;
          font-size: 0.8vw;
          height: 4vh;
          // width: 8vw;
        }

        /deep/.el-radio.is-bordered.is-checked {
          border-color: #04f2f9;
        }


        /deep/.el-radio__input.is-checked+.el-radio__label {
          color: #04f2f9;
        }

        /deep/.el-radio__input.is-checked .el-radio__inner {
          background-color: #04f2f9;
          background: #04f2f9;
        }

        .newImg1 {
          position: absolute;
          margin-top: -0.33vmax;
          cursor: pointer;
          margin-left: -0.5vw;
        }
      }
    }
  }
}

.alltitle {
  font-size: 1.9vw;
  /* color: rgb(226 236 255 / 0%); */
  font-weight: bold;
  position: absolute;
  top: 13%;
  left: 40.5%;
  -webkit-text-stroke: 1px #413c47;
  -webkit-text-fill-color: #fff;
  animation: shine 2.4s infinite;
  /*设置动画*/
}

@keyframes shine {

  /*创建动画*/
  0%,
  100% {
    color: #fff;
    text-shadow: 0 0 10px #0000FF, 0 0 10px #0000FF;
  }

  50% {
    text-shadow: 0 0 10px #0000FF, 0 0 40px #0000FF;
  }
}
</style>