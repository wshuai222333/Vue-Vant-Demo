<template>

  <van-cell-group :border="show">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-field name='username' v-validate="'required|username'" v-model="username" label="用户名" icon="clear" placeholder="请输入6-20位英文+数字" @click-icon="username=''"></van-field>
    <span class="van-field-error" v-show="errors.has('username')">{{ errors.first('username')}}</span>
    <van-field name='userphone' v-validate="'required|phone'" v-model="userphone" label="手机号" icon="clear" placeholder="请输入手机号" @click-icon="userphone=''"></van-field>
    <span class="van-field-error" v-show="errors.has('userphone')">{{ errors.first('userphone')}}</span>
    <van-field name='userpwd' v-validate="'required|password'" v-model="userpwd" label="密码" placeholder="请输入6-16位英文+数字" icon="clear" @click-icon="userpwd=''" type="password" />
    <span class="van-field-error" v-show="errors.has('userpwd')">{{ errors.first('userpwd')}}</span>
    <van-field name='userpwd2' v-validate="'required|password2'" v-model="userpwd2" label="确认密码" placeholder="请输入确认密码" icon="clear" @click-icon="userpwd2=''" type="password" />
    <span class="van-field-error" v-show="errors.has('userpwd2')">{{ errors.first('userpwd2')}}</span>
    <van-button bottom-action class="card-btn" :loading="btnloding" @click="onSubmit">
      完成
    </van-button>

  </van-cell-group>

</template>

<script>
import Service from "./_common";
export default {
  data() {
    return {
      show: false,
      btnloding:false,
      username: "",
      userphone: "",
      userpwd: "",
      userpwd2: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("Login");
    },
    onSubmit() {
      this.btnloding=true;
      this.$validator.validateAll().then(result => {
        
        if (result) {
          this.$http
            .post(
              "/api/User/Registered",
              Service.Encrypt.DataEncryption({
                username: this.username,
                userphone: this.userphone,
                userpwd: this.userpwd
              })
            )
            .then(
              response => {
                if (
                  response.data &&
                  response.data != null &&
                  response.data != undefined &&
                  response.data.Status == 100
                ) {
                  if (response.data.Data > 0) {
                    this.$toast("注册成功！");
                    this.$router.push("Login");
                  } else {
                    this.$toast("注册失败！");
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
        } else {
          this.$toast("输入为空或格式错误！");
        }
      });
      this.btnloding=false;
    }
  }
};
</script>


<style scoped>
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
.van-field-error {
  color: #f44;
  font-size: 12px;
  text-align: left;
  padding-left: 29%;
  /* line-height: 24px; */
}
</style>