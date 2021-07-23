<template>
  <view class="detail">
    <view>
       <img :src="`https://picsum.photos/id/${pictureInfo.id}/200`">
       <view>
         id:{{pictureID}}
       </view>
       <view>
         作者:{{pictureInfo.author}}
       </view>
       <view>
         来自:{{pictureInfo.url}}
       </view>
       <view>
         宽度:{{pictureInfo.width}}
       </view>
        <view>
         高度:{{pictureInfo.height}}
       </view>
   </view>
  </view>
</template>

<script>
import {ref,computed,onMounted} from 'vue'
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
export default {
name: 'detail',
  setup(){
    const instance = Taro.getCurrentInstance()
    const loading = ref(false);
    const store = useStore();
    const picture = store.state.pictures
    const pictureID = instance.router.params.id
    const pictureInfo = picture[pictureID]
   return {
     loading,
     pictureInfo,
     pictureID
   }
  }
}
</script>


<style lang="scss">
.detail {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>