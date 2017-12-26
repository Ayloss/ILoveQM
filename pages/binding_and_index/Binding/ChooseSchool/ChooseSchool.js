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
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: 'http://apis.map.qq.com/ws/district/v1/list',
      method: 'GET',
      data:{
        "key": "RR7BZ-74AEP-JFKDC-LC4EB-ROFYV-TBBBO"
      },
      success: function (res) {
        console.log(res)
        var list=[];
        for(var i=0;i<res.data.result[0].length;i++){
          list[i] = res.data.result[0][i]
        }
        self.setData({
          province: list
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
    var jwt = wx.getStorageSync('jwt')
    this.setData({
      provincechoose: e.currentTarget.dataset.provinceObj
    })
    wx.request({
      url: 'http://apis.map.qq.com/ws/district/v1/getchildren',
      data: {
        id: e.currentTarget.dataset.provinceObj.id,
        key:'RR7BZ-74AEP-JFKDC-LC4EB-ROFYV-TBBBO'
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var list=[];
        for(var i=0;i<res.data.result[0].length;i++){
          list[i]=res.data.result[0][i]
        }
        self.setData({
          city: list
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
        city: e.currentTarget.dataset.cityObj.name
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
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
      url: '../CreateSchoolUI?province=' + self.data.provincechoose.name + '&city=' + self.data.citychoose.name,
    })
  }
})