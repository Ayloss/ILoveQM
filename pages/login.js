// pages/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginError: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this
    wx.login({
      success: function (res) {

        // 向后台发起请求进行登录
        wx.request({
          url: app.globalData.IPPort + "/signin",
          data: {
            state: "MinProgram",
            code: res.code
          },
          success: function (resp) {
            console.log(resp)
            switch(resp.statusCode) {
              case 200:
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
                break
              // 不存在用户，需要执行绑定操作
              case 401:
                console.log("用户未找到！需要进行绑定")
                wx.redirectTo({ url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI' })
                break
              // 其他错误，需要重新登录
              default:
                self.setData({ loginError: true })
            }
          },
          fail:function(resp) {
            console.log(resp)
          }
        })
      }
    })
  },

  reLogin: function () {
    console.log("do reLogin")
    wx.reLaunch({
      url: '/pages/login'
    })
  }
})