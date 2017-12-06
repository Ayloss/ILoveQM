var app = getApp();// pages/binding & index/Student_MainUI/CheckStudentInfoUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 3486,
    type: "fds",
    name: "fd",
    number: "fds",
    phone: "gdg",
    email: "gdfgdf",
    gender: "fds",
    school: {
      'id': 32,
      'name': "厦门大学"
    },
    title: "",
    avatar: "http://120.77.173.98:8102/avatar/ghg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getData()
  },
  getData:function(){
    var self = this;
    wx.request({
      url: app.globalData.IPPort + '/me' ,
      method: 'get',
      success: function (res) {
        var temp=res.data
        self.setData({
          id: temp.id,
          type: temp.type,
          name: temp.name,
          number: temp.number,
          phone: temp.phone,
          email: temp.email,
          gender: temp.gender,
          school: {
            'id': temp.school.id,
            'name': temp.school.name
          },
          title: temp.title,
          avatar: temp.avatar
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


  changPortrait:function(){
    var self=this
    wx.request({
      url: app.globalData.IPPort + '/upload/avatar',
      method: 'put',
      data: { "avatar": "/avatar/3486.png" },
      success: function (res) {
        self.setData({
          patraitPath:res.data
        })

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
  },

  release:function(){
    wx.request({
      url: app.globalData.IPPort + '/me',
      method: 'put',
      data: { "phone": this.data.phone },
      success: function (res) {
       wx.redirectTo({
         url: '../../../pages/binding_and_index/Binding/StudentBindingUI',
       })
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

  },

  changPortrait: function () {
    console.log(2)
    var self = this
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

})



