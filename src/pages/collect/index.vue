<template>
  <view class="index">
    <view v-if="isHasCollectPhotos.length">
      <view class="infiniteUl" id="scrollDemo">
        <nut-collapse
          v-model:active="activeName"
          :accordion="true"
          icon="down-arrow"
          rotate="90"
        >
          <view class="infiniteLi" v-for="(item, index) in photos" :key="index">
            <img
              :src="`https://picsum.photos/id/${item.id}/200`"
              class="resize"
            />

            <nut-collapse-item :title="index + '-' + item.author" :name="index">
              <nut-cell
                title="author"
                icon="my"
                :desc="`${item.author}`"
              ></nut-cell>
              <nut-cell
                title="pictureID"
                icon="issue"
                :desc="`${item.id}`"
              ></nut-cell>
              <nut-cell
                title="width"
                icon="date"
                :desc="`${item.width}`"
              ></nut-cell>
              <nut-cell
                title="height"
                icon="date"
                :desc="`${item.height}`"
              ></nut-cell>
              <nut-cell
                title="is_collect"
                icon="date"
                :desc="`${item.is_collect}`"
              ></nut-cell>
              <nut-button
                shape="round"
                type="primary"
                @click="cancelCollect(item.id, item.author)"
                >取消收藏</nut-button
              >
            </nut-collapse-item>
          </view>
        </nut-collapse>
      </view>
    </view>
    <view v-else>
      <nut-row>
        <nut-col :span="24">
          <nut-button loading class="collect">暂无收藏</nut-button>
        </nut-col>
      </nut-row>
    </view>
    <nut-toast
      :msg="page.state.msg"
      v-model:visible="page.state.show"
      :type="page.state.type"
      @closed="page.methods.onClosed"
      :cover="page.state.cover"
    />
  </view>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "Index",
  setup() {
    const activeName = ref(1);
    const store = useStore();
    const isHasCollectPhotos = computed(() => store.state.collectPhotos);
    const photos = store.state.collectPhotos;
    const cancelCollect = (idx, author) => {
      page.methods.openToast("success", `成功取消对${author}的作品的收藏`);
      store.state.pictures[
        store.state.pictures.findIndex((pictures) => pictures.id === idx)
      ].is_collect = false;
      store.commit("cancelCollect", idx);
    };
    const page = {
      state: reactive({
        msg: "toast",
        type: "text",
        show: false,
        cover: false,
      }),
      methods: {
        openToast: (type, msg, cover = false) => {
          page.state.show = true;
          page.state.msg = msg;
          page.state.type = type;
          page.state.cover = cover;
        },
        onClosed: () => console.log("closed"),
      },
    };
    return {
      isHasCollectPhotos,
      photos,
      activeName,
      page,
      cancelCollect,
    };
  },
};
</script>

<style lang="scss">
.collect {
  margin: 0px auto;
}
.infiniteUl {
  height: 600px;
  width: 375px;
  overflow-y: auto;
  overflow-x: hidden;
}
.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(100, 100, 100, 1);
  text-align: center;
}
.loading {
  display: block;
  width: 100%;
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
</style>
