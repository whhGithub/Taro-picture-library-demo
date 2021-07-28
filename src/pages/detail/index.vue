<template>
  <view class="detail">
    <view>
      <img
        :src="`https://picsum.photos/id/${pictureInfo.id}/200`"
        class="resize"
      />
      <nut-cell title="author" icon="my" :desc = "`${pictureInfo.author}`" ></nut-cell>
      <nut-cell title="pictureID" icon="issue" :desc = "`${pictureID}`" ></nut-cell>
      <nut-cell title="width" icon="date" :desc = "`${pictureInfo.width}`" ></nut-cell>
      <nut-cell title="height" icon="date" :desc = "`${pictureInfo.height}`" ></nut-cell>
      <nut-cell title="url" icon="link" :desc = "`${pictureInfo.url}`" is-link @click="GoIndex"></nut-cell>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Taro from "@tarojs/taro";
export default {
  name: "detail",
  setup() {
    const instance = Taro.getCurrentInstance();
    const loading = ref(false);
    const store = useStore();
    const picture = store.state.pictures;
    const pictureID = instance.router.params.id;
    const pictureAuthor = instance.router.params.author;
    console.log
    const pictureInfo = picture[pictureID];
    const GoIndex = () => {
      Taro.navigateBack({
        delta: 2,
      });
    };
    return {
      loading,
      pictureInfo,
      pictureID,
      pictureAuthor,
      GoIndex
    };
  },
};
</script>

<style lang="scss">
.detail {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.resize {
  max-width: 100%;
  height: 300px;
  width: 95%;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}
// .flex-content{
// background-color: ;
// }
</style>
