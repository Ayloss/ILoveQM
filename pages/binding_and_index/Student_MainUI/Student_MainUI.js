// pages/binding & index/Student_MainUI/Student_MainUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"韦小宝",
    studentID:"24320152202890",
    courseInfo: [{courseName:"J2EE",teacherName:"邱明"},
      { courseName: "操作系统", teacherName: "吴清强" },
      { courseName: "OOAD", teacherName: "邱明" },
      { courseName: "软件工程导论", teacherName: "王美红" },
    ]
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

  onCheckInfo:function(){
    wx.navigateTo({
      url: './CheckStudentInfoUI',
    })
  },

  onClickCourse:function(e){
    wx.navigateTo({
      url: '../../Student/CourseUI?courseName='+JSON.stringify(e.currentTarget.dataset.courseObj.courseName),
    })
  }
})