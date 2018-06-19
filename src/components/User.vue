<template>
  <div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="user-poster">
      <!-- <van-cell-group :border="border">
        <van-cell :border="border">
          <van-row> -->
      <!-- <van-col offset="12" span="24"> -->
      <div class="user-background">
        <img class="user-head" src="../assets/images/timg.jpg" alt="">
        <div class="name-span">
        <span >微信昵称</span>
        </div>
      </div>

      <!-- </van-col>
          </van-row>
        </van-cell>
      </van-cell-group> -->
    </div>
    <!-- <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" /> 待付款
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" /> 待接单
      </van-col>
      <van-col span="6">
        <van-icon name="pending-deliver" /> 待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" /> 待发货
      </van-col>
    </van-row> -->

    <!-- <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group> -->

    <van-cell-group>
      <van-cell icon="gold-coin" title="收款明细" is-link />
      <van-cell icon="exchange" title="我的优惠" is-link />
      <van-cell icon="gift" title="我的推荐" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style lang="less">
.user {
  &-background {
    padding-top: 10%;
    text-align: center;
    .name-span{
      padding: 2%;
      color: white;
    }
  }
  &-head {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
  &-poster {
    width: 100%;
    height: 12rem;
    display: block;
    background-color: #38f;
  }
  &-group {
    margin-bottom: 0.3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>

