// pages/Teacher/RandomGrouping/GroupInfo/GroupInfo.js
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
    lateStudentList: [],
    buttonControll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    var self = this;
    var IPPort = app.globalData.IPPort;
    this.setData({
      classID: options.classID,
      seminar: JSON.parse(options.seminar)
    })
    wx.request({
      url: IPPort + '/seminar' + '/' + self.data.seminar.id + '/group',
      method: 'GET',
      data: {
        classID: self.data.classID
      },
      success: function (res) {
        self.setData({
          groupList: res.data
        })
       // console.log(self.data.groupList)
      }
    })

    wx.request({
      url: IPPort + '/seminar' + '/' + self.data.seminar.id + '/class/' + self.data.classID + '/attendance/late',
      method: 'GET',
      data: {
        classID: self.data.classID
      },
      success: function (res) {
        self.setData({
          lateStudentList: res.data
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

  onRemoveStudent: function (e) {
    var removeStuID = e.currentTarget.dataset.stuObj.id
    var groupID = e.currentTarget.dataset.groupObj.id
    var index = e.currentTarget.dataset.index
    var students = this.data.studentList
    var self = this;
    var IPPort = app.globalData.IPPort;
    wx.request({
      url: IPPort + '/group/' + groupID + '/remove',
      data: {
        id: removeStuID,
      },
      method: 'PUT',
      success:function(){
        students.splice(index,1)
        self.setData({
          studentList: students
        })
      }
    })
  },

  //这里添加的还没做，要弹窗
  onAddStudent: function (e) {
    var groupID = e.currentTarget.dataset.groupObj.id
    var self = this;
    var IPPort = app.globalData.IPPort;
    var lateStudents = this.data.lateStudentList
    var students = this.data.studentList
    var lateStudentsName=[]
    for (var i = 0; i < lateStudents.length;i++){
      lateStudentsName[i] = lateStudents[i].name
    }
    //console.log(lateStudents)
    wx.showActionSheet({
      itemList: lateStudentsName,
      success: function (res) {
        wx.request({
          url: IPPort + '/group/' + groupID + '/add',
          data: {
            id: lateStudents[res.tapIndex].id
          },
          method: 'PUT'
        })
        students[students.length] = lateStudents[res.tapIndex]
        lateStudents.splice(res.tapIndex,1)
        self.setData({
          studentList: students,
          lateStudentList: lateStudents
        })
      },
      fail: function (res) {
        if (lateStudentsName.length==0){
          wx.showToast({
            title: '已无未签到学生',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  onGroupInfo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var buttonControllObj = this.data.buttonControll
    for (var i = 0; i < this.data.groupList.length; i++) {
      buttonControllObj[i] = 0
    }
    buttonControllObj[index] = 1
    this.setData({
      buttonControll: buttonControllObj
    })
    var self = this;
    var IPPort = app.globalData.IPPort
    var groupListObj = self.data.groupList

    //console.log(index)
    //查成员！！！！！！！！！！！！
    wx.request({
      url: IPPort + '/group/' + self.data.groupList[index].id,
      data: {
        embedTopics: "false",
        embedGrade: "false",
      },
      method: 'GET',
      success: function (res) {
        self.setData({
          studentList: res.data.members
        })
        //console.log(self.data.studentList)
      }
    })
  }
})