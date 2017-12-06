// pages/Teacher/RandomGrouping/RandomRollStartCall/RandomRollStartCall.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CallInRollCondition:0,
    seminar:{},
    studentNum:0,
    classID:1,
    className:"",
    nowStudentNum:9
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var getIPPort = app.globalData.IPPort;
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
      method:'PUT',
      data:{
        calling:"1"
      },
      success:function(res){
        //console.log(res)
      }
    })
    this.setData({
      CallInRollCondition: 1
    })
  },

  onEndCall:function(){
    const thisApp=this
    wx.showModal({
      title: '提示',
      content: '是否结束签到',
      success:function(res){
        if(res.confirm){
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
            CallInRollCondition:2
          })
        } else if(res.cancel) {
          console.log('user choose cancel')
        }
      }
    })
  },

  onRollCallList:function(){
    wx.navigateTo({
      url: './FixedCallList?classID=' + + JSON.stringify(this.data.classID) + '&seminar=' + JSON.stringify(this.data.seminar),
    })
  },

  onCheckList:function(e){
    //console.log('./FixedGroupInfo?classID=' + JSON.stringify(this.data.classID) + 'seminarID=' + JSON.stringify(this.data.seminarID))
    //console.log('test')
    wx.navigateTo({
      url: './FixedGroupInfo?classID=' + JSON.stringify(this.data.classID) + '&seminar=' + JSON.stringify(this.data.seminar)
    })
  }
})