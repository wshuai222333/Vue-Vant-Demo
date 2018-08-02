  <template>
  <van-cell-group :border="show">
    <van-nav-bar title="" left-arrow @click-left="onClickLeft"></van-nav-bar>

  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      show:false
    };
  },
  methods:{
    onClickLeft() {
      this.$router.push("Home");
    },
  }
  
};
</script>

<style scoped>

</style>

