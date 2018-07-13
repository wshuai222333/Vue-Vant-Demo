<template>
  <van-cell-group :border="show">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-steps :active="active" active-color="#38f">
      <van-step>填卡</van-step>
      <van-step>资料</van-step>
      <van-step>完成</van-step>
    </van-steps>

    <van-field name='card_id' v-validate="'required|digital'" v-model="card.card_id" label="信用卡卡号" placeholder="请输入信用卡号" icon="clear" @click-icon="card.card_id=''" />
    <span class="van-field-error" v-show="errors.has('card_id')">{{ errors.first('card_id')}}</span>
    <van-field name='bankname' label="银行名称" placeholder="输入信用卡号后自动获取" readonly="readonly"></van-field>
    <van-field v-model="installname" label="分期数" placeholder="选择分期数" readonly="readonly" @click="onClick()">
      <van-icon slot="icon" name="add-o" @click="onClick()" />
    </van-field>
    <van-field name='trans_amt' v-validate="'required|digital'" v-model="card.trans_amt" label="商品金额" icon="clear" placeholder="请输入商品金额" @click-icon="card.trans_amt=''"></van-field>
    <span class="van-field-error" v-show="errors.has('trans_amt')">{{ errors.first('trans_amt')}}</span>
    <van-row><span class="van-row-span">手续费率每个月仅需0.00%</span> </van-row>

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

    <van-button bottom-action class="card-btn" @click="onsubmit">
      下一步
    </van-button>
    <van-popup v-model="showbottom" position="bottom">
      <van-picker :columns="columns" :show-toolbar="true" @cancel="onCancel" @confirm="onConfirm" :visible-item-count="3"></van-picker>
    </van-popup>
  </van-cell-group>

</template>

<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      showbottom: false,
      installname: "",
      card: {
        trans_amt: "",
        bankname: "",
        card_id: "",
        install: ""
      },
      columns: [
        { text: "3期", value: "3" },
        { text: "6期", value: "6" },
        { text: "12期", value: "12" }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("User");
    },
    onClick() {
      this.showbottom = true;
    },
    onConfirm(value, index) {
      this.showbottom = false;
      this.installname = `${value.text}`;
      this.card.install = `${value.value}`;
      this.$toast(`当前值：${value.text}, 当前索引：${value.value}`);
    },
    onCancel() {
      this.showbottom = false;
    },
    onsubmit: function() {}
  }
};
</script>

<style scoped>
.card {
  background-color: #38f;
  height: 200px;
  width: 91%;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 5%;
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
.card-result-font {
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
.card-result-icon-table {
  padding-top: 15%;
  width: 100px;
}
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
  border-radius: 10px;
  margin-top: 10%;
}
.van-row{
  font-size: 13px;
  color: #999;
}
.van-row-span{
  float: right;
}
</style>
