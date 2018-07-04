<template>
  <div class="card-index">
    <van-nav-bar title="推荐" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- <van-row>
      <van-col span="12" class="tableprice">
        <img class="tableprice-img" src="../assets/images/支付宝.png" />
        <span>减万5</span>
      </van-col>
      <van-col span="12" class="tableprice">
        <img class="tableprice-img" src="../assets/images/微信支付.png" />
        <span>减万5</span>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12" class="tableprice">
        <img class="tableprice-img" src="../assets/images/银联支付.png" />
        <span>减万5</span>
      </van-col>
      <van-col span="12" class="tableprice">
        <img class="tableprice-img" src="../assets/images/POS.png" />
        <span>减万5</span>
      </van-col>
    </van-row> -->
    <van-button bottom-action class="card-btn" @click="onClick()">立即推荐</van-button>
    <van-actionsheet v-model="show" title="链接分享到">
        <van-cell-group class="home-van-cell-group" :border="border">
            <van-cell :border="border">
                <van-row>
                    <router-link to="Collection">
                        <van-col class="home-van-cell-group-cell-item" offset="5" span="8">
                            <img src="../assets/images/微信好友.png" />
                        </van-col>
                    </router-link>
                    <router-link to="Member">
                    <van-col class="home-van-cell-group-cell-item" offset="2"  span="8">
                        <img src="../assets/images/朋友圈.png" />
                    </van-col>
                     </router-link>
                </van-row>
                <van-row>
                    <van-col class="home-van-cell-group-cell-item" offset="5" span="8">
                        <span>微信好友</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" offset="2"  span="8">
                        <span>朋友圈</span>
                    </van-col>
                </van-row>

            </van-cell>
        </van-cell-group>
    </van-actionsheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    onClick() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.push("Home");
    }
  }
};
</script>
<style scoped>
.card-index-title-img {
  width: 50px;
  height: 40px;
  vertical-align: middle;
  text-align: center;
  padding-bottom: 10px;
}
.pricefonttitle {
  font-size: 20px;
}
.pricefontcontent {
  font-size: 12px;
}
.oldprice {
  font-size: 16px;
  text-decoration: line-through;
}
.newprice {
  font-size: 16px;

  color: red;
  font-weight: 900;
}
.tableprice {
  line-height: 3rem;
  font-size: 13px;
  color: red;
  font-weight: 900;
}
.tableprice-img {
  width: 6rem;
  height: 2rem;
  vertical-align: middle;
}
.tableprice-span {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding-bottom: 10px;
}
.card-btn {
  font-size: 22px;
  background-color: #38f;
}
</style>
