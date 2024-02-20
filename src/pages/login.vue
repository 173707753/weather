<template>
    <div class="login">
        <div class="bg_login_new">
            <p>极端天气集成系统</p>
        </div>
        <div class="login_form">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent>
                        <el-form-item label="" prop="account" class="elItem">
                            <el-input type="text" autocomplete="off" v-model="loginForm.account"
                                prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input type="password" autocomplete="off" v-model="loginForm.password"
                                prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="goToLogin" native-type="submit">登录</el-button>
                            <!-- <el-button @click="resetLoginForm">重置</el-button> -->
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <register></register>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
 
<script>
//引入注册组件
import register from '@/pages/register.vue';
export default {
    data() {
        var validateAccount = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("账号不能为空"));
            } else if (value === "admin") {
                callback();
            } else {
                callback(new Error("请输入正确的用户名"));
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value === "123456") {
                callback();
            } else {
                callback(new Error("请输入正确的密码"));
            }
        };
        return {
            loginForm: {
                account: "admin",
                password: "123456",
            },
            activeName: 'first',//默认显示登录页面
            rules: {
                account: [
                    {
                        validator: validateAccount,
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        validator: validatePassword,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        //固定的账户密码判断实现简单的登录跳转功能，只能测试用
        goToLogin() {
            this.$refs["loginForm"].validate((valid) => {
                if (valid) {
                    if (
                        this.loginForm.account != "admin" ||
                        this.loginForm.password != "123456"
                    ) {
                        this.$message.error("账号密码不正确");
                        return false;
                    } else {
                        this.$message({ message: "登陆成功", type: "success" });
                        this.$router.push("/home");
                    }
                } else {
                    this.$message.error("登陆失败");
                    return false;
                }
            });
        },
        resetLoginForm() {
            this.$refs["loginForm"].resetFields();
        },
        handleClick() { }
    },
    components: {
        register
    }
};
</script>
 
<style lang='scss' scoped>
.login {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/jiduan/daping_bgimg.jpg');
    background-size: 100% auto;
    background-position: center center;
    overflow: auto;
    position: relative;

    .bg_login_new {
        width: 25vw;
        height: 40vh;
        position: absolute;
        left: 27.5vw;
        top: 20vh;
        padding: 0.52vw;
        border-radius: 0.78125vw 0 0 0.78125vw;
        box-shadow: 0 0 1.302vw #f885ff;
        background-image: url('../assets//img/home/bg_login_new.jpg');
        background-size: 100% auto;
        background-position: center center;

        p {
            font-size: 4vh;
            margin-top: 6.8vh;
            text-align: center;
            color: #f885ff;
            font-weight: 600;
            z-index: 999;
        }
    }

    .login_form {
        width: 20vw;
        height: 40vh;
        position: absolute;
        left: 52.5vw;
        top: 20vh;
        padding: 0.52vw;
        background: #fff;
        border-radius: 0 0.78125vw 0.78125vw 0;
        box-shadow: 0 0 1.302vw #f885ff;

        /deep/.el-tabs__header {
            margin-top: 10%;
            margin-left: 38%;
            // width: 30%;
        }

        /deep/.el-tabs__active-bar {
            width: 2.5vw !important;
            height: 3px;
            margin-left: -0.3vw;
        }

        /deep/ .el-tabs__nav-wrap {
            padding-left: 20%;
            margin-left: -20%;
        }

        /deep/.el-tabs__nav-scroll {
            padding-left: 20%;
            margin-left: -20%;
        }

        /deep/ .el-tabs__nav-wrap::after {
            position: static !important;
        }

        /deep/.el-input__icon {
            margin-left: 2.1vw;
        }

        /deep/[class*=" el-icon-"],
        [class^=el-icon-] {
            font-size: 1.6vh;
            color: #f885ff;
        }

        /deep/.el-tabs__item {
            font-size: 1.8vh;
        }

        /deep/.el-form {
            margin-top: 2vh;
        }

        /deep/.el-form-item {
            margin-top: 2vh;
        }

        /deep/.el-input--prefix .el-input__inner {
            padding-left: 1.5vw;
            font-size: 1.2vh;
        }

        /deep/.el-input__inner {
            margin-left: 10%;
            width: 80%;
            border-radius: 0.78125vw;
        }

        /deep/.el-button--primary {
            margin-left: 10%;
            font-size: 1.2vh;
            width: 80%;
            border-radius: 0.78125vw;
        }
    }

}
</style>