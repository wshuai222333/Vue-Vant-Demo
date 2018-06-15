<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
/**
 * 引入自定义组件
 */
import HeaderComponent from "./header";
import FooterComponent from "./footer";

export default {
  name: "SharedComponent",
  components: {
    "app-header": HeaderComponent,
    "app-footer": FooterComponent
  },
  methods: {
   
  },
  computed: {
    
  }
};
    
</script>