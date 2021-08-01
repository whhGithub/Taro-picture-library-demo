export default {
    pages: [
        'pages/index/index',
        'pages/detail/index',
        'pages/collect/index',
    ],
    "tabBar": {
        "list": [{
            "pagePath": 'pages/index/index',
            "text": "首页",
        }, {
            "pagePath": 'pages/collect/index',
            "text": "收藏页",
        }]
    },
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
    }
}