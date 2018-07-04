<template>
    <van-cell-group>
        <van-nav-bar title="我的建议" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <label class="lable-title">您的建议</label>
        <van-field v-model="advice" type="textarea" placeholder="想跟我们说些什么呢" rows="6" autosize/>
        <van-button class="card-btn" bottom-action @click="onSubmit">提交</van-button>
    </van-cell-group>
</template>

<script>
import Service from "./_common";
export default {
  data() {
    return {
      advice: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onSubmit() {
      //获取缓存用户信息
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);

      this.$http
        .post(
          "/api/User/AddAdvice",
          Service.Encrypt.DataEncryption({
            UserAccountId: user.UserAccountId,
            AdviceContent: this.advice
          })
        )
        .then(
          response => {
            if (
              response.data &&
              response.data != null &&
              response.data != undefined
            ) {
              debugger;
              if (response.data.Status == 100 && response.data.Data > 0) {
                  this.$toast("提交成功");
                this.$router.push("User");
                
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

<style>
.van-field__control {
  border: solid 1px #38f;
}
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
.lable-title {
  padding-left: 14px;
}
</style>

