// pages/binding & index/Teacher_MainUI/Teacher_MainUI.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: wx.getStorageSync("name"),
    date: '',
    ID: '',
    userType: wx.getStorageSync("type"),
    courseList: [],
    jwt: wx.getStorageSync("jwt"),
    courseInfo: [],
    avatarUrl:""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //console.log("当前时间戳为：" + timestamp);

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();


    this.data.date = date.toDateString()

    var getIPPort = app.globalData.IPPort;
    var self = this;
    var jwt = wx.getStorageSync('jwt')
    this.setData({
      date: date.getTime(),
      jwt: jwt
    })


    if (jwt != '') {
      wx.request({
        url: getIPPort + '/me',
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + jwt
        },
        success: function (result) {
          console.log(result)
          self.setData({
            userName: result.data.name,
            ID: result.data.number,
            avatarUrl: app.globalData.IPPort + "/avatar/" + result.data.avatar
          })

          if (result.data.type == 'teacher') {

            // 请求获取教师的课程信息
            wx.request({
              url: getIPPort + '/course',
              method: 'GET',
              header: {
                Authorization: 'Bearer ' + jwt
              },
              success: function (res) {
                //console.log(res)
                self.setData({
                  courseList: res.data
                })
              }
            })
            self.setData({
              userType: 'teacher'
            })
          }
          // 此处要再判断type类型而不能直接else，因为type会有null的情况
          else if (result.data.type == 'student') {

            // 请求获取学生的班级信息
            wx.request({
              url: app.globalData.IPPort + '/class',
              method: 'get',
              header: {
                Authorization: 'Bearer ' + jwt
              },
              success: function (res) {
                self.setData({
                  courseInfo: res.data
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
            // 请求结束
            self.setData({
              userType: 'student'
            })
          } else {
            self.setData({
              useType: null
            })
          }
        }
      });

    }

  },

  onClickClass: function (e) {
    //console.log(e.currentTarget.dataset.courseObj.id);
    wx.navigateTo({//这个传参还不确定
      url: '../../Teacher/CourseUI?course=' + JSON.stringify(e.currentTarget.dataset.courseObj),
    })
  },

  onCheckInfo: function () {
    wx.navigateTo({
      url: './CheckTeacherInfoUI',
    })
  },

  onChooseTeacher: function () {
    wx.navigateTo({
      url: '../Binding/TeacherBindingUI',
    })
  },

  onChooseStudent: function () {
    wx.navigateTo({
      url: '../Binding/StudentBindingUI',
    })
  },


  onClickCourse: function (e) {
    var cid = e.currentTarget.id
    var courseId = e.currentTarget.dataset.courseId
    console.log(cid)
    for (var i = 0; i < this.data.courseInfo.length; ++i)
      if (this.data.courseInfo[i].id == cid)
        var cname = this.data.courseInfo[i].courseName
    var data = {
      //studentID: this.data.ID,
      studentID: wx.getStorageSync('id'),
      classID: cid,                    //id
      courseID: courseId,
      courseName: cname,           //这四个靠前面传过来
    }
    wx.navigateTo({
      url: '../../Student/CourseUI?str=' + JSON.stringify(data),
    })
  }
})