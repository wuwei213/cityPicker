import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({  
    state: {  
        user_id:1,//护理员详情查询所需id 因为查看接口是客户端的 所以默认值设置为1
        companyId:null,//公司id
        phoneNum:null,
        nurseId:null,
        city:1,                    // 记录当前城市  成都 1 ，眉山2 ，重庆 3 ， 德阳 4 ，绵阳 5
        cityindex:null,//选中城市下
        appcontactInfo:null,//备案信息
        styleLoadingIsOpen:true,//开启加载
        styleLoadingType:'rotatePlane',//自定义加载内容
        themeColor:{
            color:'#F88F6A', //加载的颜色
        },

        educationList:[ //学历
            {value: "小学", code: "PRIMARY"},
            {value: "初中", code: "MIDDLE"},
            {value: "高中", code: "HIGH"},
            {value: "大学", code: "UNIVERSITY"}
          ],
        //关系
        emergencyRelationshipArray:[
            {cancel: false,code: 'FATHER',createTime: null,id: 72,value: "父母"},
            {cancel: false,code: 'MOTHER',createTime: null,id: 73,value: "子女"},
            {cancel: false,code: 'SPOUSE',createTime: null,id: 74,value: "配偶"}
        ],
        addressCascade:null,//城市三级
        sourceCascade:null,//来源渠道

    },  
    mutations: {  
        // login(state, provider) {  
        //     console.log(state)  
        //     console.log(provider)  
        //     state.login = true;  
        //     state.token = provider.token;  
        //     state.userName = provider.userName;  
        //     state.avatarUrl = provider.avatarUrl;  
        // },  
        // logout(state) {  
        //     state.login = false;  
        //     state.token = '';  
        //     state.userName = '';  
        //     state.avatarUrl = '';  
        // }  
    }  
})  
export default store