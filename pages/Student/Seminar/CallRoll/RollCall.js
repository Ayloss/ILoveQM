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


  callRoll:function( d)          //签到
  {
   
    var self =this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/seminar/' + this.data.seminarID + '/class/' + this.data.classID +'/attendance/'+this.data.studentID,
      method: 'put',
      header:{
        Authorization: 'Bearer ' + jwt
      },
      data:d,
      success: function (res) {
        console.log(res.data)
        if (res.data.status=="late")
        self.setData({
          callCondition: 2
        })
        else if (res.data.status == "normal")
          self.setData({
            callCondition: 1
          })
          else{   //否则认为签到失败
          wx.showToast({
            title: '签到失败',
            icon: 'fail',
            duration: 1000,
            mask: true
          })
          }
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
  call: function () {
    var d = {}
    var self=this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        d.longitude = res.longitude,
          d.latitude = res.latitude
        self.callRoll(d)
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
    var self=this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/seminar/' + this.data.seminarID+'/detail' ,
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        var temp=res.data
        console.log(temp)
        self.setData({
          teacher: temp.teacherName,
          email: temp.teacherEmail,
          startTime: temp.startTime,
          endTime: temp.endTime,
          site: temp.site,
          callCondition:temp.callCondition                 //获得当前签到状态
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