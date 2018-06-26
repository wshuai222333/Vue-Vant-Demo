<template>
    <div>
        <label v-text="'支付成功！本窗口将在秒后'+time+'自动跳转!'"></label>
    </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5
    };
  },
  methods: {
    PageClose() {
      this.time -= 1;
      document.title = "本窗口将在" + this.time + "秒后自动跳转首页!";
      if (this.time > 0) {
        setTimeout(() => {
          this.PageClose();
        }, 1000);
      } else {
        this.$router.push("Collection");
      }
    }
  },
  mounted() {
    this.PageClose();
  }
};
</script>
