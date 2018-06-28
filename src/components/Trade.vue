<template>
  <van-cell-group>
    <van-nav-bar title="我的交易" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-row>
      <van-col span="2"><strong>序号</strong></van-col>
      <van-col span="6"><strong>金额</strong></van-col>
      <van-col span="6"><strong>收款银行</strong></van-col>
      <van-col span="10"><strong>到账时间</strong></van-col>
    </van-row>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item + ''"> -->
      <van-row v-for="item in list" :key="item" :title="item + ''">
        <van-col span="2" v-text="item"></van-col>
        <van-col span="6">6200.00</van-col>
        <van-col span="6">工商银行</van-col>
        <van-col span="10">2018-06-28 08:24:26</van-col>
      </van-row>
      <!-- </van-cell> -->
    </van-list>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 200) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.van-col {
  /* color: #fff; */
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  /* margin-bottom: 10px;
  background-clip: content-box; */
}
</style>