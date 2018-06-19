<template>
    <van-tabs v-model="active">
        <van-tab title="商户版">
            <van-panel title="注意事项" desc="1啊手机打开拉萨角度来看按时间段埃克设计的卢卡斯觉得">
                <div class="card-index">
                    <span class="pricefonttitle">至尊黑卡</span>
                    <img class="card-index-title-img" src="../assets/images/会员卡.png" /> &nbsp;&nbsp;&nbsp;
                    <span class="pricefontcontent">原价</span>
                    <span class="oldprice">1680</span>
                    <span class="pricefontcontent">优惠价</span>
                    <span class="newprice">680</span>
                </div>
                <div class="card-index">
                    <van-row>
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
                    </van-row>
                   
                </div>
                 <van-button bottom-action class="card-btn">确认购买</van-button>
            </van-panel>

        </van-tab>
        <van-tab title="个人版">

        </van-tab>
    </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: 2
    };
  },
  
};
</script>

<style scoped>
.card-index {
  margin: 10px;
}
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
  font-size: 20px;
  background-color: #38f;
}
</style>

