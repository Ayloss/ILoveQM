var app = getApp();// pages/Student/Seminar/Seminar.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: '652',      
    seminarID:1,
    seminarName:"1",


    seminarData:''
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

  score: function () {
    var data = {
      'studentID': this.data.studentID, 'classID': this.data.classID,
      'courseID': this.data.courseID, 'courseName': this.data.courseName, 'seminarID':this.data.seminarID
    }
    wx.navigateTo({
      url: 'Scoring/Score?str=' + JSON.stringify(data),
    })
  },

  group:function(){
    var data = {
      'studentID': this.data.studentID, 'classID': this.data.classID,
      'courseID': this.data.courseID, 'courseName': this.data.courseName, 'seminarID': this.data.seminarID, 'groupMethod': this.data.seminarData.groupingMethod, 'isLeader': this.data.seminarData.isLeader, 'areTopicsSelected': this.data.seminarData.areTopicsSelected
    }
    console.log(this.data.seminarData.areTopicsSelected)
    wx.navigateTo({
      url: 'group/group?str=' + JSON.stringify(data),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   //从courseUI进来
    var temp = JSON.parse(options.str)
    console.log(temp)
  this.setData({
    seminarID: temp.seminarID,
    studentID: temp.studentID,
    classID:  temp.classID,
    courseID: temp.courseID,
    courseName: temp.courseName, 
    seminarName: temp.seminarName
  })
  this.getData()
  },
  
  getData:function(){   //获得关于讨论课信息的数据
    var self =this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/seminar/'+this.data.seminarID+'/my',
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        var temp = res.data
        console.log(temp)
        self.setData({
          seminarData:temp
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