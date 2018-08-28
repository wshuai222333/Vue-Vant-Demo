<template>
    <van-cell-group :border="show">
        <van-nav-bar title="我的费率" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-field name='rate' v-validate="'required|numberaftertwo'" v-model="rate" label="二维码费率" placeholder="请输入小数点两位以内数字" />
        <span class="van-field-error" v-show="errors.has('rate')">{{ errors.first('rate')}}</span>
        <van-button bottom-action class="card-btn" :loading="btnloding" @click="onSubmit">
            提交
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
      rate: "5.00"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onSubmit() {
      this.btnloding = true;

      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      if (this.rate > 10) {
        this.$toast("费率不能大于10.00");
      }
      else if(this.rate<user.Rate){
        this.$toast("费率不能小于协议费率");
      }
       else {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$http
              .post(
                "/api/User/ModifyRate",
                Service.Encrypt.DataEncryption({
                  UserAccountId: user.UserAccountId,
                  UserRate: this.rate
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
                      this.$toast("费率修改成功");
                      this.$router.push("User");
                    } else {
                      this.$toast("费率修改失败");
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
  },
  mounted(){
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.rate = user.UserRate;
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
