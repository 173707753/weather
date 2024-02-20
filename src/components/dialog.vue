<template>
  <div class="dialog" @click.self="closeDialog">
    <div class="dialog_body">
      <p class="closeicon" @click="closeDialog">
        <i style="color: #fff;font-size: 20px;" class="el-icon-circle-close"></i>
      </p>
      <div class="dialog_title">
        {{ title }}
      </div>
      <div>
        <slot name="container"></slot>
      </div>
      <div class="bottombtn">
        <slot name="bottombtn"></slot>
      </div>
      <div>
        <slot name="imports"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {

    }
  },
  methods: {
    closeDialog() {
      this.$parent.closeDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  background: #333333db;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog_body {
  position: relative;
  // background-color: rgba(0, 25, 47, 0.8);
  background: url(../assets/img/home/bg_new.jpg) no-repeat center center / cover;
  width: 30vw;
  height: 70vh;
  border: 3px solid #4187B3;
  border-radius: 6px;
  padding: 0px 20px;
  margin-top: 3%;
  margin-left: 1%;
  animation: moveDown 0.5s forwards;
  /* 添加动画效果 */

  .dialog_title {
    margin: 20px 0px;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    padding-bottom: 20px;
    border-bottom: 1px solid #4a9ccf;
  }

  .closeicon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .bottombtn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}

@keyframes moveDown {
  0% {
    transform: translateY(-100%);
    /* 初始位置在上方，向上偏移 100% */
  }

  100% {
    transform: translateY(0);
    /* 最终位置在原始位置，不再偏移 */
  }
}
</style>