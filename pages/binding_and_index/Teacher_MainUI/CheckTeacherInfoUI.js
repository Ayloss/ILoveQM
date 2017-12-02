// pages/binding & index/Teacher_MainUI/CheckTeacherInfoUI.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    teacherID: "",
    phoneNum: "",   //这里的手机号码url还有问题
    school: "厦门大学"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getIPPort = app.globalData.IPPort;
    var self = this;
    wx.request({
      url: getIPPort+'/me',
      //header: { 'Content-Type': wx.getStorage('jwt') },
      method: 'GET',
      success:function(result){
        //console.log(result)
        self.setData({
          userName:result.data.name,
          teacherID: result.data.number,
          phoneNum: result.data.number,
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