<template>
  <van-cell-group>
    <van-nav-bar title="交易" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-notice-bar text="由于交易数据量过大,会定期清除未完成订单数据,请谅解." mode="closeable" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="immediatecheck">
      <van-row v-for="item in list" :key="item.TradeId" :title="item + ''">
        <van-card :title="'订单号:'+item.TradeOrderId" :desc="item.BankName" :price="item.Amount">
          <div slot="footer">
            <span class="van-row-title" v-if="item.State==0">未完成</span>
            <span class="van-row-title" v-if="item.State==1">已完成</span>
            <span class="van-row-title" v-if="item.State==2">交易失败</span>
            <span class="van-row-title" v-text="item.CreateTime"></span>
          </div>
        </van-card>
      </van-row>
    </van-list>
  </van-cell-group>
</template>

<script>
import Service from "./_common";
export default {
  data() {
    return {
      show: false,
      list: [],
      loading: false,
      finished: false,
      index: 1,
      listcount: 6,
      immediatecheck: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onLoad() {
      setTimeout(() => {
        //获取缓存用户信息
        let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);

        this.$http
          .post(
            "/api/Trade/GetTradeList",
            Service.Encrypt.DataEncryption({
              UserAccountId: user.UserAccountId,
              State: -1,
              pageindex: this.index,
              pagesize: 10
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
                  this.listcount = response.data.Data.TotalItems;
                  debugger;
                  response.data.Data.Items.forEach(element => {
                    this.list.push(element);
                  });

                  this.index++;
                } else {
                }
              } else {
              }
            },
            error => {
              console.log(error);
            }
          );

        this.loading = false;

        if (this.list.length >= this.listcount) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.van-card {
  padding: 20px 20px 18px 20px;
  font-size: 13px;
}
.van-row-title {
  color: #c7c7c7;
}
.van-col {
  /* color: #fff; */
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  /* margin-bottom: 10px;
  background-clip: content-box; */
}
</style>