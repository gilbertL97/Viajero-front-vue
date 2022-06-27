<template>
    <div class="login-page">
        <div class="form">
            <div class="login-form">
                <img src="../../assets/imagenes/logogenerico.png" alt="" />
                <login-form-vue />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import loginFormVue from '@/modules/auth/components/form/loginForm.vue';
</script>

<style scoped>
    .login-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #ffffff;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form img {
        border: 0;
        padding-bottom: 15%;
    }

    .form .register-form {
        display: none;
    }
    .container {
        position: relative;
        z-index: 1;
        max-width: 300px;
        margin: 0 auto;
    }
    .container:before,
    .container:after {
        content: '';
        display: block;
        clear: both;
    }
    .container .info {
        margin: 50px auto;
        text-align: center;
    }
    .container .info h1 {
        margin: 0 0 15px;
        padding: 0;
        font-size: 36px;
        font-weight: 300;
        color: #1a1a1a;
    }
    .container .info span {
        color: #4d4d4d;
        font-size: 12px;
    }
    .container .info span a {
        color: #000000;
        text-decoration: none;
    }
    .container .info span .fa {
        color: #ef3b3a;
    }
    body {
        background: #0047b3; /* fallback for old browsers */
        background: rgb(0, 71, 179);
        background: linear-gradient(90deg, rgb(0, 71, 179) 0%, rgb(51, 133, 255) 50%);
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .error {
        margin: 1rem 0 0;
        color: #ef3b3a;
    }
</style>
