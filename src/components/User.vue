<template>
  <div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="user-poster">
      <!-- <van-cell-group :border="border">
        <van-cell :border="border">
          <van-row> -->
      <!-- <van-col offset="12" span="24"> -->
      <div class="user-background">
        <img class="user-head" src="../assets/images/头像.png" alt="">
        <div class="name-span" v-text="username">
          <!-- 111 -->
          <!-- <label :value="username"></label> -->
          <!-- <input type="text" value="111" v-model="username"> -->
          <!-- <span v-model="username"></span> -->
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

    <van-cell-group class="user-group">
      <van-cell icon="records" title="我的交易" is-link to="Trade" />
    </van-cell-group>

    <van-cell-group class="user-group">
      <!-- <van-cell icon="gold-coin" title="积分兑换" is-link to="Integral" /> -->
      <!-- <van-cell icon="exchange" title="我的版本" value="0.1.0"/> -->
      <van-cell icon="info-o" title="当前版本" value="0.1.1" />
      <van-cell icon="exchange" title="修改密码" is-link to="Password" />
      <van-cell icon="edit" title="我的建议" is-link to="Advice"/>

    </van-cell-group>

    <van-button class="card-btn" bottom-action @click="loginout">退出当前账户</van-button>

  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";
import Service from "./_common";
export default {
  data() {
    return {
      username: ""
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    loginout() {
      Service.Util.RemoveLocalStorage(Service.Enum.CGT_ALI_USER);
      this.$router.push("/login");
    }
  },
  created() {
    let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
    this.username = user.UserName;
  }
};
</script>

<style lang="less">
.user {
  &-background {
    padding-top: 10%;
    text-align: center;
    width: 100%;
    //background-image: url(../assets/images/timg.jpg);
    .name-span {
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
    // height: 12rem;
    height: 100%;
    display: block;
    // background-color: #38f;
    background-image: url(../assets/images/timg.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    
    
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

.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
</style>

