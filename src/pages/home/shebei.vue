<template>
  <div class="contain">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img width="100%" height="30%" src="../../assets/img/jiduan/devic1.png" alt="">
          <div>所属站点:1111</div>
          <div>运行状态:良好</div>
          <div>电机温度</div>
          <div>腔体温度</div>
          <div>感温探测</div>
          <div>蜂鸣器</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img width="100%" height="30%" src="../../assets/img/jiduan/devic2.png" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img width="100%" height="30%" src="../../assets/img/jiduan/devic3.png" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img width="100%" height="30%" src="../../assets/img/jiduan/devic4.png" alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  // min-height: 36px;
  height: 85vh;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
