<template>
  <view class="index">
    <view v-if="loading">
      <h1>欢迎使用picture-library</h1>
      <img :src="`https://picsum.photos/id/1/200`" class="resize" />
      <nut-button class="loginButton" @click="login()"
        >微信用户一键登录</nut-button
      >
      <nut-toast
        :msg="page.state.msg"
        v-model:visible="page.state.show"
        :type="page.state.type"
        @closed="page.methods.onClosed"
        :cover="page.state.cover"
      />
    </view>
    <view v-else>
      <component-a></component-a>
    </view>
  </view>
</template>

<script>
import { ref, reactive } from "vue";
import ComponentA from "../component/infiniteloading.vue";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
export default {
  name: "Index",
  components: { "component-a": ComponentA },
  setup() {
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
    const store = useStore();
    const loading = ref(true);
    // const loginUrl = "http://192.168.195.144:2333/login";
    // const getInfoUrl = "http://192.168.195.144:2333/user/fav";
    // const setInfoUrl = "http://192.168.195.144:2333/user/fav";
    const loginUrl = "http://10.1.86.79:1919/login";
    const getInfoUrl = "http://10.1.86.79:1919/user/fav";
    const setInfoUrl = "http://10.1.86.79:1919/user/fav";
    const switchInterface = (id) => {
      if (id === "shoucang") {
        Taro.switchTab({
          url: "/collect",
        });
      }
    };
    // 关闭app时发出post请求将数据储存到数据库中
    Taro.onAppHide(() => {
      if (store.state.collectPhotos.length > 0) {
        Taro.request({
          url: setInfoUrl,
          data: {
            favList: JSON.stringify(store.state.collectPhotos),
            nickName: Taro.getStorageSync("userinfo").userInfo.nickName,
            signature: Taro.getStorageSync("openid"),
          },
          method: "post",
        });
      }
    });
    const login = () => {
      Taro.getUserProfile({
        desc: "用于登录", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (userinfo) => {
          // 用户名的储存
          Taro.setStorageSync("userinfo", userinfo);
          Taro.login({
            success: (res) => {
              if (res.code) {
                // 后端端口以及第一次请求需要的数据参数
                const loginData = {
                  js_code: res.code,
                  appid: "wx276fa88d4f970b4d",
                  secret: "baccb969de5fdaf4b32f5e68742cda3b",
                };
                // 发送第一次请求
                Taro.request({
                  url: loginUrl,
                  data: loginData,
                  success: (res) => {
                    Taro.setStorageSync("openid", res.data.openid);
                    Taro.request({
                      url: getInfoUrl,
                      data: {
                        nickName: userinfo.userInfo.nickName,
                        signature: res.data.openid,
                      },
                      success: (res) => {
                        Taro.setStorageSync("data", res.data.data);
                        loading.value = false;
                      },
                    });
                  },
                });
              } else {
                console.log("登录失败！" + res.errMsg);
              }
            },
          });
        },
      });
    };
    return {
      switchInterface,
      login,
      loading,
      page,
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
  line-height: height;
}
.loginButton {
  width: 90%;
  display: inline-block;
  border-radius: 2cm;
  background-color: green;
  color: white;
}
</style>
