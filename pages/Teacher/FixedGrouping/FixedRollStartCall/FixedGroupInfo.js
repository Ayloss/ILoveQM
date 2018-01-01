// pages/Teacher/FixedGrouping/FixedRollStartCall/FixedGroupInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [],
    studentList: [],
    classID: 0,
    seminar: {},
    buttonControll:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    var self = this;
    var IPPort = app.globalData.IPPort;
    var jwt = wx.getStorageSync('jwt')
    this.setData({
      classID: options.classID,
      seminar: JSON.parse(options.seminar)
    })
    wx.request({
      url: IPPort + '/seminar' + '/' + self.data.seminar.id + '/group',
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      data: {
        classID: self.data.classID,
        gradeable: false
      },
      success: function (res) {
        self.setData({
          groupList: res.data
        })
        //console.log(self.data.groupList)
      }
    })

    //console.log(topicsName)
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

  onGroupInfo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var buttonControllObj = this.data.buttonControll
    for (var i = 0; i < this.data.groupList.length; i++) {
      buttonControllObj[i] = 0
    }
    buttonControllObj[index] = 1
    /*if (buttonControllObj[index]==0)
      buttonControllObj[index] = 1
    else
      buttonControllObj[index] = 0*/
    this.setData({
      buttonControll: buttonControllObj
    })
    var self = this;
    var IPPort = app.globalData.IPPort
    var groupListObj = self.data.groupList
    var jwt = wx.getStorageSync('jwt')
    //console.log(index)
    //查成员！！！！！！！！！！！！
    wx.request({
      url: IPPort + '/group/' + self.data.groupList[index].id,
      data: {
        embedTopics: "false",
        embedGrade: "false",
      },
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.setData({
          studentList: res.data.members
        })
        //console.log(self.data.studentList)
      }
    })
  }
})