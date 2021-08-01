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
import ComponentA from "../component/infiniteloading.vue";
import Taro from "@tarojs/taro";
export default {   
  name: "Index",
  components: { "component-a": ComponentA },
   setup() {
     const switchInterface = (id) => {
      if(id === "shoucang"){
        Taro.switchTab({
          url: '/collect'
        })
       }
    };
    return{
      switchInterface
    }
   }
};
</script>

<style lang="scss">
  .content{
    font-size: 10px;
    width:30px;
    height: 30px;
  }
</style>
