// pages/Teacher/RandomGrouping/RandomRollStartCall/RandomRollStartCall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CallInRollCondition:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      url: './RollCallList',
    })
  },

  onCheckList:function(){
    wx.navigateTo({
      url: '../GroupInfo/GroupInfo',
    })
  }
})