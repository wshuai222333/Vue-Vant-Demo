<template>
  <div>
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft"></van-nav-bar>

    <div class="weui-article">

      <h1 v-text="title"></h1>
      <section>
        <van-icon name="underway" color="#ebebeb"/>   <h2 v-text="modifytime.split(' ')[0]"></h2>
        <section>
          <div v-html="body">

          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import Service from "./_common";
export default {
  data() {
    return {
      title: "",
      body: "",
      modifytime: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("Problem");
    }
  },
  created() {
  
    let problemId = this.$route.params.ProblemId;
    this.$http
      .post(
        "/api/User/GetProblem",
        Service.Encrypt.DataEncryption({
          ProblemId: this.$route.params.ProblemId
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
              this.title = response.data.Data.Title;
              this.modifytime = response.data.Data.MotifyTime;
              this.body = response.data.Data.Body;
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
  }
};
</script>

<style scoped>
.van-icon{
  float:left;
  padding-top: 2px;
}
.weui-article {
  padding: 20px 15px;
  font-size: 15px;
}

.weui-article section {
  margin-bottom: 1.5em;
}

.weui-article h1 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0.9em;
}

.weui-article h2 {
  font-size: 16px;
  padding-left: 20px;
}

.weui-article h2,
.weui-article h3 {
  font-weight: 400;
  margin-bottom: 0.34em;
}

.weui-article h3 {
  font-size: 15px;
}

.weui-article * {
  max-width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
}

.weui-article p {
  margin: 0 0 0.8em;
}
</style>
