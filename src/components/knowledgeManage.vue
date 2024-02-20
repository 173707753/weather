<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`方案管理`">
      <template slot="container">
        <div>
          <div class="image">
            <img src="../assets/img/home/bgimg2.png" alt="" style="width: 100%; height: 100%;">
            <!-- <el-image style="width: 100%; height: 250px" :src="url"></el-image> -->
          </div>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge" @click="openPDF">光伏发电原理</div>
            </el-col>
            <el-col :span="10">
              <div class="knowledge" @click="openPDF1">k-means聚类简介</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge" @click="openPDF2">极限学习(ELM)简介</div>
            </el-col>
            <el-col :span="10">
              <div class="knowledge" @click="openPDF3">遗传算法(GA)简介</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <div class="knowledge" @click="openPDF5">LSTM算法简介</div>
            </el-col>
            <el-col :span="10">
              <!-- <div class="knowledge" @click="openPDF4">鸟群算法(BSA)简介</div> -->
            </el-col>
          </el-row>
        </div>
      </template>
      <template slot="bottombtn">
        <el-button size="small" plain type="primary" @click="close">退出</el-button>
      </template>
    </Dialog>
    <!-- <el-dialog :visible.sync="pdfDialog" title="PDF文档">
      <object :data="pdfPath" type="application/pdf" width="100%" height="900">
      </object>
    </el-dialog> -->
  </div>
</template>
    
<script>
// import instance from '@/utils/http.js'
import Dialog from './dialog.vue'
export default {
  props: ["openKnow", 'switchIndex'],
  name: 'knowledgeManage',
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      pdfDialog: false,
      // url: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%96%B0%E8%83%BD%E6%BA%90%E5%8F%91%E7%94%B5%E7%9B%B8%E5%85%B3%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=14&spn=0&di=7264239678495129601&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2314305088%2C2304762929&os=1392040089%2C3155168026&simid=2314305088%2C2304762929&adpicid=0&lpn=0&ln=1834&fr=&fmq=1703731773387_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fimg-qn.51miz.com%2Fpreview%2Fphoto%2F00%2F01%2F51%2F59%2FP-1515958-279EE0C4.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bc84tz_z%26e3Bv54AzdH3Ff5-f7vwtAzdH3Fn0cdbb9AzdH3Fr_9AzdH3F&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDEsMiw2LDQsNSw3LDgsOQ%3D%3D&lid=8383625370048549445',
      // pdfUrl: "https://wenku.baidu.com/view/513f23df9fc3d5bbfd0a79563c1ec5da50e2d605.html?fr=income1-doc-search&_wkts_=1697425865026&wkQuery=%E5%85%89%E4%BC%8F%E5%8F%91%E7%94%B5%E5%8E%9F%E7%90%86&needWelcomeRecommand=1",
      pdfPath: '/pdf/Popg.pdf'
    }
  },
  mounted() {

  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    handleClose() {
      this.$emit('KnowState', !this.openKnow)
    },
    // openDialog() {
    //   console.log('ppp');
    //   this.pdfDialog = true;

    //   // window.location.href = "https://wenku.baidu.com/view/513f23df9fc3d5bbfd0a79563c1ec5da50e2d605.html?fr=income1-doc-search&_wkts_=1697425865026&wkQuery=%E5%85%89%E4%BC%8F%E5%8F%91%E7%94%B5%E5%8E%9F%E7%90%86&needWelcomeRecommand=1"
    // },
    openPDF() {
      // console.log(a, '这是什么');
      var newWindow = window.open("", "Popg");
      newWindow.document.write('<embed src="/pdf/光伏发电原理.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "光伏发电原理" }, 300);
    },
    openPDF1() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/k-means聚类简介.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "k-means聚类简介" }, 300);
    },
    openPDF2() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/极限学习(ELM)简介.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "极限学习(ELM)简介" }, 300);
    },
    openPDF3() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/遗传算法(GA)简介.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "遗传算法(GA)简介" }, 300);
    },
    openPDF4() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/鸟群算法(BSA)简介.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "鸟群算法(BSA)简介" }, 300);
    },
    openPDF5() {
      var newWindow = window.open("", "_blank");
      newWindow.document.write('<embed src="/pdf/LSTM算法简介.pdf" type="application/pdf" width="100%" height="100%" />');
      setTimeout(function () { newWindow.document.title = "LSTM算法简介" }, 300);
    },
    close() {
      this.dialogVisible = false
    }
    // openDialog() {
    // instance.get(`/api/mmdb/movie/v3/list/hot.json?ct=${"安平"}&ci=807&channelId=4`).then(res =>{
    //   console.log(res);
    // }
    // )
    // 使用axios加载外部PDF文件的URL
    // this.$axios.get('/api/view/513f23df9fc3d5bbfd0a79563c1ec5da50e2d605.html?fr=income1-doc-search&_wkts_=1697417117012&wkQuery=%E5%85%89%E4%BC%8F%E5%8F%91%E7%94%B5%E5%8E%9F%E7%90%86')
    //   .then(response => {
    //     console.log(response,'ppp');
    //     this.pdfUrl = response.data; // 设置加载的PDF URL
    //     this.dialogVisible = true; // 打开弹框
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // },

  },
  watch: {
    openKnow(newV, oldV) {
      if (this.switchIndex === 3) {
        console.log(newV, oldV);
        this.dialogVisible = this.openKnow
        if (!this.openKnow) {
          this.dialogVisible = true
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image {
  width: 100%;
  height: 13.02vw;
  margin-bottom: 1.04vw;
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

.close {
  width: 3.125vw;
  height: 1.5625vw;
  text-align: center;
  line-height: 1.5625vw;
  color: #fff;
  background-color: skyblue;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  float: right;
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

::v-deep .el-menu-item-group>ul {
  overflow: hidden;
}

::v-deep .el-input__inner {
  background-color: #fff0;
}
</style>
<style>
.el-select-dropdown {
  /* background-color: #fff0 !important; */
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

.el-input__inner {
  color: #fff;
}
</style>