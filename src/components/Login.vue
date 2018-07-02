<template>
  <div class="login">
    <div class="welcome">
      <img src="../assets/images/welcome.png">
    </div>
    <div class="login-form">
      <div class="login-inp">
        <label>用户名</label><input type="text" v-model="username" placeholder="用户名/手机号"></div>
      <div class="login-inp">
        <label>密码</label><input type="password" v-model="userpwd" placeholder="密码"></div>
      <div class="login-inp">
        <a @click="OnLogin">立即登录</a>
      </div>
    </div>
    <div class="login-txt">
      <a @click="OnClickRed">立即注册</a>|
      <!-- <a href="#">忘记密码？</a> -->
    </div>
  </div>
</template>

<script>
import Service from "./_common";
export default {
  data() {
    return {
      username: "",
      userpwd: ""
    };
  },
  methods: {
    OnClickRed() {
      this.$router.push("Registered");
    },
    OnLogin() {
      if (this.username === "" || this.userpwd === "") {
        this.$toast("用户名或密码不能为空！");
        return;
      }

      this.$http
        .post(
          "/api/User/UserLogin",
          Service.Encrypt.DataEncryption({
            username: this.username,
            userpwd: this.userpwd
          })
        )
        .then(
          response => {
            if (
              response.data &&
              response.data != null &&
              response.data != undefined
            ) {
              if (response.data.Status == 100) {
                response.data.Data.userPwd = null;
                Service.Util.SetLocalStorage(Service.Enum.CGT_ALI_USER, "");
                Service.Util.SetLocalStorage(
                  Service.Enum.CGT_ALI_USER,
                  JSON.stringify(response.data.Data)
                );
                this.$toast("登录成功！");
                setTimeout(() => {
                  window.location.href = "/";
                }, 1500);
              } else {
                this.$toast(response.data.Message);
              }
            } else {
              this.$toast(response.data.Message);
            }
          },
          error => {
            this.$toast("请求失败！");
            console.log(error);
          }
        );
    }
  }
};
</script>


<style scoped>
html,
body,
div,
p,
form,
label,
ul,
li,
dl,
dt,
dd,
ol,
img,
button,
b,
em,
strong,
small,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  font-style: normal;
}
body {
  font-family: SimHei, "Helvetica Neue", Arial, "Droid Sans", sans-serif;
  font-size: 14px;
  color: #333;
  background: #f2f2f2;
}
a,
a.link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
}
a,
a.link:hover {
  color: #666;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

.login {
  width: 100%;
  height: 100%;
  background: url(../assets/images/login-bg.png) no-repeat;
  background-size: cover;
  position: fixed;
  z-index: -10;
}
.welcome {
  width: 100%;
  margin: 25% 0;
}
.welcome img {
  width: 100%;
}
.login-inp {
  margin: 0 30px 15px 30px;
  border: 1px solid #fff;
  border-radius: 25px;
}
.login-inp label {
  width: 4em;
  text-align: center;
  display: inline-block;
  color: #fff;
}
.login-inp input {
  line-height: 40px;
  color: #fff;
  background-color: transparent;
  border: none;
  outline: none;
}
.login-inp a {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 5px;
}
.login-txt {
  text-align: center;
  color: #fff;
}
.login-txt a {
  color: #fff;
  padding: 0 5px;
}
</style>
