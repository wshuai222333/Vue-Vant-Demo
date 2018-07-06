<template>
    <div>
        <van-nav-bar title="建设中" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <img src="../assets/images/模块建设.jpg" class="img" />
    </div>
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
.img {
  width: 100%;
}
</style>

