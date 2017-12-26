var app = getApp();// pages/Student/Seminar/CourseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseID:'',
    name: "OOAD1",
    description: "面向对象分析与设计",
    teacherName: "邱明",
    teacherEmail: "mingqiu@xmu.edu.cn"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid= JSON.parse(options.str)
    var self=this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/course/' + cid,
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        var temp=res.data
        self.setData({
          name: temp.name,
          description: temp.description,
          teacherName: temp.teacherName,
          teacherEmail: temp.teacherEmail
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