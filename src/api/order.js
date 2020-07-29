// 订单接口
import base from "./base"
import {getData} from "../utils/http"

const order = {
    orderData(user){
        return getData(base.order+"?user="+user)
    }
}

export default order