<template>
  <div>
    <van-nav-bar title="二维码付款" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="wrap">

      <div class="btn-wrap" id="qrcode"></div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Service from "./_common";

export default {
  data() {
    return {
      bannerUrl: "http://www.hemiv.cn/QrcodeCollection"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 330,
        height: 330, // 高度
        text: this.bannerUrl // 二维码内容
        //render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      console.log(qrcode);
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  },
  mounted() {
     let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
     this.bannerUrl+="?Id="+user.UserAccountId;
    this.qrcode();
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.btn-wrap {
  padding: 56px;
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
