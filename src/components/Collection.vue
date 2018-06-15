<template>
    <van-cell-group>
        <van-field v-model="value" label="金额" placeholder="不能小于2000" icon="clear" required/>
        <van-field v-model="value" label="信用卡号" placeholder="卡号" icon="clear" required/>
        <van-cell value="选择银行"></van-cell>
        <van-picker :columns="columns" @change="onChange" visible-item-count="1"></van-picker>
        <van-field v-model="value" label="持卡人" placeholder="姓名" icon="clear" required/>
        <van-field v-model="value" label="手机号" placeholder="11位数字" icon="clear" required/>
        <van-button bottom-action class="card-btn">支付</van-button>
    </van-cell-group>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      columns: [
        "工商银行",
        "建设银行",
        "农业银行",
        "中国银行",
        "招商银行",
        "兴业银行"
      ]
    };
  },
  methods: {
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    }
  }
};
</script>

<style>
.card-btn {
  font-size: 22px;
  /* width: 91%; */
  /* margin: 15px; */
  /* height: 45px; */
  background-color:#38f;
}
</style>




