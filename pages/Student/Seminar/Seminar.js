// pages/Student/Seminar/Seminar.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: 'OOAD',      
    seminarID:""
  },


  sign: function () {
    var data = {
      'studentID': this.data.studentID, 'classID': this.data.classID,
      'courseID': this.data.courseID, 'courseName': this.data.courseName, 'seminarID':
      this.data.seminarID
    }
    wx.navigateTo({
      url: 'CallRoll/RollCall?str=' + JSON.stringify(data),
    })
  },

  socre: function () {
    var data = {
      'studentID': this.data.studentID, 'classID': this.data.classID,
      'courseID': this.data.courseID, 'courseName': this.data.courseName, 'seminarID':
      this.data.seminarID
    }
    wx.navigateTo({
      url: 'Scoring/Score?str=' + JSON.stringify(data),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    console.log(temp)
  this.setData({
    seminarID: temp.seminarID,
    studentID: temp.studentID,
    classID:  temp.classID,
    courseID: temp.courseID,
    courseName: temp.courseName, 
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