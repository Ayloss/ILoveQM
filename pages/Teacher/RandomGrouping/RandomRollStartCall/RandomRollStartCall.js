// pages/Teacher/RandomGrouping/RandomRollStartCall/RandomRollStartCall.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CallInRollCondition:0,
    studentNum: 0,
    classID: 0,
    className: "",
    nowStudentNum: 37,
    seminar:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//这里需要判断当前签到清空进行跳转
    var self = this;
    var getIPPort = app.globalData.IPPort;
    //console.log(options.classID)
    this.setData({
      classID: options.classID,
    })
    wx.request({
      url: getIPPort + '/class' + '/' + self.data.classID,
      method: 'GET',
      success: function (res) {
        //console.log(res)
        self.setData({
          seminar: JSON.parse(options.seminar),
          className: res.data.name,
          studentNum: res.data.numStudent
        })
        var status = ""
        wx.request({
          url: getIPPort + '/seminar/' + self.data.seminar.id + '/class/' + self.data.classID + '/attendance',
          method: 'GET',
          success: function (res) {
            self.setData({
              studentNum: res.data.numStudent,
              nowStudentNum: res.data.numPresent
            })
            status = res.data.status;
          }
        })
        if (status == "calling") {
          self.setData({
            CallInRollCondition: 1
          })
        }
        if (status == "notstart") {
          self.setData({
            CallInRollCondition: 0
          })
        }
        if (status == "end") {
          self.setData({
            CallInRollCondition: 2
          })
        }
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

  },

  onStartCall:function(){
    var self = this;
    var getIPPort = app.globalData.IPPort;
    wx.request({
      url: getIPPort + '/class' + '/' + self.data.classID,
      method: 'PUT',
      data: {
        calling: "1"
      },
      success: function (res) {
        //console.log(res)
      }
    })
    this.setData({
      CallInRollCondition: 1
    })
  },

  onEndCall:function(){
    const thisApp = this
    wx.showModal({
      title: '提示',
      content: '是否结束签到',
      success: function (res) {
        if (res.confirm) {
          var getIPPort = app.globalData.IPPort;
          wx.request({
            url: getIPPort + '/class' + '/' + thisApp.data.classID,
            method: 'PUT',
            data: {
              calling: "-1"
            },
            success: function (res) {
              //console.log(res)
            }
          })
          thisApp.setData({
            CallInRollCondition: 2
          })
        } else if (res.cancel) {
          console.log('user choose cancel')
        }
      }
    })
  },

  onRollCallList:function(){
    //console.log(this.data.classID)
    wx.navigateTo({
      url: './RollCallList?classID=' + this.data.classID + '&seminar=' + JSON.stringify(this.data.seminar),
    })
  },

  onCheckList:function(e){
    //console.log('./FixedGroupInfo?classID=' + JSON.stringify(this.data.classID) + 'seminarID=' + JSON.stringify(this.data.seminarID))
    wx.navigateTo({
      url: '../GroupInfo/GroupInfo?classID=' + this.data.classID + '&seminar=' + JSON.stringify(this.data.seminar)
    })
  }
})