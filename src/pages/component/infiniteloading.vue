<template>
  <view class="index">
    <view v-if="loading">
      <nut-button loading>加载中</nut-button>
    </view>
    <view v-else>
      <view class="infiniteUl" id="scrollDemo">
         <nut-infiniteloading
          pull-icon="JD"
          load-txt="loading"
          load-more-txt="没有啦～"
          :is-open-refresh="true"
          container-id="scrollDemo"
          :has-more="hasMore"
          @load-more="loadMore"
         >
      <view class="infiniteLi" v-for="(item, index) in picture" :key="index">
        <img
          :src="`https://picsum.photos/id/${item.id}/200`"
          @click="toDetail(index)"
          class="resize"
        /> 
        <view>{{ index + "-" + item.author }}</view>
      </view>
       </nut-infiniteloading>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Taro from "@tarojs/taro";
export default {
  name: "Index",
  components: {},
  setup() {
    Taro.pxTransform(10);
    const store = useStore();
    const loading = ref(false);
    const page = ref(1);
    const hasMore = ref(true);
    const picture = computed(() => store.state.pictures);
    const loadMore = async (done) => {
      setTimeout(() => {
      loading.value = true;
      console.log("触发")
      try {
        const res = store.dispatch("LOAD_PICTURE_MUTATIONS", {page : page.value});    
        page.value++;
        done();
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
     }, 500);
    };
    const toDetail = (id) => {
      if (id != null) {
        Taro.navigateTo({
          url: `/pages/detail/index?id=${id}`,
        });
      }
    };
    onMounted(() => {
      loadMore();
    });
    return {
      loading,
      picture,
      toDetail,
      loadMore,
      hasMore
    };
  },
};
</script>

<style lang="scss">
    .infiniteUl{
      height: 600px;
      width: 375px;
      overflow-y:auto;
      overflow-x:hidden;
    }
    .infiniteLi{
      margin-top:10px;
      font-size: 14px;
      color: rgba(100,100,100,1);
      text-align: center;
    }
    .loading{
      display: block;
      width: 100%;
      text-align: center;
    }
     .resize{
        max-width: 100%;
        height: 300px;
        width: 95%;
        margin: 10px;
        border-radius: 8px;
        box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%), 0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
    }
</style>
