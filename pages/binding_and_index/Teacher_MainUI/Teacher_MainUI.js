// pages/binding & index/Teacher_MainUI/Teacher_MainUI.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    teacherID: "",
    courseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getIPPort = app.globalData.IPPort;
    var self = this;
    wx.request({
      url: getIPPort + '/me',
      //header: { 'Content-Type': wx.getStorage('jwt') },
      method:'GET',
      success: function (result) {
        //console.log(result)
        self.setData({
          userName: result.data.name,
          teacherID: result.data.number,
        })
      }
    });
    wx.request({
      url: getIPPort+'/course',
      method:'GET',
      success:function(res){
        //console.log(res)
        self.setData({
          courseList:res.data
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

  onClickClass:function(e){
    //console.log(e.currentTarget.dataset.courseObj.id);
    wx.navigateTo({//这个传参还不确定
      url: '../../Teacher/CourseUI?courseID=' + JSON.stringify(e.currentTarget.dataset.courseObj.id),
    })
  },

  onCheckInfo:function(){
    wx.navigateTo({
      url: './CheckTeacherInfoUI',
    })
  }
})