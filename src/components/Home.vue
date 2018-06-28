<template>
    <div>
        <van-search />
        <van-swipe :autoplay="3000">
            <van-swipe-item><img class="home-van-swipe-img" src="https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg" /></van-swipe-item>
            <van-swipe-item><img class="home-van-swipe-img" src="https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg" /></van-swipe-item>
        </van-swipe>
        <van-cell-group class="home-van-cell-group" :border="border">
            <van-cell :border="border">
                <van-row>
                    <router-link to="Recommend">
                        <van-col class="home-van-cell-group-cell-item" span="3">
                            <img src="../assets/images/推荐.png" />
                        </van-col>
                    </router-link>
                    <router-link to="Collection">
                        <van-col class="home-van-cell-group-cell-item" offset="2" span="14" to="Money">
                            <img src="../assets/images/收款.png" />
                        </van-col>
                    </router-link>
                    <router-link to="Member">
                    <van-col class="home-van-cell-group-cell-item" span="3">
                        <img src="../assets/images/优惠.png" />
                    </van-col>
                     </router-link>
                </van-row>
                <van-row>
                    <van-col class="home-van-cell-group-cell-item" offset="1" span="3">
                        <span>推荐</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" offset="1" span="14">
                        <span>收款</span>
                    </van-col>
                    <van-col class="home-van-cell-group-cell-item" offset="1" span="3">
                        <span>会员</span>
                    </van-col>
                </van-row>

            </van-cell>
        </van-cell-group>
        <van-cell-group :border="border">
            <van-row :border="border">
                <van-col class="home-van-cell-group-cell-item" span="12">
                    <van-field class="home-van-cell-group-field" error="error" value="0.00" label="累计节省" left-icon="debit-pay" icon="arrow" disabled/>
                </van-col>
                <van-col class="home-van-cell-group-cell-item" span="12">
                    <van-field class="home-van-cell-group-field" error="error" value="0.00" label="累计赚取" left-icon="value-card" icon="arrow" disabled/>
                </van-col>
            </van-row>
        </van-cell-group>
    </div>

</template>

<script>
export default {
  data() {
    return {
      border: false,
      error: true
    };
  }
};
</script>

<style scoped>
.home-van-swipe-img {
  width: 100%;
  height: 16rem;
}
.home-van-cell-group {
  padding: 1rem;
}
.home-van-cell-group-cell-item {
  text-align: center;
}
.home-van-cell-group-field {
  font-size: 16px;
}
</style>
