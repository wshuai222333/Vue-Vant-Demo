<template>
  <van-cell-group>
    <van-nav-bar title="添加银行卡" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- <van-tabs v-model="active"> -->
    <!-- <van-tab title="信用卡"> -->

    <p></p>

    <van-radio-group v-model="radio">
      <van-row>

        <van-col class="van-col-radio" offset="2" span="8">
          <van-radio name="0">信用卡</van-radio>
        </van-col>
        <van-col class="van-col-radio" span="6">
          <van-radio name="1">储蓄卡</van-radio>
        </van-col>
      </van-row>
    </van-radio-group>

    <van-field name='card_id' v-validate="'required|digital'" v-model="card.card_id" label="银行卡号" placeholder="请输入银行卡卡号" icon="clear" @click-icon="card.card_id=''" />
    <span class="van-field-error" v-show="errors.has('card_id')">{{ errors.first('card_id')}}</span>

    <van-field name='bank_name' v-validate="'required'" v-model="card.bank_name" label="银行名称" placeholder="选择银行" readonly="readonly" @click="onSelectClick()">
      <van-icon slot="icon" name="add-o" @click="onSelectClick()" />
    </van-field>
    <span class="van-field-error" v-show="errors.has('bank_name')">{{ errors.first('bank_name')}}</span>

    <van-field name='mobile_no' v-validate="'required|phone'" v-model="card.mobile_no" label="预留手机号" placeholder="请输入银行预留手机号" icon="clear" @click-icon="card.mobile_no=''" />
    <span class="van-field-error" v-show="errors.has('mobile_no')">{{ errors.first('mobile_no')}}</span>

    <van-field name='acct_name' v-validate="'required|zhname'" v-model="card.acct_name" label="持卡人姓名" placeholder="请输入持卡人姓名" icon="clear" @click-icon="card.acct_name=''" />
    <span class="van-field-error" v-show="errors.has('acct_name')">{{ errors.first('acct_name')}}</span>

    <van-field name='acct_idcard' v-validate="'required|idcard'" v-model="card.acct_idcard" label="持卡人身份证" placeholder="仅支持18位身份证" icon="clear" @click-icon="card.acct_idcard=''" />
    <span class="van-field-error" v-show="errors.has('acct_idcard')">{{ errors.first('acct_idcard')}}</span>

    <van-button bottom-action class="card-btn" @click="onClick">
      保存
    </van-button>
    <!-- </van-tab> -->
    <!-- <van-tab title="储蓄卡">
       <van-field name='card_id' v-validate="'required|digital'" v-model="xcard.card_id" label="信用卡卡号" placeholder="请输入银行卡卡号" icon="clear" @click-icon="card.card_id=''" />
        <span class="van-field-error" v-show="errors.has('card_id')">{{ errors.first('card_id')}}</span>
        <van-field v-model="xcard.bank_name" label="选择银行" placeholder="选择银行" readonly="readonly">
          <van-icon slot="icon" name="add-o" />
        </van-field>
        <van-field name='mobile_no' v-validate="'required|phone'" v-model="xcard.mobile_no" label="预留手机号" placeholder="请输入银行预留手机号" icon="clear" @click-icon="card.mobile_no=''" />
        <span class="van-field-error" v-show="errors.has('mobile_no')">{{ errors.first('mobile_no')}}</span>
        <van-field name='acct_name' v-validate="'required|zhname'" v-model="xcard.acct_name" label="持卡人姓名" placeholder="请输入持卡人姓名" icon="clear" @click-icon="card.acct_name=''" />
        <span class="van-field-error" v-show="errors.has('acct_name')">{{ errors.first('acct_name')}}</span>
        <van-button bottom-action class="card-btn" @click="onClick" >
          保存
        </van-button>
      </van-tab> -->
    <!-- </van-tabs> -->
    <van-popup v-model="show" position="bottom" cancel-text="取消">
      <van-picker :columns="columns" :show-toolbar="true" @cancel="onCancel" @confirm="onConfirm" :visible-item-count="5"></van-picker>
    </van-popup>

    <van-dialog v-model="dshow" show-cancel-button :before-close="beforeClose" title="确认信息">
      <van-field label="银行卡类型" v-model="formatter" readonly="readonly"></van-field>
      <van-field label="银行卡卡号" v-model="card.card_id" readonly="readonly"></van-field>
      <van-field label="银行名称" v-model="card.bank_name" readonly="readonly"></van-field>
      <van-field label="预留手机号" v-model="card.mobile_no" readonly="readonly"></van-field>
      <van-field label="持卡人姓名" v-model="card.acct_name" readonly="readonly"></van-field>
      <van-field label="持卡人身份证" v-model="card.acct_idcard" readonly="readonly"></van-field>
      <van-field v-model="cardwarn" error required readonly="readonly"></van-field>
    </van-dialog>
  </van-cell-group>

</template>


<script>
import { Dialog } from "vant";
import Service from "./_common";

