import * as Vuex from "vuex";
import Taro from '@tarojs/taro'
// 创建一个新的 store 实例
const store = Vuex.createStore({
    state() {
        return {
            pictures: [],
            collectPhotos: [],
            page: 0,
        }
    },
    mutations: {
        LOAD_PICTURE_MUTATIONS: (state, pictures) => {
            state.pictures.push(pictures)
        },
        toCollect: (state, pictures) => {
            state.collectPhotos.push(pictures)
        },
        cancelCollect: (state, id) => {
            // state.collectPhotos.splice(id, 1);
            state.collectPhotos.some((item, i) => {
                if (item.id == id) {
                    state.collectPhotos.splice(i, 1)
                    return true
                }
            })
        },
        loadingAll: (state, data) => {
            state.collectPhotos = data
        }
    },
    actions: {
        LOAD_PICTURE_MUTATIONS: async(context, { page = 1, limit = 12 }) => {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
            const res = await Taro.request({ url })
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].is_collect = false
                context.commit("LOAD_PICTURE_MUTATIONS", res.data[i])
            }
            for (var i = 0; i < store.state.collectPhotos.length; i++) {
                if (store.state.pictures.findIndex((item) => item.id === store.state.collectPhotos[i].id) != -1) {
                    store.state.pictures[store.state.pictures.findIndex((pictures) => pictures.id === store.state.collectPhotos[i].id)].is_collect = store.state.collectPhotos[i].is_collect
                }
            }
            return res.data
        }
    }
})

export default store