<template>
  <nut-button shape="round" type="primary" @click="getUserInfo">点击登陆</nut-button>
</template>

<script>
import Taro from "@tarojs/taro";
export default {
    name:"Index",
    setup(){
        const getUserInfo = () =>{
            console.log(1)
            Taro.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                }   
            })
        }
        return{
            getUserInfo
        }
    }
}
</script>

<style>

</style>