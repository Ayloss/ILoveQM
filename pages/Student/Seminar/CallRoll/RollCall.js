// pages/Student/Seminar/CallRoll/RollCall.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    callCondition:0,

    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: 'OOAD',
    seminarID: "",

    teacher:'',
    email:'',
    startTime:'',
    endTime:'',
    site:'',
  },

  call:function()          //签到
  {
    var d={}
    wx.request({
      url: app.globalData.IPPort + '/class/' + this.data.classID + '/attendance/'+this.data.studentID,
      method: 'put',
      data:d,
      success: function (res) {
        self.setData({
          callCondition: res.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '操作失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    this.setData({
      seminarID: temp.seminarID,
      studentID: temp.studentID,
      classID: temp.classID,
      courseID: temp.courseID,
      courseName: temp.courseName,
    })

    wx.request({
      url: app.globalData.IPPort + '/seminar/' + this.data.seminarID ,
      method: 'get',
      success: function (res) {
        var temp=res.data
        self.setData({
          teacher: temp.teacherName,
          email: temp.teacherEmail,
          startTime: temp.startTime,
          endTime: temp.endTime,
          site: temp.site,
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