// pages/Student/Seminar/CallRoll/RollCall.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 课程的签到状态
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

    // 使用加载中遮罩，防止用户多次点击
    wx.showLoading({
      title: '正在提交信息',
      mask:true,
      success:function() {

        //提交数据
        wx.request({
          url: app.globalData.IPPort + '/seminar/' + self.data.seminarID + '/class/' + self.data.classID + '/attendance/' + self.data.studentID,
          method: 'put',
          header: {
            Authorization: 'Bearer ' + jwt
          },
          data: d,
          success: function (res) {
            console.log(res.data)
            // 隐藏加载框
            wx.hideLoading()
            switch (res.data.status) {
              
              // 课堂还未开始签到
              case 1:
                wx.showModal({
                  title: '签到暂未开始',
                  content: '',
                  showCancel: false
                })
                break
              // 学生已经签到
              case 2:
                wx.showModal({
                  title: '您已经签到',
                  content: '',
                  showCancel: false
                })
                break
              // 正常签到
              case 3:
                wx.showModal({
                  title: '签到成功',
                  content: '您正常签到',
                  showCancel: false
                })
                self.setData({
                  callCondition:1
                })
                break
              // 迟到签到
              case 4:
                wx.showModal({
                  title: '签到成功',
                  content: '您已经迟到',
                  showCancel: false
                })
                self.setData({
                  callCondition: 2
                })
                break
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
      }
    })
    // 修改学生的签到状态
   
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
    // 获取课程的详情
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
          callCondition:temp.callCondition//获得当前课程的签到状态
        })
      }
    })
  }



})