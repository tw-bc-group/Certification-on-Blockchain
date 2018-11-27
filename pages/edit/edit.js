// pages/edit/edit.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        curriculumList: [],
        curriculumIndex: 0,
        importantLevelColor: [],
        importantLevelList: [],
        importantLevelIndex: 0,
        word: {
            keyword: '',
            wordExplain: ''
        },
        dialog: {
            title: '',
            hidden: true,
            cancelText: '',
            confirmText: ''
        },
        whenDupWait: {
            keyword: '',
            curriculumObj: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            curriculumList: app.globalData.curriculumList,
            curriculumIndex: app.globalData.curriculumIndex,
            importantLevelColor: app.globalData.importantLevelColor,
            importantLevelList: app.globalData.importantLevelList,
            importantLevelIndex: app.globalData.importantLevelIndex
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

    bindCurriculumChange: function (e) {
        this.setData({
            curriculumIndex: e.detail.value
        });
    },
    bindImportantLevelChange: function(e) {
        this.setData({
            importantLevelIndex: e.detail.value
        });
    },
    keywordChange: function (e) {
        this.setData({
            "word.keyword": e.detail.value
        });
    },
    explainChange: function (e) {
        this.setData({
            "word.wordExplain": e.detail.value
        });
    },
    setStorage: function (e) {
        var wordData = this.data;
        var tag = wordData.curriculumList[wordData.curriculumIndex];
        var importantLevelColor = wordData.importantLevelColor[wordData.importantLevelIndex];
        var keyword = wordData.word.keyword;
        var explain = wordData.word.wordExplain;

        if (keyword.length == 0 || explain.length == 0) {
            wx.showModal({
                title: "保存数据失败",
                content: "词条或解释不能为空",
                showCancel: false,
                confirmText: "确定"
            });
        } else {
            var wordObj = {};
            var curriculumObj = wx.getStorageSync(keyword);
            if (curriculumObj.length == 0) {
                curriculumObj = wordObj;
            }

            if (!curriculumObj.explain && curriculumObj.tag != tag) {
                curriculumObj.tag = tag;
                curriculumObj.color = importantLevelColor;                
                curriculumObj.explain = explain;
                this.setStorageFunction(keyword, curriculumObj);
            } else {
                curriculumObj.tag = tag;
                curriculumObj.color = importantLevelColor;                
                curriculumObj.explain = explain;
                this.setData({
                    'dialog.hidden': false,
                    'dialog.title': '内容重复',
                    'dialog.cancelText': '删除本次',
                    'dialog.confirmText': '覆盖以前',
                    'whenDupWait.keyword': keyword,
                    'whenDupWait.curriculumObj': curriculumObj
                })
            }

            this.setData({
                "word.keyword": "",
                "word.wordExplain": ""
            });
        }
    },
    setStorageFunction: function (keyword, curriculumObj) {
        wx.setStorageSync(keyword, curriculumObj);
        wx.showModal({
            title: "保存成功",
            showCancel: false,
            confirmText: "确定"
        });
    },
    getStorage: function () {
        var wordData = this.data;
        var keyword = wordData.word.keyword;

        if (!keyword) {
            wx.showModal({
                title: "读取数据失败",
                content: "词条或解释不能为空",
                showCancel: false,
                confirmText: "确定"
            });
        } else {
            var storageData = wx.getStorageSync(keyword);
            if (!storageData) {
                wx.showModal({
                    title: "读取数据失败",
                    content: "词条或解释不存在",
                    showCancel: false,
                    confirmText: "确定"
                });
            } else {
                wx.showModal({
                    title: keyword,
                    content: storageData.explain,
                    showCancel: false,
                    confirmText: "确定"
                });
            }
        }
    },
    confirm: function () {
        var keyword = this.data.whenDupWait.keyword;
        var curriculumObj = this.data.whenDupWait.curriculumObj;

        this.setData({
            'dialog.hidden': true,
            'dialog.title': '',
            'dialog.content': ''
        });
        this.setStorageFunction(keyword, curriculumObj);
    },
    cancel: function () {
        this.setData({
            'dialog.hidden': true,
            'dialog.title': '',
            'dialog.content': ''
        });
    },
    clearStorage: function () {
        wx.clearStorageSync();
        wx.showModal({
            title: '清除成功',
            showCancel: false,
            confirmText: "确定"
        });
    }
})