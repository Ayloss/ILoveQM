// pages/Student/Seminar/Scoring/Score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: 'OOAD',
    seminarID: "",
    group:[],
    presentationGrade:[]
  },
  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    console.log(temp)
    this.setData({
      seminarID: temp.seminarID,
      studentID: temp.studentID,
      classID: temp.classID,
      courseID: temp.courseID,
      courseName: temp.courseName,
    })

    wx.request({                    //请求小组
      url: app.globalData.IPPort +'/seminar/'+this.data.seminarID+'/group?gradeable={true}',
      method: 'get',
      success: function (res) {
        self.setData({
          group: res.data
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

  submit:function()
  {
    wx.request({                    
      url: app.globalData.IPPort + '/group/' + this.data.groupID + '/grade/'+this.data.studentID,
      method: 'put',
      data: JSON.stringify(presentationGrade),
      success: function (res) {
       
      },
      fail: function () {
        wx.showToast({
          title: '提交失败',
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