<template>

  <van-cell-group :border="show">
    <van-nav-bar title="收款取现" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-notice-bar text="晚上21点后可能延迟到账，请耐心等待。" mode="closeable" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    <van-field name='trans_amt' v-validate="'required|digital'" v-model="card.trans_amt" label="金额" icon="clear" placeholder="请输入300-20000的金额" @click-icon="card.trans_amt=''"></van-field>
    <span class="van-field-error" v-show="errors.has('trans_amt')">{{ errors.first('trans_amt')}}</span>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <div slot="title">限额提示
          <van-icon name="question" />
        </div>
        <span class="item-content">除建行单笔限额在1万，其他银行单笔限额为2万，单卡日累计5万限额</span>
      </van-collapse-item>
    </van-collapse>

    <van-field name='card_id' v-validate="'required|digital'" v-model="card.card_id" label="信用卡号" placeholder="请输入银行卡号">
      <van-icon slot="icon" name="contact" @click="oncard_idClick" />
    </van-field>
    <span class="van-field-error" v-show="errors.has('card_id')">{{ errors.first('card_id')}}</span>

    <van-field name='mobile_no' v-validate="'required|phone'" v-model="card.mobile_no" label="预留手机号" placeholder="请输入银行预留手机号" icon="clear" @click-icon="card.mobile_no=''" />
    <span class="van-field-error" v-show="errors.has('mobile_no')">{{ errors.first('mobile_no')}}</span>

    <van-field v-model="bank_name" label="选择银行" placeholder="选择银行" readonly="readonly" @click="onClick()">
      <van-icon slot="icon" name="add-o" @click="onClick()" />
    </van-field>

    <van-field name='acct_cardno' v-validate="'required|digital'" v-model="card.acct_cardno" label="收款银行卡号" placeholder="只可以是借记卡">
      <van-icon slot="icon" name="contact" @click="onbank_idClick" />
    </van-field>
    <span class="van-field-error" v-show="errors.has('acct_cardno')">{{ errors.first('acct_cardno')}}</span>

    <van-field name='acct_name' v-validate="'required|zhname'" v-model="card.acct_name" label="持卡人姓名" placeholder="必须和信用卡人名一致,否则无法提现" icon="clear" @click-icon="card.acct_name=''" />
    <span class="van-field-error" v-show="errors.has('acct_name')">{{ errors.first('acct_name')}}</span>

    <van-field name='acct_idcard' v-validate="'required|idcard'" v-model="card.acct_idcard" label="持卡人身份证" placeholder="仅支持18位身份证" icon="clear" @click-icon="card.acct_idcard=''" />
    <span class="van-field-error" v-show="errors.has('acct_idcard')">{{ errors.first('acct_idcard')}}</span>

    <van-field name='trade_rate' label="费率" :value="card.trade_rate+'‰'" error required readonly="readonly"></van-field>
    <van-field name='draw_fee' label="手续费" :value="card.draw_fee+'元'" error required readonly="readonly"></van-field>
    <van-field name='trade_rate_code' label="优惠码" v-model="trade_rate_code" placeholder="请输入优惠码" icon="clear"></van-field>

    <van-button bottom-action class="card-btn" @click="onNextClick">
      下一步
    </van-button>

    <input type='hidden' name='version' v-model="card.version" />
    <input type='hidden' name='cust_id' v-model="card.cust_id" />
    <input type='hidden' name='ord_id' v-model="card.ord_id" />
    <input type='hidden' name='sub_mer_id' v-model="card.acct_idcard" />
    <input type='hidden' name='subject' v-model="card.subject" />
    <input type='hidden' name='gate_id' v-model="card.gate_id" />
    <input type='hidden' name='draw_fee' v-model="card.draw_fee" />
    <input type='hidden' name='check_value' v-model="card.check_value" />
    <input type='hidden' name='bank_num' v-model="card.bank_num" />
    <input type='hidden' name='ret_url' v-model="card.ret_url" />
    <input type='hidden' name='bg_ret_url' v-model="card.bg_ret_url" />
    <input type='hidden' name='mer_priv' v-model="card.mer_priv" />
    <input type='hidden' name='extension' v-model="card.extension" />
    <input type='hidden' name='trade_rate' v-model="card.trade_rate" />

    <van-popup v-model="show" position="bottom">
      <van-picker title="选择银行名称" :columns="columns" :show-toolbar="true" @cancel="onCancel" @confirm="onConfirm" :visible-item-count="5"></van-picker>
    </van-popup>

    <van-popup v-model="cshow" position="bottom">
      <van-picker title="选择信用卡" :columns="cardscolumns" :show-toolbar="true" @cancel="onCardCancel" @confirm="onCardConfirm" :visible-item-count="10"></van-picker>
    </van-popup>

    <van-popup v-model="bshow" position="bottom">
      <van-picker position="选择收款储蓄卡" :columns="bankcolumns" :show-toolbar="true" @cancel="onBankCancel" @confirm="onBankConfirm" :visible-item-count="10"></van-picker>
    </van-popup>

    <van-dialog v-model="qshow" show-cancel-button :before-close="beforeClose" title="确认信息">
      <van-field label="金额" v-model="card.trans_amt" readonly="readonly"></van-field>
      <van-field label="信用卡号" v-model="card.card_id" readonly="readonly"></van-field>
      <van-field label="预留手机号" v-model="card.mobile_no" readonly="readonly"></van-field>
      <van-field label="收款银行名称" v-model="bank_name" readonly="readonly"></van-field>
      <van-field label="收款银行卡号" v-model="card.acct_cardno" readonly="readonly"></van-field>
      <van-field label="持卡人姓名" v-model="card.acct_name" readonly="readonly"></van-field>
      <van-field label="持卡人身份证" v-model="card.acct_idcard" readonly="readonly"></van-field>
      <van-field v-model="cardwarn" error required readonly="readonly"></van-field>
    </van-dialog>

  </van-cell-group>
