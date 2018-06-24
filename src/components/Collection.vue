<template>
  <form action='http://pay.dingshuapay.com/netrecv/merchant/unionPay' method='post' onsubmit="false"  ref="merRecvRequest" name='merRecvRequest' target='_blank'>
    <van-cell-group>
      <van-nav-bar title="标题" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
      <van-field name='trans_amt' v-model="card.trans_amt" label="金额" icon="clear" placeholder="请输入500-20000的金额" required/>

      <van-field name='card_id' v-model="card.card_id" label="信用卡卡号" placeholder="请输入银行卡卡号" icon="clear" required/>
      <van-field name='mobile_no' v-model="card.mobile_no" label="预留手机号" placeholder="请输入银行预留手机号" icon="clear" required/>
      <van-field v-model="bank_name" label="选择银行" placeholder="选择银行" readonly="readonly" @click="onClick()" required>
        <van-icon slot="icon" name="add-o" @click="onClick()" />
      </van-field>
      <van-field name='acct_cardno' v-model="card.acct_cardno" label="收款银行卡号" placeholder="只可以是借记卡" icon="clear" required/>
      <van-field name='acct_name' v-model="card.acct_name" label="持卡人姓名" placeholder="必须和信用卡人名一致,否则无法提现" icon="clear" required/>
      <van-field name='acct_idcard' v-model="card.acct_idcard" label="持卡人身份证" placeholder="仅支持18位身份证" icon="clear" required/>
      <van-field name='trade_rate' label="费率" v-model="card.trade_rate" error required></van-field>
      <input type='hidden' name='version' v-model="card.version" />
      <input type='hidden' name='cust_id' v-model="card.cust_id" />
      <input type='hidden' name='ord_id' :value="card.ord_id" />
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
      <van-button type='submit' bottom-action class="card-btn">下一步</van-button>
       <button type="submit" style="cursor:pointer;">提交</button>
      <van-popup v-model="show" position="bottom">
        <van-picker :columns="columns" :show-toolbar="true" @confirm="onConfirm" :visible-item-count="5"></van-picker>
      </van-popup>
    </van-cell-group>
  </form>
</template>

 <script>
import { Toast } from "vant";
import UtilService from "./_common/util.service.js";
import EncryptService from "./_common/encrypt.service.js";
export default {
  data() {
    return {
      show: false,
      bank_name: "",
      card: {
        trans_amt: "",
        card_id: "",
        mobile_no: "",
        acct_cardno: "",
        acct_name: "",
        acct_idcard: "",
        trade_rate: "4.10",
        sub_mer_id: "",

        bank_num: "",
        version: "01",
        cust_id: "4001353374",
        ord_id: "",
        subject: "一元商场",
        gate_id: "1010",
        draw_fee: "1.00",
        check_value: "",

        ret_url: "http://www.baidu.com",
        bg_ret_url: "http://www.baidu.com",
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
      ]
    };
  },
  methods: {
    onChange(picker, value, index) {
      Toast(`当前值：${value.text}, 当前索引：${value.value}`);
    },
    onClick() {
      this.show = true;
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
    onClickLeft() {
      this.$router.push("Home");
    },
    OnSubmit:function (){
      debugger;
      this.card.ord_id = UtilService.GenerateOrderIdByTime();
      this.card.sub_mer_id = this.card.acct_idcard;
      this.card.check_value = EncryptService.GetCheckValue(this.card);
      if(true)
      {
        return false;
      }
      return true;
      //this.$refs.merRecvRequest.submit();
      //var formData = JSON.stringify(this.card); // 这里才是你的表单数据
    }
  }
};
</script>

<style scoped>
.card-btn {
  font-size: 22px;
  /* width: 91%; */
  /* margin: 15px; */
  /* height: 45px; */
  background-color: #38f;
}
</style>




