// pages/class-management/class-manage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseID:0,
    courseName:"",
    seminarID:0,
    seminarName:"",
    groupingMethod:"",
    startTime: "2017-09-25",
    endTime: "2017-10-09"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseID: JSON.parse(options.courseID)
    })
    var getIPPort = app.globalData.IPPort;
    var courseID = this.data.courseID;
    var self = this;
    //console.log(courseID);
    //course信息
    wx.request({
      url: getIPPort + '/course' + '/' + courseID,
      method:'GET',
      success:function(res){
        console.log(res.data.name)
        self.setData({
          courseName: res.data.name
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

  onGroupingPage:function(){
    wx.navigateTo({
      url: '../RandomGrouping/RandomRollStartCall/RandomRollStartCall',
    })
  }
})