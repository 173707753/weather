<template>
    <div>
        <div class="returnHome">
            <router-link to="/home"><i class="el-icon-back"></i><span
                    style="margin-left: 0.2vh;">返回</span></router-link>
        </div>
        <iframe src="unity/index.html" class="unityContainer" />
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {

    },
    mounted() {
    },
    beforeDestroy() {
    },
}
</script>

<style lang="scss" scoped>
.returnHome {
    width: 100%;
    position: absolute;
    left: 2%;
    top: 2%;
    z-index: 999;

    a {
        text-decoration: none;
        background-color: rgba(6, 42, 123, 0.6);
        color: #fff;
        border-radius: 1vh;
        padding: 0.5vh 1.2vh;
        font-size: 1.8vh;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    a:hover {
        background-color: rgb(23, 147, 252);
    }
}

.unityContainer {
    position: fixed;
    top: 1%;
    left: 1%;
    height: 98%;
    width: 98%;
    // margin-left: 50vw;
    // transform: translateX(-50%);
    // margin-top: 12vh;
    // width: 48vw;
    // height: 62vh;
}
</style>