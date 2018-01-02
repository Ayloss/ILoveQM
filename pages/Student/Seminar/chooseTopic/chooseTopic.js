var app = getApp();// pages/Student/Seminar/RandomGroup/ChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true, 

    seminarID:1,
    groupID:1,
    topics:[],

    mytopicID:'',
    mytopic:'',
    match:["A",'B','C','D','E']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  //获得当前seminar下所有topics信息
  getTopics:function(){
    var self = this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/seminar/' + this.data.seminarID +'/topic',
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
          self.setData({
          topics:res.data
          })
          
          for (var i = 0; i < self.data.topics.length; i++)//设置是否显示细节的标签
            self.data.topics[i].detailJud = 0
          var temp = self.data.topics
          self.setData({topics:temp})
          console.log(self.data.topics)
          wx.hideLoading()
      },
    })
    
  },

  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    console.log(temp)
    this.setData({
      seminarID: temp.seminarID,
      groupID: temp.groupID,
    })
    this.getTopics()
  },

  //通过topicID和groupID选话题
  chooseTopic: function (e) {
    console.log(e)
    var self=this
    for (var i = 0; i < this.data.topics.length; i++)//设置是否显示细节的标签
      if (this.data.topics[i].id == e.currentTarget.id)
        this.setData({
          mytopic: self.data.match[i] + self.data.topics[i].name
        })  
    this.setData({
      mytopicID: e.currentTarget.id,
      modalHidden: !this.data.modalHidden
    })
  },
  modalBindaconfirm: function () {
    var self=this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/group/' + this.data.groupID + '/topic',
      method: 'post',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      data: { "id": this.data.mytopicID },
      success: function (res) {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];  //上一个页面
              prevPage.setData({
                topic: self.data.mytopic,
                areTopicsSelected:true
              })
              wx.navigateBack(); 
      },
    })
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  }  ,

  detail:function(e){
    console.log(e.currentTarget.id)
    for (var i = 0; i < this.data.topics.length; i++) {
      if (this.data.topics[i].id == e.currentTarget.id)
        if (this.data.topics[i].detailJud==0)
          {
          this.data.topics[i].detailJud =1
          }else{
          this.data.topics[i].detailJud =0
          }
      var temp = this.data.topics
      this.setData({ topics: temp })
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
    wx.showLoading({
      title: '加载中',
    })
    this.getTopics()
    wx.stopPullDownRefresh()
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