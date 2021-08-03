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
import { computed } from "vue";
import ComponentA from "../component/infiniteloading.vue";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
export default {   
  name: "Index",
  components: { "component-a": ComponentA },
   setup() {
     const store = useStore();
     const picture = computed(() => store.state.pictures);
     const collectPicture = computed(() => store.state.collectPhotos);
     const page = computed(() => store.state.page);
     const isHasPhotos = computed(() => store.state.isHasPhotos);
     const photoAmount = computed(() => store.state.photoAmount);
     let myData = [picture.value,collectPicture.value,page.value,isHasPhotos.value,photoAmount.value];
     const switchInterface = (id) => {
      if(id === "shoucang"){
        Taro.switchTab({
          url: '/collect'
        })
       }
    };
    Taro.onAppHide(()=>{
      if(myData[0].length != 0){
        Taro.setStorageSync('data', myData)
        let value = Taro.getStorageSync('data')
        console.log(value)
      }
    })
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
