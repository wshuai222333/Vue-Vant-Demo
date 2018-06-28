<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home" to="../Home">首页</van-tabbar-item>
    <!-- <van-tabbar-item icon="balance-details" to="../Collection">钱包</van-tabbar-item> -->
    <van-tabbar-item icon="member-day-privilege" to="../Member">会员</van-tabbar-item>
    <van-tabbar-item icon="contact" to="../User">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  created() {
    let router = this.$route.path;
    //判断当前路由选定标签
    if (router.indexOf("User") > -1) {
      this.active = 2;
    }
    if (router.indexOf("Member") > -1) {
      this.active = 1;
    }
    if (router.indexOf("Home") > -1) {
      this.active = 0;
    }
  }
};
</script>

<style scoped>

</style>
