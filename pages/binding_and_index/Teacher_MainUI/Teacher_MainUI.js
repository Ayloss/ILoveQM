// pages/binding & index/Teacher_MainUI/Teacher_MainUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "邱明",
    teacherID: "2312312423",
    phoneNum: "18159215924",
    school: "厦门大学",
    courseList: ["J2EE", "操作系统", "OOAD","数据仓库"]
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

  onClickClass:function(e){
    console.log(e.currentTarget.dataset.courseObj);
    wx.navigateTo({
      url: '../../Teacher/class-manage/class-manage?courseName=' + JSON.stringify(e.currentTarget.dataset.courseObj),
    })
  },

  onCheckInfo:function(){
    wx.navigateTo({
      url: './CheckTeacherInfoUI',
    })
  }
})