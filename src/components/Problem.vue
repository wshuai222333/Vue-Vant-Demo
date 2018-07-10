<template>
  <van-cell-group :border="show">
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="immediatecheck">
      <van-row v-for="item in list" :key="item.TradeId" :title="item + ''">
        <van-cell :border="border" :title="item.Title" class="home-item" is-link :to="{name:'problemDetail',params:{ProblemId:item.ProblemId}}">
        </van-cell>
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
      border: false,
      center: true,
      error: true,
      loading: false,
      finished: false,
      immediatecheck: true,
      list: [],
      index: 1,
      listcount: 6
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("Home");
    },
    onLoad() {
      setTimeout(() => {
        //添加交易请求
        this.$http
          .post(
            "/api/User/GetProblemList",
            Service.Encrypt.DataEncryption({
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
.home-item {
  font-size: 16px;
}
</style>
