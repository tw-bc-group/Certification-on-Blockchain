// pages/allWords/allWords.js
var app = getApp();
const util = require('../../utils/util.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        desc: "",
        importantLevelColor: "",
        keyList: [],
        keyIndex: 0,
        explain: "",
        ifDisable: true,
        leftarrow: "../resource/138-arrow-left.png",
        rightarrow: "../resource/136-arrow-right.png"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var tag;
        var importantLevelColor;
        var explain;
        var title;
        var res = wx.getStorageInfoSync();
        var keyList = res.keys;

        if(keyList.length == 0){
            tag = null;
            title = null;
            explain = null;
            importantLevelColor = "#9B9B9B";
        }else{
            tag = wx.getStorageSync(keyList[0]).tag;
            explain = wx.getStorageSync(keyList[0]).explain;
            importantLevelColor = wx.getStorageSync(keyList[0]).color;
            title = keyList[0];
        }

        this.setData({
            keyList: keyList,
            title: title,
            desc: tag,
            explain: explain,
            importantLevelColor: importantLevelColor,
            keyIndex: 0       
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    editMode: function() {
        this.setData({
            ifDisable: false
        });
    }, 
    loseEditModeAndAutoSave: function() {
        var wordData = this.data;        
        var i = wordData.keyIndex;
        var t = wordData.keyList;
        // Lose edit mode
        this.setData({
            ifDisable: true
        });

        // Next function is to implement auto save function
        if(wordData.keyList.length > 0){
            var explain = wx.getStorageSync(t[i]).explain;
            var tag = wx.getStorageSync(t[i]).tag;
            var color = wx.getStorageSync(t[i]).color;
            var importantLevel = app.globalData.importantLevelColorMap[color];
            
            if (wordData.explain != explain){
                var needToUpdateObj = {};
                needToUpdateObj.tag = tag;
                needToUpdateObj.explain = wordData.explain;
                wx.setStorageSync(wordData.keyList[i], needToUpdateObj);
                wx.showModal({
                    title: "保存成功",
                    showCancel: false,
                    confirmText: "确定"
                });
            }

            var copyData = "\n词条：" + wordData.title + "\n类别：" + wordData.desc + "\n重要程度：" + importantLevel + "\n示意：\n" + wordData.explain + "\n\n" + "时间：" + util.formatTime(new Date()) + "\n--------------  我是分割线  --------------";
            wx.setClipboardData({
                data: copyData,
                success: function (res) {
                    wx.showToast({
                        title: "复制",
                        icon: "success",
                        duration: 1500
                    });
                }
            })
        }else{
            this.setData({
                explain: null
            });
        }
    },
    goToPrev: function() {
        var i = this.data.keyIndex;
        if(i > 0){
            var t = this.data.keyList;
            var tag = wx.getStorageSync(t[i - 1]).tag;
            var importantLevelColor = wx.getStorageSync(t[i - 1]).color;
            var explain = wx.getStorageSync(t[i - 1]).explain;
            this.setData({
                title: t[i - 1],
                desc: tag,
                importantLevelColor: importantLevelColor,
                explain: explain, 
                keyIndex: i - 1
            });
        }else{
            wx.showModal({
                content: "到头啦",
                showCancel: false,
                confirmText: "确定"
            });
        }
    },
    goToNext: function() {
        var i = this.data.keyIndex;
        var t = this.data.keyList;
        
        if((i + 1) < t.length){
            var tag = wx.getStorageSync(t[i + 1]).tag;
            var importantLevelColor = wx.getStorageSync(t[i + 1]).color;
            var explain = wx.getStorageSync(t[i + 1]).explain;
            this.setData({
                title: t[i + 1],
                desc: tag,
                importantLevelColor: importantLevelColor,
                explain: explain,
                keyIndex: i + 1
            });
        }else{
            wx.showModal({
                content: "到尾啦",
                showCancel: false,
                confirmText: "确定"
            });
        }
    },
    getInputValue: function(e) {
        this.setData({
            explain: e.detail.value
        });
    },
    deleteThisWord: function() {
        var keyList = this.data.keyList;
        
        if(keyList.length > 0){
            var wordIndex = this.data.keyIndex;
            var keyword = keyList[wordIndex];
            var that = this;

            wx.showActionSheet({
                itemList: ["删除"],
                success: function (res) {
                    if(res.tapIndex === 0){
                        wx.removeStorageSync(keyword);
                        wx.showModal({
                            content: "删除成功",
                            showCancel: false,
                            confirmText: "确定"
                        });
                        that.onLoad();
                    }
                }
            })
        }else{
            wx.showModal({
                content: "无词条可供删除",
                showCancel: false,
                confirmText: "确定"
            });
        }
    }
})