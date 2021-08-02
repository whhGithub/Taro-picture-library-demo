<template>
   <view class="index">
    <view v-if="isHasPhotos">
      <nut-button loading>暂无收藏</nut-button>
    </view>
    <view v-else>
    <view class="infiniteUl" id="scrollDemo">
      <view class="infiniteLi" v-for="(item, index) in photos" :key="index">
        <img
          :src="`https://picsum.photos/id/${item.id}/200`"
          class="resize"
        /> 
        <nut-collapse v-model:active="activeName" :accordion="true" icon="down-arrow">
        <nut-collapse-item :title="index+'-'+item.author" :name="index">
          <nut-cell title="author" icon="my" :desc = "`${item.author}`"></nut-cell>
          <nut-cell title="pictureID" icon="issue" :desc = "`${item.idx}`" ></nut-cell>
          <nut-cell title="width" icon="date" :desc = "`${item.width}`" ></nut-cell>
          <nut-cell title="height" icon="date" :desc = "`${item.height}`" ></nut-cell>
          <nut-cell title="isCollect" icon="date" :desc = "`${item.isCollect}`" ></nut-cell>
          <!-- <nut-cell title="url" icon="link" :desc = "`${item.url}`" is-link @click="GoIndex"></nut-cell> -->
          <!-- <nut-notify @click="onClick" @closed="onClosed" :type="notifyState.state.type" v-model:visible="notifyState.state.show" :msg="notifyState.state.desc" /> -->
          <nut-button shape="round" type="primary" @click="cancelCollect(item.idx)">取消收藏</nut-button>
        </nut-collapse-item>
        </nut-collapse>  
      </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, reactive,toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "Index",
  setup() {
    const activeName = ref(-1);
    const store = useStore();
    const isHasPhotos = ref(true);
    const photos = computed(() => {
      const photo = []
      for(var i = 0; i < store.state.pictures.length; i++){
        if(store.state.pictures.length > 0){
          if(store.state.pictures[i].isCollect === true){
              store.state.pictures[i].idx = i
              photo.push(store.state.pictures[i])
              console.log(photos)
          }
        }
      }
      return photo
    });
    if(photos != null){
      isHasPhotos.value = false
    }
    const cancelCollect = (id) =>{
      store.state.pictures[id].isCollect = false
    }
    const notifyState = {
      state: reactive({
        show: false,
        desc: '',
        type: 'primary'
      }),
      methods: {
        cellClick(type, desc) {
          notifyState.state.show = true;
          notifyState.state.type = type;
          notifyState.state.desc = desc;
        }
      }
    };
    return {
      isHasPhotos,
      photos,
      activeName,
      notifyState,
      cancelCollect
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
