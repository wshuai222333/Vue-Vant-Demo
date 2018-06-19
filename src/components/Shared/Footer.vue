<template>
    <van-tabbar v-model="active" @change="active" >
        <van-tabbar-item icon="wap-home" to="../Home">首页</van-tabbar-item>
        <!-- <van-tabbar-item icon="balance-details" to="../Collection">钱包</van-tabbar-item> -->
        <van-tabbar-item icon="member-day-privilege" to="../Member">会员</van-tabbar-item>
        <van-tabbar-item icon="contact" to="../User">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script >
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped>
/* .van-tabbar-item--active{
  color: red;
} */
</style>
