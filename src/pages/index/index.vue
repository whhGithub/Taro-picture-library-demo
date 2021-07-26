<template>
  <view class="index">
    <view v-if="loading">
      <nut-button loading>加载中</nut-button>
    </view>
    <view v-else>
      <component-a></component-a>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Taro from "@tarojs/taro";
import ComponentA from "../component/infiniteloading.vue";
export default {
  name: "Index",
  components: { "component-a": ComponentA },
};
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
