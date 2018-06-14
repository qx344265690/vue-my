export default {
    state:{//state
        authorizd:false 
    },
    getters:{
        authorizd: state => state.authorizd
    },
    actions: { 
        login({commit},payload){
            // ajax 登陆流程，
            commit("login", 登陆信息)
        }
    },
    mutations:{
        login(state,loginInfo){
            state.authorizd = loginInfo // 假定登陆成功后，设置 state.
        }
    }
}