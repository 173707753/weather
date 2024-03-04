<template>
    <div class="contain">
        <div class="contain_title">风险预警</div>
        <div class="contain_title">风险识别</div>
        <div class="contain_title">风险分级</div>
        <div class="contain_title">风险监视</div>
        <div class="contain_title">风险控制</div>
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
.contain {
    display: flex;
    justify-content: space-around;
    height: 85vh;
    border: 2px solid #ffa;
    border-radius: 2vh;
    box-shadow: 3px 12px 8px rgba(44, 55, 82, 0.2);

    .contain_title {
        width: 10vw;
        height: 8vh;
        font-size: 2vh;
        font-weight: bold;
        margin-top: 2vh;
        padding-top: 2vh;
        text-align: center;
        border-radius: 2vh;
        border: 2px solid rgb(153, 196, 248);
        box-shadow: 3px 12px 8px rgba(44, 55, 82, 0.2);
    }
}
</style>
