<template>
    <van-nav-bar title="积分" left-arrow @click-left="onClickLeft"></van-nav-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    }
  }
};
</script>

<style scoped>
</style>
