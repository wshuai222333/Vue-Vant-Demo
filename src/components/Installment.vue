<template>
    <van-cell-group :border="show">
        <van-nav-bar title="标题" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-steps :active="active" active-color="#38f">
            <van-step>填卡</van-step>
            <van-step>资料</van-step>
            <van-step>完成</van-step>
        </van-steps>
        <van-field name='trans_amt' v-validate="'required|digital'" v-model="card.trans_amt" label="金额" icon="clear" placeholder="请输入500-20000的金额" @click-icon="card.trans_amt=''"></van-field>
        <span class="van-field-error" v-show="errors.has('trans_amt')">{{ errors.first('trans_amt')}}</span>

        <div class="card">
            <div class="card-amout"> 0.00</div>
            <div class="card-forecast">预计还款(元)</div>
            <div class="card-line"> </div>
            <div class="card-result">
                <div class="card-result-font">商品本金(元)</div>
                <div class="card-result-font">+</div>
                <div class="card-result-font">手续费(元)</div>
                <div class="card-result-line"></div>
                <div class="card-result-icon">
                    <img src="../assets/images/计划表.svg" />
                    <div class="card-result-icon-table">扣款计划表</div>
                </div>
            </div>

        </div>
    </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      card: {
        trans_amt: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #38f;
  height: 200px;
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
}
.card-amout {
  color: white;
  display: flex;
  justify-content: center;
  padding-top: 15%;
  font-size: 30px;
}
.card-forecast {
  color: wheat;
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin-top: 6%;
}
.card-line {
  border-bottom: 0.5px solid white;
  margin-top: 6%;
  margin-left: 3%;
  margin-right: 3%;
}
.card-result {
  color: wheat;
  display: flex;
  font-size: 12px;
  margin-left: 6%;
  float: left;
}
.card-result-font{
    margin-top: 5%;
}
.card-result-line {
  border-right: 0.5px solid white;
  padding-left: 6%;
  margin-top: 3%;
  height: 37px;
}
.card-result-icon {
  display: flex;
  padding-left: 10%;
  width: auto;
}
.card-result-icon-table{
    padding-top:15%;
    width: 80px;
}
</style>
