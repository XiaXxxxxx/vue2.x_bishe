<template>
  <div class="login">
    <div class="login_box">

      <div class="title"><strong>电商比价系统</strong></div>

      <div class="form">
        <el-form label-position="right" :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="请输入账号">
              <i class="el-icon-user el-input__icon" size="22" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="param.password" @keyup.enter.native="submitForm()">
              <i class="el-icon-lock el-input__icon" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
            <span>还未拥有账户？<router-link to="/register">点击注册</router-link></span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      param: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods:{
    submitForm(){
      this.$refs.login.validate((valid) => {
        if(valid){
          this.loading = true;
          this.$api.userLogin(this.param).then(res=>{
            if(res.code===200 && res.data.token){
              sessionStorage.setItem('Jhzy-token',res.data.token)
              sessionStorage.setItem('Jhzy-username',this.param.username)
              this.$router.push('/System')
            }else {
              this.loading = false
              this.$alert(res.msg)
              res.msg==='密码错误' && (this.param.password="")
              res.msg==='未找到账户信息' && (this.param={username: "",password: ""})
            }
          })
        }else {
          this.$alert('账号或密码不能为空！')
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.login{
  position: relative;
  //width: 100vw;
  height: 100vh;
  //background: url('@assets/login_bg.jpg') no-repeat;
  //background-size: 100% 100%;

  .login_box{
    position: absolute;
    top: 30%;
    right: 20%;
    width: 400px;
    overflow: hidden;
    background-color: #c91919;
    border-radius: 5px;

    .title{
      margin: auto;
      width: 70%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      line-height: 35px;
      color: #333333;
      font-size: 26px;
      font-weight: 500;
      letter-spacing: 2px;
      strong {
        font: italic 1em Georgia, serif;
      }
    }
    .form{
      margin: auto;
      width: 70%;

      .login-btn button {
        width: 100%;
        height: 36px;
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 15px;
        letter-spacing: 10px;
      }
    }
  }
}
</style>