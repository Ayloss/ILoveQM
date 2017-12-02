// pages/Student/CourseUI.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID:1,
    classID:1,            
    courseID:1,
    courseName: 'OOAD',           //这四个靠前面传过来
    seminarList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*
  onLoad: function (options) {
    this.setData({
      courseName: JSON.parse(options.courseList)
    })*/
  onLoad: function () {
    var self = this;
    wx.request({
      url: app.globalData.IPPort + '/course/' + this.data.courseID+'/seminar',
      method: 'get',
      success: function (res) {
        self.setData({
          seminarList: res.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '页面加载失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    })  

  },
//跳到讨论课主页，传入讨论课id
  enterSeminar:function(event)
  {
    var data = {
      'studentID': this.data.studentID, 'classID':this.data.classID,   
      'courseID': this.data.courseID,'courseName': this.data.courseName, 'seminarID': 
        event.target.id }
    wx.navigateTo({
      url: 'Seminar/Seminar?str=' + JSON.stringify(data),
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