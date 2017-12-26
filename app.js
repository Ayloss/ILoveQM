//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var jwt = wx.getStorageSync('jwt')
    //var jwt ='eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoidGVhY2hlciIsIm5hbWUiOiLnjovnvo7nuqIiLCJpZCI6MiwiZXhwIjoxNTE2ODg2Nzc0fQ.KfSoj2OvRi5JUEro3C6p11sP8prp0b6wYXYx0PKx1zw'
    wx.setStorageSync('jwt', jwt)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //IPPort:"http://120.77.173.98:8102",
    //jwt:''
    IPPort: "http://localhost:8080"
  }
})