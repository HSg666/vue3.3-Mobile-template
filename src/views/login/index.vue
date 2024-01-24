<script lang="ts" setup name="login">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import $api from '@/service/webRequest'
import { APIs } from '@/service/apiList'
import AxiosRequestError from '@/service/error' // 引入自定义错误处理函数

import 'vant/es/toast/style'
import { showFailToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')
const isUsernameValid = ref(true)
const isPasswordValid = ref(true)

// 登录
const login = () => {
	if (!validateUsername() || !validatePassword()) {
		return
	}

	// 在这里用Ajax调用登录逻辑  调用示例
	const params = {
		username,
		password,
	}
	showFailToast('提示内容')

	$api.get(APIs.GET_SHOPLIST_PROD)
		.then(res => {
			console.log(res, 'res')
		})
		.catch((err: AxiosRequestError) => {
			console.dir(err, 'err')
		})

	// router.push('/')
	console.log('账号:', username.value)
	console.log('密码:', password.value)
}

const validateUsername = () => {
	const pattern = /^[a-zA-Z0-9]{6,16}$/
	isUsernameValid.value = pattern.test(username.value)
	return isUsernameValid.value
}
const validatePassword = () => {
	const pattern = /^[a-zA-Z0-9]{6,16}$/
	isPasswordValid.value = pattern.test(password.value)
	return isPasswordValid.value
}

onMounted(() => {})
</script>
<template>
	<div class="login-container">
		<div class="login-box">
			<h2>用户登录</h2>
			<form @submit.prevent="login">
				<div class="form-group">
					<label for="username">账号</label>
					<input id="username" v-model="username" type="text" />
					<span v-if="!isUsernameValid" class="error-message">账号格式不正确</span>
				</div>
				<div class="form-group">
					<label for="password">密码</label>
					<input id="password" v-model="password" type="password" />
					<span v-if="!isPasswordValid" class="error-message">密码格式不正确</span>
				</div>
				<button type="submit">登录</button>
			</form>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	// background-color: #0ec8e9;
	background: url('../../assets/images/loginbg.jpg') no-repeat;
	background-size: 100% 100vh;
}

.login-box {
	width: 500px;
	padding: 40px;
	background-color: rgba(236, 241, 245, 0.6);
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
	text-align: center;
	color: #333333;
	margin-bottom: 20px;
}

.form-group {
	margin-bottom: 10px;
}

label {
	display: block;
	color: #666666;
}

input[type='text'],
input[type='password'] {
	width: 100%;
	padding: 8px;
	border: 1px solid #dddddd;
	border-radius: 4px;
	font-size: 14px;
	color: #333333;
}

button[type='submit'] {
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 4px;
	background-color: #ff6600;
	color: #ffffff;
	font-size: 16px;
	cursor: pointer;
}

.error-message {
	color: red;
	font-size: 12px;
}
</style>
