import * as userInfoActions from '../constants/userinfo'


const initState = {}

export default function userinfo(state = initState, action ){
    switch(action.type){
        case userInfoActions.LOGIN_USERINFO:
            return state = action.data;
        case userInfoActions.LOGIN_UPDATE:
            return state = action.data;
        default:
            return state;
    }
}   