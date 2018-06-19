<template>

  <van-cell-group>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-field label="金额" placeholder="不能小于2000" icon="clear" required/>
    <van-field label="信用卡号" placeholder="卡号" icon="clear" required/>
    <van-field label="选择银行" placeholder="选择银行"  readonly="readonly" @click="onClick()" required>
      <van-icon slot="icon" name="add-o" @click="onClick()" />
    </van-field>
    <!-- <van-cell value="选择银行"></van-cell> -->
    <!-- <select>
          <section>111</section>
          <section>2222</section>
          <select> -->
    <!-- <van-picker :columns="columns" @change="onChange" visible-item-count="1"></van-picker> -->
    <van-field label="持卡人" placeholder="姓名" icon="clear" required/>
    <van-field label="手机号" placeholder="11位数字" icon="clear" required/>
    <van-button bottom-action class="card-btn">下一步</van-button>
    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" @change="onChange" :show-toolbar="true" @cancel="onCancel" @confirm="onConfirm" :visible-item-count="5"></van-picker>
    </van-popup>
  </van-cell-group>

</template>

 <script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
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
    },
    onClick() {
      this.show = true;
    },
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false;
    },
    onClickLeft() {
      this.$router.push("Home");
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
  background-color: #38f;
}
</style>




