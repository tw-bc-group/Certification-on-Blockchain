//app.js
App({
    onLaunch: function () {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }
                        }
                    })
                }
            }
        });

        var colorList = this.globalData.importantLevelColor;
        var levelList = this.globalData.importantLevelList;
        var colorLevelMap = {};
        for (var index = 0; index < colorList.length; index++){
            var color = colorList[index];
            var level = levelList[index];
            colorLevelMap[color] = level;
        }

        this.globalData.importantLevelColorMap = colorLevelMap
    },
    onShow: function () {
        wx.onUserCaptureScreen(function (res) {
            wx.showToast({
                title: '截图了呀～',
                icon: 'success',
                duration: 1000,
            })
        })
    },
    globalData: {
        userInfo: null,
        curriculumList: ["普通心理学", "变态心理学", "现代心理与教育统计学", "心理测量与测验", "实验心理学", "发展心理学", "心理咨询与治疗", "社会心理学"],
        curriculumIndex: 0,
        importantLevelColor: ["red", "lightseagreen", "#9B9B9B"],
        importantLevelList: ["重点记忆", "记忆", "理解"],
        importantLevelIndex: 0,
        importantLevelColorMap: {}
    }
})