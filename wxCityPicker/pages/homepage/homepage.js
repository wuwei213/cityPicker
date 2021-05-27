// pages/homePage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeName:'',
    placeCode:[],
    codes:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
   /** 
   * 籍贯picker
  */
  placeNameSelect(e){
    console.log(e.detail.code,'选中的id数组');
    console.log(e.detail.value,'选中的汉字数组');
    this.setData({
      placeName: e.detail.value.toString(),
      placeCode:e.detail.code
    })
  },
  
})