// pages/binding & index/Teacher_MainUI/CheckTeacherInfoUI.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    teacherID: "",
    phoneNum: "",
    school: "",
    usertype: "",
    avatarUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getIPPort = app.globalData.IPPort;
    var self = this;
    var usertype = wx.getStorageSync('type')
    this.setData({
      usertype: usertype,
      avatarUrl: 'http://120.77.173.98:8102/avatar/ghg'
    })
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: getIPPort + '/me',
      // header: { 'Content-Type': wx.getStorage('jwt') },
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (result) {
        //console.log(result)
        self.setData({
          userName: result.data.name,
          school: result.data.school.name,
          teacherID: result.data.number,
          phoneNum: result.data.phone,
        })
      }
    })
  },

  changPortrait: function () {
    console.log(2)
    var self = this
    var jwt = wx.getStorageSync('jwt')
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        self.data.photoPath = res.tempFilePaths
        console.log(self.data.photoPath)
        wx.uploadFile({
          url: app.globalData.IPPort + '/upload/avatar',
          filePath: self.data.photoPath[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          header:{
            Authorization:"Bearer " + jwt
          },
          success: function (res) {
            console.log(res.data)
          },
          fail: function () {
            wx.showToast({
              title: '失败',
              icon: 'fail',
              duration: 1000,
              mask: true
            })
          }
        })
      }
    })
  },

  onUnBind: function () {
    var IPPort = app.globalData.IPPort
    var self = this
    var page = getCurrentPages()
    wx.showModal({
      title: '提示',
      content: '是否解绑账号？',
      success: function (res) {
        if (res.confirm) {

          wx.login({
            success:function(res) {
              wx.request({
                url: IPPort + '/me/unbind',
                header: {
                  Authorization: "Bearer " + wx.getStorageSync("jwt")
                },
                data: {
                  "jsCode":res.code
                },
                method: 'PUT',
                success: function (resp) {

                  switch(resp.statusCode) {
                    case 204:
                      wx.setStorageSync('jwt', "")
                      wx.setStorageSync("type", "")
                      wx.setStorageSync("name", "")
                      wx.setStorageSync("id", "")
                      wx.reLaunch({
                        url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI',
                      })
                      break
                    case 403:
                      wx.showModal({
                        title: '信息提交异常',
                        content: '您可能尝试搞乱我们的系统.请不要这么做，不然大家OOAD都会0分.',
                        showCancel:false
                      })
                      break
                    case 406:
                      wx.showModal({
                        title: '获取openid异常',
                        content: '请重新提交',
                        showCancel: false
                      })
                      break
                    default:
                      wx.showModal({
                        title: '未知的错误',
                        content: '出现了未知的错误',
                        showCancel: false
                      })
                  }
                  
                  // var pages = page[page.length - 2]
                  // pages.setData({
                  //   userType: ''
                  // })

                  // console.log(wx.getStorageSync("jwt"))
                  // // wx.reLaunch({
                  // //   url: '/pages/login'
                  // // })
                  // wx.navigateBack({
                  //   delta: 1
                  // })
                }
              })
            }
          })
         
        }
      }
    })
  }

})