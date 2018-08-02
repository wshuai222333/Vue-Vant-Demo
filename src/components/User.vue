<template>
  <div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="user-poster">
      <!-- <van-cell-group :border="border">
        <van-cell :border="border">
          <van-row> -->
      <!-- <van-col offset="12" span="24"> -->
      <div class="user-background">
        <img class="user-head" src="../assets/images/头像.png" alt="" />
        <strong class="name-span" v-text="username">
        </strong>
        <img v-if="memberlevel==0" class="user-level" src="../assets/images/会员等级0.svg" alt="" />
        <img v-if="memberlevel==1" class="user-level" src="../assets/images/会员等级1.svg" alt="" />
        <img v-if="memberlevel==2" class="user-level" src="../assets/images/会员等级2.svg" alt="" />
        <img v-if="memberlevel==3" class="user-level" src="../assets/images/会员等级3.svg" alt="" />
        <img v-if="memberlevel==4" class="user-level" src="../assets/images/会员等级4.svg" alt="" />
        <img v-if="memberlevel==5" class="user-level" src="../assets/images/会员等级5.svg" alt="" />
        <van-progress class="user-progress" :percentage="formateintegral" :pivot-text="integral" />
        <van-icon class="user-icon" name="question" color="white" @mouseover="overTishi" />
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
      <van-cell icon="records" title="交易" is-link to="Trade" />
      <van-cell icon="card" title="银行卡" is-link to="CardList" />
    </van-cell-group>
    <van-cell-group class="user-group">

    </van-cell-group>

    <van-cell-group class="user-group">
      <!-- <van-cell icon="gold-coin" title="积分兑换" is-link to="Integral" /> -->
      <!-- <van-cell icon="exchange" title="我的版本" value="0.1.0"/> -->
      <van-cell icon="info-o" title="当前版本" value="0.1.1" />
      <van-cell icon="exchange" title="修改密码" is-link to="Password" />
      <van-cell icon="edit" title="我的建议" is-link to="Advice" />

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
      username: "",
      memberlevel: "",
      percentage: 50,
      integral: "111"
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
    },
    overTishi() {
      this.$toast({
        message: "积分越高对应的费率会越低",
        position: "top",
        duration: 5000
      });
    },
    getUser() {
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.$http
        .post(
          "/api/User/UserLogin",
          Service.Encrypt.DataEncryption({
            UserAccountId: user.UserAccountId
          })
        )
        .then(
          response => {
            if (
              response.data &&
              response.data != null &&
              response.data != undefined
            ) {
              if (response.data.Status == 100) {
                response.data.Data.userPwd = null;
                // Service.Util.SetLocalStorage(Service.Enum.CGT_ALI_USER, "");
                Service.Util.SetLocalStorage(
                  Service.Enum.CGT_ALI_USER,
                  JSON.stringify(response.data.Data)
                );

                this.username = user.UserName;
                this.memberlevel = user.Memberlevel;
                this.integral = user.Integral;
              } else {
                this.$toast(response.data.Message);
              }
            } else {
              this.$toast(response.data.Message);
            }
          },
          error => {
            this.$toast("请求失败！");
            console.log(error);
          }
        );
    }
  },
  created() {
    this.getUser();
  },
  computed: {
    formateintegral() {
      if (this.memberlevel == 0) {
        return this.integral / 100 * 100;
      } else if (this.memberlevel == 1) {
        return this.integral / 500 * 100;
      } else if (this.memberlevel == 2) {
        return this.integral / 1000 * 100;
      } else if (this.memberlevel == 3) {
        return this.integral / 2000 * 100;
      } else if (this.memberlevel == 4) {
        return this.integral / 5000 * 100;
      } else if (this.memberlevel == 4) {
        return this.integral / 100000 * 100;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="less">
.user {
  &-progress {
    margin: 8px 8px;
    width: 55%;
    display: flex;
    float: left;
  }
  &-background {
    width: 100%;
  }
  &-level {
    padding-left: 2%;
    display: flex;
  }
  &-head {
    margin-top: 8%;
    margin-left: 8%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    float: left;
    display: flex;
  }
  &-poster {
    width: 100%;
    height: 9rem;
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
.name-span {
  display: flex;
  color: white;
  padding-top: 10%;
  padding-left: 3%;
  font-size: 20px;
}
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
</style>

