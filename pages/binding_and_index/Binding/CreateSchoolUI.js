// pages/binding & index/Binding/CreateSchoolUI.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:'',
    city:'',
    school:''
  },

  onInputSchool:function(e){
    //console.log(e.detail.value)
    this.setData({
      school: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      province:options.province,
      city:options.city
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
  onConfirm:function(){
    var IPPort=app.globalData.IPPort
    var self=this
    var schoolID=-1
    wx.request({
      url: IPPort+'/school',
      data:{
        name:self.data.school,
        province: self.data.province,
        city: self.data.city,
      },
      method:'POST',
      success:function(res){
        schoolID:res.data.id
      }
    })
    //跳转
    var page=getCurrentPages()
    var bindingPage=page[page.length-3]
    var schoolinfo = { "id": schoolID,"name": self.data.school, "province": self.data.province, "city": self.data.city}
    //console.log(bindingPage)
    bindingPage.setData({
      school: schoolinfo
    })
    wx.navigateBack({
      delta: 2
    })
  }
})