<template>
    <van-cell-group>
        <form action='http://pay.dingshuapay.com/netrecv/merchant/unionPay' method='post' ref="merRecvRequest" name='merRecvRequest' target='_self'>
            <input type='hidden' name='trans_amt' v-model="trans_amt" />
            <input type='hidden' name='card_id' v-model="card_id" />
            <input type='hidden' name='mobile_no' v-model="mobile_no" />
            <input type='hidden' name='acct_cardno' v-model="acct_cardno" />
            <input type='hidden' name='acct_name' v-model="acct_name" />
            <input type='hidden' name='acct_idcard' v-model="acct_idcard" />
            <input type='hidden' name='trade_rate' v-model="trade_rate" />

            <input type='hidden' name='version' v-model="version" />
            <input type='hidden' name='cust_id' v-model="cust_id" />
            <input type='hidden' name='ord_id' v-model="ord_id" />
            <input type='hidden' name='sub_mer_id' v-model="sub_mer_id" />
            <input type='hidden' name='subject' v-model="subject" />
            <input type='hidden' name='gate_id' v-model="gate_id" />
            <input type='hidden' name='draw_fee' v-model="draw_fee" />
            <input type='hidden' name='check_value' v-model="check_value" />
            <input type='hidden' name='bank_num' v-model="bank_num" />

            <input type='hidden' name='ret_url' v-model="ret_url" />
            <input type='hidden' name='bg_ret_url' v-model="bg_ret_url" />
            <input type='hidden' name='mer_priv' v-model="mer_priv" />
            <input type='hidden' name='extension' v-model="extension" />
        </form>
    </van-cell-group>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      trans_amt: "",
      card_id: "",
      mobile_no: "",
      acct_cardno: "",
      acct_name: "",
      acct_idcard: "",
      trade_rate: "",
      sub_mer_id: "",

      bank_num: "",
      version: "",
      cust_id: "",
      ord_id: "",
      subject: "",
      gate_id: "",
      draw_fee: "",
      check_value: "",

      ret_url: "",
      bg_ret_url: "",
      mer_priv: "",
      extension: ""
    };
  },

  created() {
    debugger;
    this.trans_amt = Number(this.cards.trans_amt).toFixed(2);
    this.card_id = this.cards.card_id;
    this.mobile_no = this.cards.mobile_no;
    this.acct_cardno = this.cards.acct_cardno;
    this.acct_name = this.cards.acct_name;
    this.acct_idcard = this.cards.acct_idcard;
    this.trade_rate = this.cards.trade_rate;
    this.sub_mer_id = this.cards.sub_mer_id;

    this.bank_num = this.cards.bank_num;
    this.version = this.cards.version;
    this.cust_id = this.cards.cust_id;
    this.ord_id = this.cards.ord_id;
    this.subject = this.cards.subject;
    this.gate_id = this.cards.gate_id;
    this.draw_fee = this.cards.draw_fee;
    this.check_value = this.cards.check_value;

    this.ret_url = this.cards.ret_url;
    this.bg_ret_url = this.cards.bg_ret_url;
    this.mer_priv = this.cards.mer_priv;
    this.extension = this.cards.extension;
  },
  computed: {
    ...mapGetters(["cards"])
  },
  mounted() {
    
    this.$refs.merRecvRequest.submit();
  }
};
</script>
