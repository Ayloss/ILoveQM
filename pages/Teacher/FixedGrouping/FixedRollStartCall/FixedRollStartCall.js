// pages/Teacher/RandomGrouping/RandomRollStartCall/RandomRollStartCall.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CallInRollCondition:0,
    seminar:{},
    studentNum:0,
    classID:1,
    className:"",
    nowStudentNum:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var getIPPort = app.globalData.IPPort;
    var jwt = wx.getStorageSync('jwt')
    this.setData({
      classID:options.classID
    })
    wx.request({
      url: getIPPort + '/class' + '/' + self.data.classID,
      method: 'GET', 
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        console.log(res.data.numStudent)
        self.setData({
          studentNum: res.data.numStudent,
          seminar: JSON.parse(options.seminar),
          className: res.data.name
        })
        var status = ""
        wx.request({
          url: getIPPort + '/seminar/' + self.data.seminar.id + '/class/' + self.data.classID + '/attendance',
          method:'GET',
          header: {
            Authorization: 'Bearer ' + jwt
          },
          success:function(res){
            self.setData({
              nowStudentNum:res.data.numPresent
            })
            status=res.data.status;
          }
        })
        if(status=="calling"){
          self.setData({
            CallInRollCondition:1
          })
        }
        if (status == "notstart") {
          self.setData({
            CallInRollCondition: 0
          })
        }
        if (status == "end") {
          self.setData({
            CallInRollCondition: 2
          })
        }
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

  onStartCall:function(){
    var self = this;
    var getIPPort = app.globalData.IPPort;
    var jwt = wx.getStorageSync('jwt')
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.request({
          url: getIPPort + '/class' + '/' + self.data.classID,
          method: 'PUT',
          header: {
            Authorization: 'Bearer ' + jwt
          },
          data: {
            calling: self.data.seminar.id,
            longitude: longitude,
            latitude:latitude
      },
          success: function (res) {
            //console.log(res)
          }
        })
      }
    })
    
    this.setData({
      CallInRollCondition: 1
    })
  },

  onEndCall:function(){
    const thisApp=this
    wx.showModal({
      title: '提示',
      content: '是否结束签到',
      success:function(res){
        if(res.confirm){
          var getIPPort = app.globalData.IPPort;
          var jwt = wx.getStorageSync('jwt')
          wx.request({
            url: getIPPort + '/class' + '/' + thisApp.data.classID,
            method: 'PUT',
            header: {
              Authorization: 'Bearer ' + jwt
            },
            data: {
              calling: "-1"
            },
            success: function (res) {
              //console.log(res)
            }
          })
          thisApp.setData({
            CallInRollCondition:2
          })
        } else if(res.cancel) {
          console.log('user choose cancel')
        }
      }
    })
  },

  onRollCallList:function(){
    wx.navigateTo({
      url: './FixedCallList?classID=' + this.data.classID + '&seminar=' + JSON.stringify(this.data.seminar),
    })
  },

  onCheckList:function(e){
    //console.log('./FixedGroupInfo?classID=' + JSON.stringify(this.data.classID) + 'seminarID=' + JSON.stringify(this.data.seminarID))
    //console.log('test')
    wx.navigateTo({
      url: './FixedGroupInfo?classID=' + this.data.classID + '&seminar=' + JSON.stringify(this.data.seminar)
    })
  }
})