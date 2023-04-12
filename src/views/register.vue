<template>
<div class="register">
  <div class="register_box">
    <div class="title"><strong>注册页面</strong></div>

    <div class="form">
      <el-form label-position="right" :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入账号">
            <i class="el-icon-user el-input__icon" size="22" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="param.password">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" v-model="param.nickname">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" v-model="param.email">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="Phone">
          <el-input placeholder="请输入电话" v-model="param.Phone">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input placeholder="请输入地址" v-model="param.address" @keyup.enter.native="submitForm()">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" :loading="loading">清空</el-button>
          <el-button type="primary" @click="submitForm()" :loading="loading">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "register",
  data(){
    return{
      param: {
        username: "",
        password: "",
        nickname:"",
        email:"",
        Phone:"",
        address:""
      },
      loading: false,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        Phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
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
.register{
  position: relative;
  width: 100%;
  height: 100vh;

  .register_box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    height: 500px;
    background-color: red;
    border-radius: 5px;

    .form{
      margin: 20px auto 0;
      width: 70%;
    }
  }
}
</style>