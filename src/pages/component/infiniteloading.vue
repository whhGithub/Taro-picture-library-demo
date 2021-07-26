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
      <view class="infiniteLi" v-for="(item, index) in picture" :key="item.id">
        <img
          :src="`https://picsum.photos/id/${item.id}/200`"
          @click="toDetail(index)"
        /> 
        {{ index + "-" + item.author }}
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
    const loadMore = async () => {
      setTimeout(() => {
      loading.value = true;
      console.log("触发")
      try {
        const res = store.dispatch("LOAD_PICTURE_MUTATIONS", {page : page.value});    
        page.value++;
        console.log(page)
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
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
