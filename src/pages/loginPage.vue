<template>
    <div>
        <input type = "email" v-model="inputEmail" placeholder="이메일 입력">
    </div>
    <div>
        <input type = "password" v-model="inputPassword" placeholder="비밀번호 입력">
    </div>
    <div>
        <button @click="sendLoginRequestWithInput">로그인</button>
    </div>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { sendLoginRequest } from '../services/loginService'

const inputEmail = ref('');
const inputPassword = ref('');

const LoginRequest = () => {
    return {
        email : inputEmail.value,
        password : inputPassword.value
    }
}

const sendLoginRequestWithInput = () => {
    sendLoginRequest(LoginRequest()).then(
        response => {
            const access = response.headers['access'];
            if (access) {
                localStorage.setItem('accessToken', access);
                console.log(access);
            }
            console.log(access);
        }
    )
} 
</script>

<style>

</style>