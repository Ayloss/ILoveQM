// pages/Student/CourseUI.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:{},
    seminarList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    var IPPort=app.globalData.IPPort
    this.setData({
      course: JSON.parse(options.course),
    })
    wx.request({
      url: IPPort+'/course/'+self.data.course.id+'/seminar',
      data:{
        embedGrade:'false'
      },
      method:'GET',
      success:function(res){
        self.setData({
          seminarList:res.data
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

  onClickSeminar:function(e){
    wx.navigateTo({
      url: './class-manage/class-manage?seminar=' + JSON.stringify(e.currentTarget.dataset.seminarObj)+'&course='+JSON.stringify(this.data.course),
    })
  }
})