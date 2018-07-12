<template>
    <div>
        <van-nav-bar title="向商户付款" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="wrap">

            <div class="btn-wrap" id="qrcode"></div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      bannerUrl: "http://www.baidu.com"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250, // 高度
        text: this.bannerUrl // 二维码内容
        //render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      console.log(qrcode);
    }
  },
  mounted() {
    this.qrcode();
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #38f;
}
.btn-wrap {
  padding: 50px;
  width: 260px;
  height: 260px;
}
</style>
