<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`LSTM参数配置`">
      <template slot="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="margin-top: 34px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="损失函数" prop="params1">
                <el-select v-model="form.params1" placeholder="请选择" :style="{ width: '80%' }">
                  <el-option v-for="(item, index) in loseFun" :key="item.value" :value="item.label"
                    :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优化器" prop="params2">
                <el-select v-model="form.params2" placeholder="请选择优化器" :style="{ width: '80%' }">
                  <el-option v-for="(item, index) in bestModel" :key="item.value" :value="item.label"
                    :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学习率调节器" prop="params3">
                <el-select v-model="form.params3" placeholder="请选择学习率调节器" :style="{ width: '80%' }">
                  <el-option v-for="(item, index) in studyModel" :key="item.value" :value="item.label"
                    :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滑动窗⼝⼤⼩" prop="params4">
                <el-select v-model="form.params4" placeholder="请选择滑动窗⼝⼤⼩" :style="{ width: '80%' }">
                  <el-option v-for="(item, index) in windowSize" :key="item.value" :value="item.label"
                    :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐藏层节点数" prop="params5">
                <el-input v-model="form.params5" placeholder="" :style="{ width: '80%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="lstm 层数" prop="params6">
                <el-input v-model="form.params6" placeholder="" :style="{ width: '80%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="训练次数" prop="params7">
                <el-input v-model="form.params7" placeholder="" :style="{ width: '80%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="batch⼤⼩" prop="params8">
                <el-input v-model="form.params8" placeholder="" :style="{ width: '80%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="学习率" prop="params9">
                <el-input v-model="form.params9" placeholder="" :style="{ width: '80%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="bottombtn">
        <el-button size="small" plain type="primary" @click="resetForm">恢复默认值</el-button>
        <el-button size="small" plain type="primary" @click="confirm">确定</el-button>
      </template>
    </Dialog>
  </div>
</template>
  
<script>
import Dialog from '../dialog.vue'
export default {
  name: 'BSA',
  components: {
    Dialog,
  },
  props: {
    visiableParams2: Boolean
  },
  data() {
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (isNaN(Number(value))) {
        return callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    }
    var validatelstm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (value > 4) {
        return callback(new Error('请输入4以内的数字'));
      } else {
        callback();
      }
    }
    var validatemuch = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (value < 150) {
        return callback(new Error('请输入大于150的数字'));
      } else {
        callback();
      }
    }
    var validatebatch = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (value % 8 !== 0) {
        return callback(new Error('请输入8的倍数'));
      } else {
        callback();
      }
    }
    return {
      form: {
        params1: 'false',
        params2: 'adam',
        params3: 'poly',
        params4: '7',
        params5: '200',
        params6: '2',
        params7: '200',
        params8: '16',
        params9: '0.0001',
      },
      loseFun: [{
        value: '1',
        label: 'false'
      },
      {
        value: '2',
        label: 'true'
      }],
      studyModel: [{
        value: '1',
        label: 'poly'
      },
      {
        value: '2',
        label: 'step'
      },
      {
        value: '3',
        label: 'cos'
      }],
      bestModel: [{
        value: '2',
        label: 'sgd'
      },
      {
        value: '1',
        label: 'adam'
      }],
      windowSize: [{
        value: '1',
        label: '7'
      },
      {
        value: '2',
        label: '9'
      },
      {
        value: '3',
        label: '11'
      }],
      dialogVisible: false,
      defaultFormData: {},
      rules: {
        params1: [{ required: true, message: '请输入是否损失', trigger: 'blur' }],
        params2: [{ required: true, message: '请输入优化器', trigger: 'blur' }],
        params3: [{ required: true, message: '请输入学习率调节器', trigger: 'blur' }],
        params4: [{ required: true, message: '请输入滑动窗口大小', trigger: 'blur' }],
        params5: [{ trigger: 'blur', validator: validateNumber }],
        params6: [{ trigger: 'blur', validator: validatelstm }],
        params7: [{ trigger: 'blur', validator: validatemuch }],
        params8: [{ trigger: 'blur', validator: validatebatch }],
        params9: [{ trigger: 'blur', validator: validateNumber }],
      },
    }
  },
  mounted() {
    this.defaultFormData = { ...this.form }; // 将表单的默认值保存到 defaultFormData
  },
  watch: {
    visiableParams2(newV, oldV) {
      // console.log(oldV, newV);
      this.dialogVisible = this.visiableParams2
      if (!this.visiableParams2) { this.dialogVisible = true }
    },
  },
  methods: {
    handleClose() {
      console.log(this.visiableParams1);
      this.dialogVisible = false
      this.$emit('childEvent2', false);
      console.log("关闭");
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$bus.$emit('bsaData', this.form);
          this.dialogVisible = false
          this.$bus.$emit('childEvent2', false);
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm() {
      this.form = { ...this.defaultFormData };
    },
    closeDialog() {
      this.dialogVisible = false
    }
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep .el-input__inner{
//   width: 136px;
// }
</style>
  