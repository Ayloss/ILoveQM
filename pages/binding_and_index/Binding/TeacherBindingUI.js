// pages/binding & index/Binding/TeacherBindingUI.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherID: '',
    name: "",
    school: {},
  },

  onInputID: function (e) {
    this.setData({
      teacherID: e.detail.value
    })
  },
  onInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  onChooseSchool: function (e) {
    wx.navigateTo({
      url: './ChooseSchool/ChooseSchool?userType=teacher',
    })
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

  onBinding: function () {
    if (this.data.studentID != '' && this.data.name != '' && this.data.school != '') {
      var IPPort = app.globalData.IPPort
      var self = this
      var jwt = wx.getStorageSync('jwt')
      wx.request({
        url: IPPort + '/signin',
        data: {
          code: '',
          state: 'MiniProgram',
          success_url: ''
        },
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + jwt
        },
        success: function (res) {
          wx.setStorageSync('jwt', res.data.jwt)
          wx.request({
            url: IPPort + '/me',
            data: {
              "number": self.data.teacherID,
              "name": self.data.name,
              "school": self.data.school
            },
            method: 'PUT',
            header: {
              Authorization: 'Bearer ' + jwt
            },
            success: function () {
              //console.log(self.data.school)
              //console.log('bind success')
              var pages = getCurrentPages()
              var prepage = pages[pages.length - 2]
              //console.log(app.globalData.jwt)
              console.log(self.data.teacherID)
              prepage.setData({
                ID: self.data.teacherID,
                userName: self.data.name
              })
              //修改主页里面的列表
              wx.request({
                url: IPPort + '/course',
                method: 'GET',
                //加header
                success: function (res) {
                  //console.log(res)
                  prepage.setData({
                    courseList: res.data
                  })
                }
              })
              //修改主页用户类型
              prepage.setData({
                userType: 'teacher',
                jwt: wx.getStorageSync('jwt')
              })
              //console.log(pages)
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
    else {
      wx.showModal({
        title: '请完整填写！',
        //content: '',
        showCancel: false
      })
    }
  }
})