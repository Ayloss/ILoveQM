// pages/Student/CourseUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseID:0,
    courseName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //这里问题很大，还不清楚此页面的url
  onLoad: function (options) {
    this.setData({
      courseID: JSON.parse(options.courseID)
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