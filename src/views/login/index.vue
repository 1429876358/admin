<template>
  <div ref="contaniner" class="login-container">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.account" clearable placeholder="请输入用户名" @focus="focusField(1)" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" clearable placeholder="请输入密码" type="password" @focus="focusField(2)" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { removeToken } from '@/utils/auth'
// import { login } from '../../api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: { account: '330100', password: '000000' },
      loading: false,
      redirect: undefined,
      v_focus: '',
      otherQuery: {},
      clientHeight: 0
    }
  },
  mounted() {
    var that = this
    this.getViewPortHeight()
    window.onresize = function() {
      setInterval(function() { that.getViewPortHeight() }, 100)
    }
  },
  methods: {
    getViewPortHeight() {
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.$refs.contaniner.style.height = this.clientHeight + 'px'
    },
    focusField(v) {
      this.v_focus = v
    },
    handleLogin() {
      if (this.loginForm.account === '') {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return false
      }
      if (this.loginForm.password === '') {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return false
      }
      removeToken()
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$message({
          message: '登录成功, 正在跳转页面',
          type: 'success'
        })
        this.$router.push({ path: '/homepage' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  position: relative;
  background-color: #0d2038;
  .el-form{
    width: 400px;
    left: 50%;
    margin-left: -200px;
    position: absolute;
    top: 35%;
     .el-form-item{
    .el-form-item__label{
      color: #fff!important;
      font-size: 16px;
    }
  }
  }
}
</style>
<style lang="scss" >
.login-container{
  .el-form{
    .el-form-item{
    .el-form-item__label{
      color: #fff!important;
      font-size: 16px;
    }
  }
  }
}

</style>
