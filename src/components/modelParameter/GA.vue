<template>
  <div>
    <Dialog v-if="dialogVisible" :title="`GA-ELM参数配置`">
      <template slot="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="margin-top: 34px;
    margin-left: -10px;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="种群规模" prop="params1">
              <el-input v-model="form.params1" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交叉概率" prop="params2">
              <el-input v-model="form.params2" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12">
            <el-form-item label="变异概率" prop="params3">
              <el-input v-model="form.params3" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进化代数" prop="params4">
              <el-input v-model="form.params4" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12">
            <el-form-item label-width="140px" label="elm-隐藏节点数" prop="params5">
              <el-input v-model="form.params5" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="激活函数" prop="params6">
              <el-select v-model="form.params6" placeholder="请选择激活函数">
                <el-option v-for="(item, index) in funName" :key="item.value" :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      </template>
      <template slot="bottombtn">
        <el-button  plain type="primary"  size="small"  @click="resetForm">恢复默认值</el-button>
        <el-button size="small" type="primary" plain  @click="confirm">确定</el-button>
      </template>
    </Dialog>
  </div>
</template>
  
<script>
import Dialog from '../dialog.vue'
export default {
  name: 'GA',
  components: {
    Dialog,
  },
  props: { visiableParams3: Boolean },
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
    var validateparm1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (value < 20 || value > 100) {
        return callback(new Error('请输入合理的规模,一般为20-100'));
      } else {
        callback();
      }
    }
    var validateparm2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if ( value < 0.4 || value > 0.9) {
        return callback(new Error('请输入合理的交叉概率,一般为0.4-0.9'));
      } else {
        callback();
      }
    }
    var validateparm3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if ( value < 0.0001 || value > 0.1) {
        return callback(new Error('请输入合理的变异概率,一般为0.0001-0.1'));
      } else {
        callback();
      }
    }
    var validateparm4 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('参数不能为空'));
      } else if (value < 50 || value > 500) {
        return callback(new Error('请输入合理的进化代数,一般为50-100'));
      } else {
        callback();
      }
    }
    return {
      form: {
        params1: '20',
        params2: '0.5',
        params3: '0.01',
        params4: '50',
        params5: '20',
      },
      dialogVisible: false,
      rules: {
        params1: [{ trigger: 'blur', validator: validateparm1 }],
        params2: [{ trigger: 'blur', validator: validateparm2 }],
        params3: [{ trigger: 'blur', validator: validateparm3 }],
        params4: [{ trigger: 'blur', validator: validateparm4 }],
        params5: [{ trigger: 'blur', validator: validateNumber }],
        // params6: [{ required: true, message: '请输入激活函数', trigger: 'blur' }],
      },
      defaultFormData: {}
    }
  },
  mounted() {
    this.defaultFormData = { ...this.form }; // 将表单的默认值保存到 defaultFormData
  },
  watch: {
    visiableParams3(newV, oldV) {
      // console.log(newV, oldV);
      this.dialogVisible = this.visiableParams3
      if(!this.visiableParams3 ){this.dialogVisible=true}
    }
  },
  methods: {
    handleClose() {
      console.log(this.visiableParams3);
      this.dialogVisible = false
      this.$emit('childEvent3', false);
      console.log("关闭");
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$bus.$emit('gaData', this.form);
          this.dialogVisible = false
          this.$emit('childEvent3', false);
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
  