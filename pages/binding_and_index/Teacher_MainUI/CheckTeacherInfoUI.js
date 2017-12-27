// pages/binding & index/Teacher_MainUI/CheckTeacherInfoUI.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    teacherID: "",
    phoneNum: "", 
    school: "",
    usertype:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getIPPort = app.globalData.IPPort;
    var self = this;
    var usertype = wx.getStorageSync('type')
    this.setData({
      usertype:usertype
    })
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: getIPPort+'/me',
      //header: { 'Content-Type': wx.getStorage('jwt') },
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success:function(result){
        //console.log(result)
        self.setData({
          userName:result.data.name,
          school: result.data.school.name,
          teacherID: result.data.number,
          phoneNum: result.data.phone,
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

  onUnBind:function(){
    var IPPort=app.globalData.IPPort
    var self=this
    var page=getCurrentPages()
    wx.request({
      url: IPPort+'/me',
      header:{
        Authorization:"Bearer " + wx.getStorageSync("jwt")
      },
      data:{
        openId:null,
        name:null,
        "type":null
      },
      method:'PUT',
      success:function(){
        wx.setStorageSync('jwt', "")
        wx.setStorageSync("type", "")
        wx.setStorageSync("name", "")
        wx.setStorageSync("id", "")

        console.log(wx.getStorageSync("jwt"))
        wx.reLaunch({
          url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI'
        })
      }
    })
  },
  
})