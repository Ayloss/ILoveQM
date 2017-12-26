// pages/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("jwt"))

    console.log(!wx.getStorageSync("jwt"))
    if (!wx.getStorageSync("jwt")) {
      // 调用登录获得code
      
      wx.login({
        success: function(res) {
          // 向后台发起请求进行登录
          wx.request({
            url: app.globalData.IPPort + "/signin",
            data: {
              state: "MinProgram",
              code: res.code
            },
            success: function (resp, statusCode) {
              var data = resp.data
              console.log(data);
              wx.setStorageSync("jwt", data.jwt)
              wx.setStorageSync("id", data.id)
              wx.setStorageSync("name", data.name)
              wx.setStorageSync("type", data.type)

        
              console.log(wx.getStorageSync("type"))
              console.log(wx.getStorageSync("name"))
              // 重定向到主页面
              wx.redirectTo({
                url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI'
              })

            },
            fail: function () {
              console.log("login error!");
            }
          })
        }
      })
    } else {
      // 重定向到主页面
      wx.redirectTo({
        url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI'
      })
    }
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