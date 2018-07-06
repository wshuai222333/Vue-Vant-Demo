<template>
    <div>
        <van-search />
        <van-swipe :autoplay="3000">
            <van-swipe-item><img class="home-van-swipe-img" src="https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg" /></van-swipe-item>
        </van-swipe>
        <!-- <div class="home-p"></div> -->
        <van-cell-group class="home-van-cell-group" :border="border">
            <van-cell :border="border" title="快捷服务" is-link  class="home-p">
            </van-cell>
            <van-cell :border="border">
                <van-row>
                    <router-link to="Collection">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/收款.svg" />
                        </van-col>
                    </router-link>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/返利.svg" />
                        </van-col>
                    </router-link>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/优惠.svg" />
                        </van-col>
                    </router-link>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/额度查询.svg" />
                        </van-col>
                    </router-link>
                </van-row>
                <van-row>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>收款取现</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>申卡返利</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>优惠信息</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>提升额度</span>
                    </van-col>
                </van-row>

            </van-cell>
            <van-cell :border="border">
                <van-row>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/指南针.svg" />
                        </van-col>
                    </router-link>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/信用卡.svg" />
                        </van-col>
                    </router-link>
                    <router-link to="Forward">
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/积分.svg" />
                        </van-col>
                    </router-link>
                  
                        <van-col class="home-van-cell-group-cell-item" span="6">
                            <img src="../assets/images/更多.svg" />
                        </van-col>
                 
                </van-row>
                <van-row>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>用卡指南</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>信用卡</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>积分商城</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" span="6">
                        <span>更多</span>
                    </van-col>
                </van-row>

            </van-cell>
            <van-cell :border="border" title="常见问题" is-link value="更多" to="Problem" class="home-p">
            </van-cell>
            <van-cell :border="border" title="常见问题一" class="home-item" is-link>
            </van-cell>
            <van-cell :border="border" title="常见问题二" class="home-item" is-link>
            </van-cell>
            <van-cell :border="border" title="常见问题三" class="home-item" is-link>
            </van-cell>
        </van-cell-group>

        <!-- <van-cell-group :border="border">
            <van-row :border="border">
                <van-col class="home-van-cell-group-cell-item" span="12">
                    <van-field class="home-van-cell-group-field" error="error" value="0.00" label="累计节省" left-icon="debit-pay" icon="arrow" disabled/>
                </van-col>
                <van-col class="home-van-cell-group-cell-item" span="12">
                    <van-field class="home-van-cell-group-field" error="error" value="0.00" label="累计赚取" left-icon="value-card" icon="arrow" disabled/>
                </van-col>
            </van-row>
        </van-cell-group> -->
    </div>

</template>

<script>
export default {
  data() {
    return {
      border: false,
      center: true,
      error: true
    };
  }
};
</script>

<style scoped>
.home-van-swipe-img {
  width: 100%;
  height: 10rem;
}
.home-van-cell-group-cell-item {
  align-self: center;
  text-align: center;
}
.home-van-cell-group-field {
  font-size: 16px;
}
.home-p {
  padding: 2px 15px;
  background-color: #f8f8f8;
}
.home-item {
  font-size: 16px;
}
</style>
