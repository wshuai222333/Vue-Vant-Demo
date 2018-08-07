<template>
  <div id="app">
    <transition name="van-slide-bottom">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}
</style>
