<template>
  <van-cell-group :border="show">
    <van-nav-bar title="我的二维码" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <div slot="title">提示
          <van-icon name="question" />
        </div>
        <span class="item-content">费率：单位为千分之一(‰),输入小数点后两位以内数字,例如：输入4或4.5或4.55,费率不能小于平台协议费率或大于10‰费率</span>
        <br/>
        <span class="item-content">手续费：单位为元,输入小数点后两位以内数字,例如：输入4或4.5或4.55</span>
      </van-collapse-item>
    </van-collapse>
    <van-field name='rate' v-validate="'required|numberaftertwo'" v-model="rate" label="二维码费率" placeholder="请输入小数点后两位以内数字" />
    <span class="van-field-error" v-show="errors.has('rate')">{{ errors.first('rate')}}</span>
    <van-field name='drawfee' v-validate="'required|numberaftertwo'" v-model="drawfee" label="二维码手续费" placeholder="请输入小数点后两位以内数字" />
    <span class="van-field-error" v-show="errors.has('drawfee')">{{ errors.first('drawfee')}}</span>
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
      rate: "5",
      drawfee: "1",
      activeNames: ["0"]
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
        this.$toast("费率不能大于10");
      } else if (this.rate < user.Rate) {
        this.$toast("费率不能小于协议费率");
      } else if (this.drawfee < user.DrawFee) {
        this.$toast("手续费不能小于协议手续费");
      } else {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$http
              .post(
                "/api/User/ModifyRate",
                Service.Encrypt.DataEncryption({
                  UserAccountId: user.UserAccountId,
                  UserRate: this.rate,
                  UserDrawFee:this.drawfee
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
      }
      this.btnloding = false;
    }
  },
  mounted() {
    let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
    
    this.rate = user.UserRate;
    this.drawfee = user.UserDrawFee;
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
.item-content {
  font-size: 13px;
  line-height: 1.5;
  color: #666;
}
.van-icon-question {
  color: #38f;
  vertical-align: -3px;
  margin-left: 5px;
  font-size: 15px;
}
</style>
