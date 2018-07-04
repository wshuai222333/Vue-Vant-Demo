<template>
    <van-cell-group :border="show">
        <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-field name='olduserpwd' v-validate="'required|password'" v-model="olduserpwd" label="旧密码" placeholder="请输入6-16位英文+数字" icon="clear" @click-icon="userpwd=''" type="password" />
        <span class="van-field-error" v-show="errors.has('olduserpwd')">{{ errors.first('olduserpwd')}}</span>
        <van-field name='userpwd' v-validate="'required|password'" v-model="userpwd" label="新密码" placeholder="请输入6-16位英文+数字" icon="clear" @click-icon="userpwd=''" type="password" />
        <span class="van-field-error" v-show="errors.has('userpwd')">{{ errors.first('userpwd')}}</span>
        <van-field name='userpwd2' v-validate="'required|password2'" v-model="userpwd2" label="确认新密码" placeholder="请输入确认新密码" icon="clear" @click-icon="userpwd2=''" type="password" />
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
      btnloding: false,
      olduserpwd: "",
      userpwd: "",
      userpwd2: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onSubmit() {
      
      this.btnloding = true;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$http
            .post(
              "/api/User/UserPassword",
              Service.Encrypt.DataEncryption({
                olduserpwd: this.olduserpwd,
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
                    this.$toast("密码修改成功");
                    this.$router.push("User");
                  } else {
                    this.$toast("密码修改失败");
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
      this.btnloding = false;
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