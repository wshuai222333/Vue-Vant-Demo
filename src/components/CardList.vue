<template>
  <van-cell-group>
    <van-nav-bar title="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="add-o" slot="right" />
    </van-nav-bar>
    <!-- <van-notice-bar text="每个用户最多绑定10张银行卡，删除银行卡请左滑卡片点击删除按钮。" mode="closeable" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" /> -->
    <!-- <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="immediatecheck">
            <van-row v-for="item in list" :key="item.TradeId" :title="item + ''"> -->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-row v-for="item in list" :key="item" :title="item + ''">
        <van-cell-swipe :right-width="65" :on-close="onClose(item)">
          <div class="card">
            <span class="card-forecast" v-text="item.BankName"></span>
            <span class="card-forecast-type" v-if="item.Type==0">信用卡</span>
            <span class="card-forecast-type" v-if="item.Type==1">储蓄卡</span>
            <span class="card-cardno">**** **** ****&nbsp;<span v-text="formatter(item.CardId)"></span></span>
          </div>
          <span slot="right">删除</span>
        </van-cell-swipe>

      </van-row>
    </van-list>
  </van-cell-group>
</template>


<script>
import { Dialog } from "vant";
import Service from "./_common";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      listcount: 0
    };
  },
  methods: {
    formatter(str) {
      return str.substr(str.length-4);
    },
    onClickLeft() {
      this.$router.push("User");
    },
    onClickRight() {
      if (this.listcount >= 10) {
        Dialog.alert({
          message: "银行卡不能大于十张。"
        }).then(() => {});
      } else {
        this.$router.push("AddCard");
      }
    },
    onLoad() {
      // setTimeout(() => {
      this.getBankCardList();
      this.loading = false;
      this.finished = true;
      // }
      // }, 500);
    },
    getBankCardList() {
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.$http
        .post(
          "/api/Trade/GetBankCardList",
          Service.Encrypt.DataEncryption({
            UserAccountId: user.UserAccountId
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
                this.listcount = response.data.Data.length;
                response.data.Data.forEach(element => {
                  this.list.push(element);
                });
              } else {
              }
            } else {
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    deleteBankCard(item) {
      this.$http
        .post(
          "/api/Trade/DeleteBankCard",
          Service.Encrypt.DataEncryption({
            BankCardId: item.BankCardId
          })
        )
        .then(
          response => {
            if (
              response.data &&
              response.data != null &&
              response.data != undefined
            ) {
              if (response.data.Status == 100 && response.data.Data > 0) {
                this.$toast("删除成功");
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
    },
    onClose(item) {
      return function(clickPosition, instance) {
        switch (clickPosition) {
          case "left":
          case "cell":
          case "outside":
            instance.close();
            break;
          case "right":
            Dialog.confirm({
              message: "确定删除吗？"
            }).then(() => {
              this.deleteBankCard(item);
              instance.close();
            });
            break;
        }
      };
    }
  }
};
</script>

<style lang="less">
.van-row {
  width: 84%;
  margin: 0 auto;
}
.card {
  background-color: #6495ed;
  height: 110px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 2%;
}
.card-forecast {
  color: #ffffff;
  display: flex;
  font-size: 15px;
  padding-top: 8%;
  padding-left: 10%;
}
.card-forecast-type {
  color: #ffffff;
  display: flex;
  font-size: 12px;
  padding-top: 1%;
  padding-left: 10%;
}
.card-cardno {
  color: #ffffff;
  display: flex;
  font-size: 23px;
  padding-top: 3%;
  padding-left: 10%;
}
.van-cell-swipe {
  &__left,
  &__right {
    color: #ffffff;
    font-size: 15px;
    width: 65px;
    height: 110px;
    display: inline-block;
    text-align: center;
    line-height: 90px;
    background-color: #f44;
  }
}
</style>

