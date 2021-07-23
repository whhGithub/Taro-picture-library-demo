<template>
  <view class="index">
  <view v-if="loading">
    <nut-button loading>加载中</nut-button>
  </view>
  <view v-else>
    <view v-for="(item,index) in picture" :key= "item.id">
      <img :src="`https://picsum.photos/id/${item.id}/200`" @click="toDetail(index)">
      {{ index + "-" + item.author}}
    </view>
  </view>
  </view>
</template>

<script>
import { ref,computed,onMounted } from 'vue';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
export default {
  name: 'Index',
  components: {
   
  },
  setup(){
   Taro.pxTransform(10)
   const store = useStore();
   const loading = ref(false);
   const page = ref(0);
   const picture = computed(() => store.state.pictures);
   const loadMore = async () => {
      loading.value = true;
      try{
        const res = store.dispatch("LOAD_PICTURE_MUTATIONS",1);
      }catch(error){
        console.log(error);
      }finally{
        loading.value = false;
      }
   }
   const toDetail = (id) =>{
     if(id != null){
       Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
    })
    }
     
   }
   onMounted(() => {
    loadMore();
   }) 
   return {
     loading,
     picture,
     toDetail
   }
  }
}
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
