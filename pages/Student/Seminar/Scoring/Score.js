var app = getApp();// pages/Student/Seminar/Scoring/Score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID: 1,
    classID: 1,
    courseID: 1,
    courseName: 'OOAD',
    seminarID: "",
    group:[],
    groupID:1,
    presentationGrade:[],

    flag:true               //是否显示提交button
  },

  score:function(e){
    
    var temp=e.target.dataset
    for (var i = 0; i < this.data.presentationGrade.length;++i)
      if (this.data.presentationGrade[i].id==temp.group)
      {
        this.data.presentationGrade[i].grade = temp.score
      }
        
    var t = this.data.presentationGrade
    
    this.setData({
      presentationGrade:t
    })
  },

//是否已经提交打分，设置flag
hasSubmit:function(){
  var self=this
  wx.request({                   
    url: app.globalData.IPPort + '/seminar/' + this.data.seminarID + '/score/status',
    method: 'get',
    header: {
      Authorization: 'Bearer ' + jwt
    },
    success: function (res) 
    {
      if(res.data.id==0)
      { 
        self.setData({
          flag: false
       })
      }else{
        self.setData({
          flag: true
        })
      }
    },
    fail :function(res)
    {

    }
  })

},
  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    console.log(temp)
    this.setData({
      seminarID: temp.seminarID,
      studentID: temp.studentID,
      classID: temp.classID,
      courseID: temp.courseID,
      courseName: temp.courseName,
    })

    var self =this
    var jwt = wx.getStorageSync('jwt')
    wx.request({                    //请求小组
      url: app.globalData.IPPort +'/seminar/'+this.data.seminarID+'/group?gradeable=true',
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        self.setData({
          group: res.data
        })
        self.hasSubmit()         //是否已经提交打分
        for(var i=0;i<self.data.group.length;++i)
        {
          self.data.presentationGrade.push({ "id": self.data.group[i].id, 'name': self.data.group[i].name, "grade": 0})
        }
        var temp = self.data.presentationGrade
        self.setData({
          presentationGrade: temp
        })
        console.log(self.data.presentationGrade)
      },
      fail: function () {
        wx.showToast({
          title: '页面加载失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    }) 

  },

  //提交
  submit:function()
  {
    var self=this
    var jwt = wx.getStorageSync('jwt')
    wx.request({                    
      url: app.globalData.IPPort + '/group/' + this.data.groupID + '/grade/presentation/'+this.data.studentID,
      method: 'put',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      data: { 'presentationGrade': this.data.presentationGrade },
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        self.setData({
          flag:false
        })
       
      },
      fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'fail',
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})