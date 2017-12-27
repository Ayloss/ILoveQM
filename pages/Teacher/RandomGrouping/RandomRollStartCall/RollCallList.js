// pages/Teacher/RandomGrouping/RandomRollStartCall/RollCallList.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classID: 0,
    seminar: {},
    className: "",
    studentNum: 0,
    attendStudnetList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classID: options.classID,
      seminar: JSON.parse(options.seminar)
    })
    var self = this
    var getIPPort = app.globalData.IPPort
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: getIPPort + '/class/' + self.data.classID,
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.setData({
          className: res.data.name,
          studentNum: res.data.numStudent
        })
      }
    })
    wx.request({
      url: getIPPort + '/seminar/' + self.data.seminar.id + '/class/' + self.data.classID + '/attendance/present',
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.setData({
          attendStudnetList: res.data
        })
      }
    })
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
  
  }
})