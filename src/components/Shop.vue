<template>
  <van-tabs v-model="active">
    <van-tab title="服饰">
      <ul>
        <router-link to="GoodsDetail">
          <van-card :title="'短袖T恤'+n" desc="描述" price="2.00" thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg">
          </van-card>
        </router-link>
      </ul>
    </van-tab>
    <van-tab title="生活">
    </van-tab>
    <van-tab title="充值">
    </van-tab>
    <van-tab title="旅游">
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  data: {
    items: [1, 34, 89, 92, 45, 76, 3, 12]
  }
};
</script>
