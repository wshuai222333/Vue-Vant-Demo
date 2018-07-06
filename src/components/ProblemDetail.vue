<template>
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft"></van-nav-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push("Problem");
    }
  }
};
</script>

<style scoped>
</style>
