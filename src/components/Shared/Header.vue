<template>

    <van-nav-bar title="随身汇" @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar>

</template>


<script>
export default {
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
