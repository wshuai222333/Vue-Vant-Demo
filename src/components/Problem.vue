<template>
    <van-cell-group :border="show">
        <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-cell :border="border" title="常见问题一" class="home-item" is-link>
        </van-cell>
        <van-cell :border="border" title="常见问题二" class="home-item" is-link>
        </van-cell>
        <van-cell :border="border" title="常见问题三" class="home-item" is-link>
        </van-cell>
        <van-cell :border="border" title="常见问题四" class="home-item" is-link>
        </van-cell>
        <van-cell :border="border" title="常见问题五" class="home-item" is-link>
        </van-cell>
        <van-cell :border="border" title="常见问题六" class="home-item" is-link>
        </van-cell>
    </van-cell-group>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push("Home");
    }
  }
};
</script>

<style scoped>
.home-item {
  font-size: 16px;
}
</style>
