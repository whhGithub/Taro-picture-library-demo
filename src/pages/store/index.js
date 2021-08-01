import * as Vuex from "vuex";
import Taro from '@tarojs/taro'
// 创建一个新的 store 实例
const store = Vuex.createStore({
    state() {
        return {
            pictures: [],
            page: 1,
        }
    },
    mutations: {
        LOAD_PICTURE_MUTATIONS: (state, pictures) => {
            state.pictures.push(pictures)
            console.log(state.pictures)
        }
    },
    actions: {
        LOAD_PICTURE_MUTATIONS: async(context, { page = 1, limit = 12 }) => {
            console.log(page + "-" + limit);
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
            const res = await Taro.request({ url })
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].isCollect = false
                context.commit("LOAD_PICTURE_MUTATIONS", res.data[i])
            }
            return res.data
        }
    }
})

export default store