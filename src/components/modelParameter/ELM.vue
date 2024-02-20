<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`ELM参数配置`">
      <template slot="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="margin-top: 34px">

          <el-form-item label="隐含层节点数" prop="pointCount">
            <el-input v-model="form.pointCount" placeholder="请输入节点数" :style="{ width: '47%' }"></el-input>
          </el-form-item>

          <!-- <el-form-item label="激活函数" prop="funName">
            <el-select v-model="form.funName" placeholder="请选择激活函数">
              <el-option v-for="(item) in funName" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>

      </template>
      <template slot="bottombtn">
        <el-button  plain type="primary" size="small"  @click="resetForm">恢复默认值</el-button>
        <el-button size="small" type="primary"  plain  @click="confirm">确定</el-button>
      </template>
    </Dialog>
  </div>
</template>
  
<script>
import Dialog from '../dialog.vue'
export default {
  name: 'ELM',
  props: {
    visiableParams1: Boolean
  },
  components: {
    Dialog,
  },
  data() {
    return {
      form: {
        pointCount: '50',
        // funName: '1',
      },
      // funName: [{
      //   value: '1',
      //   label: 'sig'
      // },
      // {
      //   value: '2',
      //   label: 'hhh'
      // },
      // {
      //   value: '3',
      //   label: 'aaa'
      // }],
      dialogVisible: false,
      rules: {
        pointCount: [{ required: true, message: '请输入参数', trigger: 'blur' }],
        funName: [{ required: true, message: '请选择激活函数', trigger: 'change' }]
      },
      defaultFormData: {},
      //ELM模型数据
      elmData: [
        {
          actualPower: '',
          date: '',
          time: '5:15:00',
          predictiveGeneration: '0',
          realGeneration: '0.00',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '6.4',
          relativeIrradiation: '80.7',
          airPressure: '1013.6'
        },
        {
          actualPower: '',
          date: '',
          time: '5:30:00',
          predictiveGeneration: '0',
          realGeneration: '0.04',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '6.2',
          relativeIrradiation: '81',
          airPressure: '1013.9'
        },
        {
          actualPower: '',
          date: '',
          time: '5:45:00',
          predictiveGeneration: '0',
          realGeneration: '0.05',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '6.1',
          relativeIrradiation: '81.1',
          airPressure: '1014.1'
        },
        {
          actualPower: '',
          date: '',
          time: '6:00:00',
          predictiveGeneration: '0',
          realGeneration: '0.09',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '5.7',
          relativeIrradiation: '81.4',
          airPressure: '1014.3'
        },
        {
          actualPower: '',
          date: '',
          time: '6:15:00',
          predictiveGeneration: '0',
          realGeneration: '0.08',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '5.5',
          relativeIrradiation: '81.2',
          airPressure: '1014.3'
        },
        {
          actualPower: '',
          date: '',
          time: '6:30:00',
          predictiveGeneration: '0',
          realGeneration: '0.08',
          totalIrradiation: '0',
          directIrradiation: '0',
          diffuseIrradiance: '0',
          temperature: '5.6',
          relativeIrradiation: '81.2',
          airPressure: '1014.5'
        },
        {
          actualPower: '',
          date: '',
          time: '6:45:00',
          predictiveGeneration: '0',
          realGeneration: '0.58',
          totalIrradiation: '4',
          directIrradiation: '8',
          diffuseIrradiance: '3',
          temperature: '5.6',
          relativeIrradiation: '80.8',
          airPressure: '1014.8'
        },
        {
          actualPower: '',
          date: '',
          time: '7:00:00',
          predictiveGeneration: '0',
          realGeneration: '0.68',
          totalIrradiation: '23',
          directIrradiation: '25',
          diffuseIrradiance: '16',
          temperature: '5.6',
          relativeIrradiation: '80.8',
          airPressure: '1015'
        },
      ]
    }
  },
  mounted() {
    this.defaultFormData = { ...this.form }; // 将表单的默认值保存到 defaultFormData
  },
  watch: {
    visiableParams1(newV, oldV) {
      // console.log(oldV, newV);
      this.dialogVisible = this.visiableParams1
      if(!this.visiableParams1 ){this.dialogVisible=true}
    },
  },
  methods: {
    handleClose() {
      console.log(this.visiableParams1);
      this.dialogVisible = false
      // 触发自定义事件 childEvent 并传递数据
      this.$emit('childEvent1', false);
      console.log("关闭");
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$bus.$emit('elmData', this.form);
          this.dialogVisible = false
          this.$emit('childEvent1', false);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.$bus.$emit('ELM', this.elmData);
      // this.dialogVisible = false
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    closeDialog() {
      this.dialogVisible = false
    }
  },
};
</script>
  