</template>

 <script>
import { Toast } from "vant";
import { Dialog } from "vant";
import UtilService from "./_common/util.service.js";
import EncryptService from "./_common/encrypt.service.js";
import Service from "./_common";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      activeNames: [],
      show: false,
      cshow: false,
      bshow: false,
      qshow: false,
      bank_name: "",
      trade_rate_code: "",
      card: {
        trans_amt: "",
        card_id: "",
        mobile_no: "",
        acct_cardno: "",
        acct_name: "",
        acct_idcard: "",
        trade_rate: "6.00",
        sub_mer_id: "",

        bank_num: "",
        version: "01",
        cust_id: "4001353374",
        ord_id: "",
        subject: "机票旅行收款",
        gate_id: "1010",
        draw_fee: "1.00",
        check_value: "",

        ret_url: "http://collection.hemiv.cn/PayBack",
        bg_ret_url: "http://118.190.85.204:7002/api/TradeNotify/TradeNotify",
        mer_priv: "",
        extension: ""
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
      cardscolumns: [],
      bankcolumns: [],
      cardwarn: "请核对信息以免造成损失"
    };
  },
  watch: {
    trade_rate_code: "onChangerate"
  },
  methods: {
    onChangerate() {
      if (this.trade_rate_code === "ws") {
        this.card.trade_rate = "4.20";
      } else if (this.trade_rate_code === "rxq") {
        this.card.trade_rate = "4.30";
      } else if (this.trade_rate_code === "8BTXG") {
        this.card.trade_rate = "4.50";
      } else if (this.trade_rate_code === "FG6JW") {
        this.card.trade_rate = "5.00";
      } else {
        this.card.trade_rate = "6.00";
      }
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value.text}, 当前索引：${value.value}`);
    },
    onClick() {
      this.show = true;
    },
    oncard_idClick() {
      if (this.cardscolumns.length == 0) {
        this.$toast("没有绑定信用卡，请去我的-银行卡-添加信用卡功能绑定信用卡");
      } else {
        this.cshow = true;
      }
    },
    onbank_idClick() {
      if (this.bankcolumns.length == 0) {
        this.$toast("没有绑定储蓄卡，请去我的-银行卡-添加信用卡功能绑定储蓄卡");
      } else {
        this.bshow = true;
      }
    },
    onConfirm(value, index) {
      this.show = false;
      this.bank_name = `${value.text}`;
      this.card.bank_num = `${value.value}`;
      //Toast(`当前值：${value.text}, 当前索引：${value.value}`);
    },
    onCancel() {
      this.show = false;
    },
    onCardConfirm(value, index) {
      this.cshow = false;
      this.card.card_id = `${value.value.CardId}`;
      this.card.mobile_no = `${value.value.Phone}`;
      // Toast(`当前值：${value.text}, 当前索引：${value.value.CardId}`);
    },
    onCardCancel() {
      this.cshow = false;
    },
    onBankConfirm(value, index) {
      this.bshow = false;
      this.card.acct_cardno = `${value.value.CardId}`;
      this.card.acct_name = `${value.value.AcctName}`;
      this.card.acct_idcard = `${value.value.AcctIdCard}`;
      // Toast(`当前值：${value.text}, 当前索引：${value.value.CardId}`);
    },
    onBankCancel() {
      this.bshow = false;
    },
    onClickLeft() {
      this.$router.push("Home");
    },
    ...mapActions(["cardAsyn"]),
    onsubmit: function() {
      let user = UtilService.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.card.mer_priv = user.UserAccountId;
      this.card.sub_mer_id = this.card.acct_idcard;
      this.card.ord_id = Service.Convert.Dateformat(
        new Date(),
        "yyyyMMddhhmmssS"
      );
      this.card.check_value = EncryptService.GetCheckValue(this.card);

      let cardls = {
        card_id: this.card.card_id,
        mobile_no: this.card.mobile_no,
        bank_name: this.bank_name,
        bank_num: this.card.bank_num,
        acct_cardno: this.card.acct_cardno,
        acct_name: this.card.acct_name,
        acct_idcard: this.card.acct_idcard
      };
      //记录信用卡缓存
      UtilService.SetLocalStorage("cards", JSON.stringify(cardls));

      //添加交易请求
      this.$http
        .post(
          "/api/Trade/AddTrade",
          Service.Encrypt.DataEncryption({
            TradeOrderId: this.card.ord_id,
            Amount: this.card.trans_amt,
            CardId: this.card.card_id,
            MobileNo: this.card.mobile_no,
            BankName: this.bank_name,
            BankNum: this.card.bank_num,
            AcctCardNo: this.card.acct_cardno,
            AcctName: this.card.acct_name,
            AcctIdCard: this.card.acct_idcard,
            TradeRate: this.card.trade_rate,
            TradeRateCode: this.trade_rate_code,
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
              if (response.data.Status == 100 && response.data.Data > 0) {
                this.cardAsyn(this.card);
                this.$router.push("Submit");
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
    getBankCardList() {
      let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
      this.$http
        .post(
          "/api/Trade/GetBankCardList",
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
                response.data.Data.forEach(element => {
                  if (element.Type == 0) {
                    this.cardscolumns.push({
                      text:
                        element.BankName +
                        " " +
                        element.CardId +
                        " " +
                        element.AcctName,
                      value: element
                    });
                  } else {
                    this.bankcolumns.push({
                      text:
                        element.BankName +
                        " " +
                        element.CardId +
                        " " +
                        element.AcctName,
                      value: element
                    });
                  }
                });
              } else {
                this.$toast(response.data.Message);
              }
            } else {
              this.$toast(response.data.Message);
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(this.onsubmit(), 1000);
      } else {
        done();
      }
    },
    onNextClick() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.card.trans_amt < 300) {
            this.$toast("交易金额不能小于300");
          } else {
            this.qshow = true;
          }
        } else {
          this.$toast("输入为空或格式错误！");
        }
      });
    }
  },
  created() {
    this.getBankCardList();
    let user = Service.Util.GetLocalStorage(Service.Enum.CGT_ALI_USER);
    if (user.Memberlevel == 0) {
      this.card.trade_rate = this.card.trade_rate = "6.00";
    }
    if (user.Memberlevel == 1) {
      this.card.trade_rate = this.card.trade_rate = "5.80";
    }
    if (user.Memberlevel == 2) {
      this.card.trade_rate = this.card.trade_rate = "5.40";
    }
    if (user.Memberlevel == 3) {
      this.card.trade_rate = this.card.trade_rate = "5.00";
    }
    if (user.Memberlevel == 4) {
      this.card.trade_rate = this.card.trade_rate = "4.60";
    }
    if (user.Memberlevel == 5) {
      this.card.trade_rate = this.card.trade_rate = "4.20";
    }
  },
  mounted() {
    let cardls = JSON.parse(UtilService.GetLocalStorage("cards"));
    this.card.card_id = cardls.card_id;
    this.card.mobile_no = cardls.mobile_no;
    this.bank_name = cardls.bank_name;
    this.card.bank_num = cardls.bank_num;
    this.card.acct_cardno = cardls.acct_cardno;
    this.card.acct_name = cardls.acct_name;
    this.card.acct_idcard = cardls.acct_idcard;
  }
};
</script>

<style scoped>
.card-btn {
  font-size: 22px;
  width: 91%;
  margin: 15px;
  height: 45px;
  background-color: #38f;
}
.van-field-error {
  color: #f44;
  font-size: 12px;
  text-align: left;
  padding-left: 29%;
  /* line-height: 24px; */
}
.item-content {
  font-size: 13px;
  line-height: 1.5;
  color: #666;
}
.van-icon-question {
  color: #38f;
  vertical-align: -3px;
  margin-left: 5px;
  font-size: 15px;
}
</style>