export default {
  data() {
    return {
      show: false,
      dshow: false,
      active: 0,
      radio: "",
      card: {
        card_id: "",
        mobile_no: "",
        acct_name: "",
        bank_name: "",
        bank_num: "",
        acct_idcard: ""
      },
      columns: [
        { text: "工商银行", value: "01020000" },
        { text: "中国农业银行", value: "01030000" },
        { text: "中国银行", value: "01040000" },
        { text: "中国建设银行", value: "01050000" },
        { text: "交通银行", value: "03010000" },
        { text: "中信银行", value: "03020000" },
        { text: "中国光大银行", value: "03030000" },
        { text: "华夏银行", value: "03040000" },
        { text: "中国民生银行", value: "03050000" },
        { text: "广东发展银行", value: "03060000" },
        { text: "平安银行", value: "03070000" },
        { text: "招商银行", value: "03080000" },
        { text: "兴业银行", value: "03090000" },
        { text: "上海浦东发展银行", value: "03100000" },
        { text: "北京银行", value: "03130011" },
        { text: "上海银行", value: "03130031" },
        { text: "中国邮政储蓄银行", value: "04030000" }
      ],
      cardwarn: "请核对信息以免造成损失"
    };
  },
  methods: {
    onConfirm(value, index) {
      this.show = false;
      this.card.bank_name = `${value.text}`;
      this.card.bank_num = `${value.value}`;
      //Toast(`当前值：${value.text}, 当前索引：${value.value}`);
    },
    onCancel() {
      this.show = false;
    },
    onClickLeft() {
      this.$router.push("CardList");
    },
    onClick() {
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      //     if (this.radio == "") {
      //       this.$toast("请选择银行卡类型");
      //     } else {
      //       this.dshow = true;
      //     }
      //   } else {
      //     this.$toast("输入为空或格式错误！");
      //   }
      // });
      this.dshow = true;
    },
    onSelectClick() {
      this.show = true;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(this.AddBankCard, 1000);
      } else {
        done();
      }
    },
    AddBankCard() {
      debugger;
      //获取缓存用户信息
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.$http
        .post(
          "/api/Trade/AddBankCard",
          Service.Encrypt.DataEncryption({
            UserAccountId: user.UserAccountId,
            CardId: this.card.card_id,
            BankName: this.card.bank_name,
            BankCode: this.card.bank_num,
            Phone: this.card.mobile_no,
            AcctName: this.card.acct_name,
            Type: this.radio
          })
        )
        .then(
          response => {
            if (
              response.data &&
              response.data != null &&
              response.data != undefined
            ) {
              if (response.data.Status == 100 && response.data.Data > 0) {
                this.$toast("添加完成");
                this.$router.push("CardList");
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
    },
    // formatter(radio) {
    //   var msg = "";
    //   switch (parseInt(radio)) {
    //     case 1:
    //       msg = "储蓄卡";
    //       break;
    //     case 0:
    //       msg = "信用卡";
    //       break;
    //     default:
    //       msg = "未知类型";
    //       break;
    //   }
    //   return msg;
    // }
  },
  computed:{
    formatter:function(){
      let msg = "";
      switch (parseInt(this.radio)) {
        case 1:
          msg = "储蓄卡";
          break;
        case 0:
          msg = "信用卡";
          break;
        default:
          msg = "未知类型";
          break;
      }
      return msg
    }
  }
};
</script>

<style>
.van-tabs {
  position: relative;
}
.van-tabs__wrap {
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  overflow: hidden;
  position: absolute;
}
.van-tabs__wrap--page-top {
  position: fixed;
}
.van-tabs__wrap--content-bottom {
  top: auto;
  bottom: 0;
}
.van-tabs__wrap--scrollable .van-tab {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 22%;
  flex: 0 0 22%;
}
.van-tabs__wrap--scrollable .van-tabs__nav {
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.van-tabs__wrap--scrollable .van-tabs__nav::-webkit-scrollbar {
  display: none;
}
.van-tabs__nav {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  background-color: #fff;
}
.van-tabs__nav--line {
  height: 100%;
  padding-bottom: 15px;
  box-sizing: content-box;
}
.van-tabs__nav--card {
  margin: 0 15px;
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid #38f;
  height: 30px;
}
.van-tabs__nav--card .van-tab {
  color: #38f;
  border-right: 1px solid #38f;
  line-height: 28px;
}
.van-tabs__nav--card .van-tab:last-child {
  border-right: none;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff;
  background-color: #38f;
}
.van-tabs__line {
  z-index: 1;
  left: 0;
  bottom: 15px;
  height: 2px;
  position: absolute;
  background-color: #38f;
}
.van-tabs--line {
  padding-top: 44px;
}
.van-tabs--line .van-tabs__wrap {
  height: 44px;
}
.van-tabs--card {
  padding-top: 30px;
}
.van-tabs--card .van-tabs__wrap {
  height: 30px;
}
.van-tab {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
  position: relative;
  color: #333;
  line-height: 44px;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  min-width: 0;
}
.van-tab span {
  display: block;
}
.van-tab:active {
  background-color: #e8e8e8;
}
.van-tab--active {
  color: #38f;
}
.van-tab--disabled {
  color: #c9c9c9;
}
.van-tab--disabled:active {
  background-color: #fff;
}
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
.van-radio-group {
  font-size: 14px;
}
.van-field-error {
  color: #f44;
  font-size: 12px;
  text-align: left;
  padding-left: 29%;
  /* line-height: 24px; */
}
.van-col-radio {
  align-self: center;
  text-align: center;
}
</style>
