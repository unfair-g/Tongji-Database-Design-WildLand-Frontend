<template>
    <div class="welcome">
        <div class="logo">WildLand</div>
        <div class="buttons">
        
            <el-button class="loginbutton" type="primary" color="#1D5B5E" size="large" @click="toLoginPage">登录</el-button>
            <el-button class="enrollbutton" type="primary" color="#308588" size="large" @click="toEnrollmentPage">注册</el-button>
        </div>
    </div>
</template>

<script>

export default {
    
    methods:
    {
        toLoginPage() {
            this.$router.push({
                path: '/enter/login'
            })
        },
        toEnrollmentPage() {
            this.$router.push({
                path: '/enter/enrollment'
            })
        }
    }
}

</script>

<style scoped>
    .welcome{
        position:fixed;
        animation:fadeIn ease 3s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        top: 35%;
        left:10%;
    }

    .logo{
        position:relative;
        color:#1D5B5E;
        font-size:150px;
        font-family: 'LOGO',sans-serif !important;
    }

    .buttons{
        margin-top: 10%;
        display: flex;
    }
    
    .loginbutton{
        margin-top: auto;
        margin-left: auto;
        margin-right: auto;
        width:calc(280vw * 80 / 1920);
        height:calc(200vw * 30 / 1920);
        font-size: calc(200vw * 13 / 1920);
    }

    .enrollbutton{
        margin-top: auto;
        margin-left: auto;
        margin-right: auto;
        width:calc(280vw * 80 / 1920);
        height:calc(200vw * 30 / 1920);
        font-size: calc(200vw * 13 / 1920);
    }

    @keyframes fadeIn{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>