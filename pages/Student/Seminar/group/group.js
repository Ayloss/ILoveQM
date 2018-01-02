var app = getApp();// pages/Student/Seminar/group/group.js
//url有改动，需要改
Page({

  /**
   * 页面的初始数据
   */
  data: {//前三个可用来控制界面的显示
    topic:'',           //小组所选的话题
    hasLeaderJud:1,     //0表示没有队长，1表示有
    
    seminarID:1,
    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: '1',
    groupMethod:'',
    areTopicsSelected:true,   //是否已经选题
    isLeader:true,            //是否是Leader
    hasLeader:true,            //是否有Leader
    groupDetail:{},
  },

  becomeLeader:function(){    //成为队长
    var self=this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/group/' + this.data.groupDetail.id + '/assign',
      method: 'put',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.getGroupDetail()
        
      },
      fail: function () {
        wx.showToast({
          title: '页面加载失败',
          icon: 'error',
          duration: 1000,
          mask: true
        })
      }
    })  

  

  },

  
  resign:function(){    //辞职
    var self= this
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/group/' + this.data.groupDetail.id + '/resign',
      method: 'put',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.getGroupDetail()
      },
      fail: function () {
        wx.showToast({
          title: '失败',
          icon: 'error',
          duration: 1000,
          mask: true
        })
      }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   //从seminar进来
    var temp = JSON.parse(options.str)
    console.log(temp.areTopicsSelected)
    this.setData({
      seminarID: temp.seminarID,
      studentID: temp.studentID,
      classID: temp.classID,
      courseID: temp.courseID,
      courseName: temp.courseName,
      groupMethod: temp.groupMethod,
      isLeader:temp.isLeader,
      areTopicsSelected: temp.areTopicsSelected, 
    })
    this.getGroupDetail()
  },

    getGroupDetail:function(){
      var self=this
      var jwt = wx.getStorageSync('jwt')
      wx.request({
        url: app.globalData.IPPort + '/seminar/' + this.data.seminarID +'/group/my',
        method: 'get',
        header: {
          Authorization: 'Bearer ' + jwt
        },
        success: function (res) {
          //设置数据和三种状态
          console.log(res.data)
          self.setData({
            groupDetail: res.data,
          })
         


          if (self.getHsonLength(self.data.groupDetail.topics) > 0)
            self.setData({
              areTopicsSelected: true,
              topic: res.data.topics[0].name
            })
            else
            self.setData({
              areTopicsSelected: false
            })
          if (self.getHsonLength(self.data.groupDetail.leader)>0)
            {
              self.setData({
              hasLeader: true
              })
              var id = wx.getStorageSync('id')
              if (id == self.data.groupDetail.leader.id)
                    self.setData({
                      isLeader: true
                    })
              else 
                    self.setData({
                      isLeader: false
                    })
            }
            else
            self.setData({
              hasLeader: false,
              isLeader:false
            })
            wx.hideLoading()
        },
        fail: function () {
          wx.showToast({
            title: '页面加载失败',
            icon: 'error',
            duration: 1000,
            mask: true
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
    wx.showLoading({
      title: '加载中',
    })
    this.getGroupDetail()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseTopic:function(){
    var data = { 'groupID': this.data.groupDetail.id,'seminarID':this.data.seminarID}
    wx.navigateTo({
      url: '../chooseTopic/chooseTopic?str=' + JSON.stringify(data),
    })
  },
  getHsonLength:function (json){
    var jsonLength= 0;
    for(var i in json) {
  jsonLength++;
}
return jsonLength;
            }
})