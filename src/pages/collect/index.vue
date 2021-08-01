<template>
  <view>
      
  </view>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    name: "Index",
    setup() {
      const isHasPhotos = ref(false);
      const store = useStore();
      const picture = computed(() => store.state.pictures);
      return{
        isHasPhotos
      }
    }
}
</script>

<style>

</style>