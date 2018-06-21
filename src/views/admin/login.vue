<template>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-input v-model="ruleForm.captcha" auto-complete="off" placeholder="验证码" @keyup.enter.native="handleSubmit">
              </el-input>
            </el-col>
            <el-col :span="5" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
</template>

<script>
import util from '../../assets/js/util';
import {login, getCaptchaUrl } from '../../api/api';
import md5 from 'js-md5';

export default {
  name: 'Login',
  data(){
  	return {
      logining: false,
      ruleForm: {
        username: '',
        password: '',
        uuid: '',
        captcha:'',
      },
      rules: {
        username: [{required: true, message: "用户名不能为空", trigger: 'blur' }],
        password: [{required: true, message: "密码不能为空", trigger: 'blur' }],
        captcha: [{required: true, message: "验证码不能为空", trigger: 'blur' }],
      },
      captchaPath:'',
  	}
  },
  mounted() {
    this.getCaptcha();
  },
  methods:{
    // 获取验证码
    getCaptcha () {
      this.ruleForm.uuid = util.getUUID();
      this.captchaPath =  getCaptchaUrl(this.ruleForm.uuid);
    },

    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          let param = {
            userName: this.ruleForm.username,
            password: md5(this.ruleForm.password),
            uuid: this.ruleForm.uuid,
            captcha: this.ruleForm.captcha
          };
          login(param).then(data => {
              this.logining = false;
              if (data.code === 1){
                if (data.data) {
                  sessionStorage.setItem('user', JSON.stringify(data.data));
                  this.$router.push({path: '/index'});
                }
              }
              this.getCaptcha();
            }
            ,() => { this.logining = false; });
        } else {
          return false;
        }
      });
    }


  }
}
</script>


<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .hint {
      text-align: center;
      font-size: smaller;
      color: #909399;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
