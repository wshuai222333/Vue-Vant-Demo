<template>
  <!-- <van-cell-group>
    <van-nav-bar title="我的交易" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-row>
      <van-col class="van-row-title" span="2"><strong>订单号</strong></van-col>
      <van-col class="van-row-title" span="4"><strong>金额</strong></van-col>
      <van-col class="van-row-title" span="4"><strong>付款银行</strong></van-col>
      <van-col class="van-row-title" span="6"><strong>到账时间</strong></van-col>
      <van-col class="van-row-title" span="6"><strong>状态</strong></van-col>
    </van-row>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
   
      <van-row v-for="item in list" :key="item" :title="item + ''">
        <van-col span="2">123123123</van-col>
        <van-col span="6">6200</van-col>
        <van-col span="6">工商银行</van-col>
        <van-col span="10">2018-06-28</van-col>
         <van-col span="10">已完成</van-col>
      </van-row>
     
    </van-list>
  </van-cell-group> -->
  <van-cell-group>
    <van-nav-bar title="我的交易" left-arrow @click-left="onClickLeft"></van-nav-bar>
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