import * as Vuex from "vuex";
import Taro from '@tarojs/taro'
// 创建一个新的 store 实例
const store = Vuex.createStore({
    state() {
        return {
            pictures: []
        }
    },
    mutations: {
        LOAD_PICTURE_MUTATIONS: (state, pictures) => {
            state.pictures = pictures
        }
    },
    actions: {
        LOAD_PICTURE_MUTATIONS: async(context, { page = 1, limit = 30 }) => {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
            const res = await Taro.request({ url })
            context.commit("LOAD_PICTURE_MUTATIONS", res.data)
            console.log(context.state.pictures)
            return res.data
        }
    }
})

export default store