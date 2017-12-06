// pages/class-management/class-manage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    seminar: {},
    groupingMethod: "",
    startTime: "2017-09-25",
    endTime: "2017-10-09",
    classs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      course: JSON.parse(options.course),
      seminar: JSON.parse(options.seminar)
    })
    //console.log(options.seminar)
    var getIPPort = app.globalData.IPPort;
    var courseID = this.data.course.id;
    var self = this;
    //console.log(courseID);
    //class信息
    wx.request({
      url: getIPPort + '/course/' + courseID + '/class',
      method: 'GET',
      success: function (res) {
        self.setData({
          classs: res.data
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

  onGroupingPage: function (e) {
    //console.log(e.currentTarget.dataset.classID)
    var classID = e.currentTarget.dataset.classId
    if (this.data.seminar.groupingMethod == "fixed")
      wx.navigateTo({
        url: '../FixedGrouping/FixedRollStartCall/FixedRollStartCall?seminar=' + JSON.stringify(this.data.seminar) + '&classID=' + classID
      })
    else
      wx.navigateTo({
        url: '../RandomGrouping/RandomRollStartCall/RandomRollStartCall?seminar=' + JSON.stringify(this.data.seminar) + '&classID=' + classID
      })
  }
})