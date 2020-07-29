// 首页热门推荐


import base from "./base"
import {getData} from "../utils/http"

const homehot = {
    homehot1Data(city){
        return getData(base.homehot1+"?city="+city)
    },
    homehot2Data(city){
        return getData(base.homehot2+"?city="+city)
    }
}

export default homehot