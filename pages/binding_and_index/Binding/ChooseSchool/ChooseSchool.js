// pages/binding_and_index/Binding/ChooseSchool/ChooseSchool.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageCondition: 0,
    province: [],
    city: [],
    school: [],
    provincechoose: '',
    citychoose: '',
    schoolchoose: '',
    userType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var IPPort = app.globalData.IPPort
    this.setData({
      userType: options.userType
    })
    wx.request({
      url: IPPort + '/school/province',
      method: 'GET',
      success: function (res) {
        //console.log(res.data)
        self.setData({
          province: res.data
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


  onProvinceBtn: function () {
    this.setData({
      pageCondition: 0
    })
  },
  onCityBtn: function () {
    if (this.data.provincechoose != '') {
      this.setData({
        pageCondition: 1
      })
    }
  },
  onSchoolBtn: function () {
    if (this.data.citychoose != '') {
      this.setData({
        pageCondition: 2
      })
    }
  },

  onChooseProvince: function (e) {
    var self = this
    var IPPort = app.globalData.IPPort
    this.setData({
      provincechoose: e.currentTarget.dataset.provinceObj
    })
    wx.request({
      url: IPPort + '/school/city',
      data: {
        province: e.currentTarget.dataset.provinceObj
      },
      method: 'GET',
      success: function (res) {
        //console.log(res.data)
        self.setData({
          city: res.data
        })
      }
    })
    this.setData({
      pageCondition: 1
    })
  },

  onChooseCity: function (e) {
    var self = this
    var IPPort = app.globalData.IPPort
    this.setData({
      citychoose: e.currentTarget.dataset.cityObj
    })
    wx.request({
      url: IPPort + '/school',
      data: {
        city: e.currentTarget.dataset.cityObj
      },
      method: 'GET',
      success: function (res) {
        //console.log(res.data)
        self.setData({
          school: res.data
        })
      }
    })
    this.setData({
      pageCondition: 2
    })
  },

  onChooseSchool: function (e) {
    var page = getCurrentPages()
    var prvpage = page[page.length - 2]
    prvpage.setData({
      school: e.currentTarget.dataset.schoolObj
    })
    wx.navigateBack({
      url: './TeacherBinding'
    })
  },

  onCreateSchool: function () {
    var self = this
    wx.navigateTo({
      url: '../CreateSchoolUI?province=' + self.data.provincechoose + '&city=' + self.data.citychoose,
    })
  }
})