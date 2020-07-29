import React from 'react'
import { connect } from 'react-redux'
import ShopCartHeader from '../../components/Header'
import OrderView from './OrderView'
import UserView from './UserView'
import api from '../../api'

class ShopCart extends React.Component {
    constructor(){
        super()
        this.state= {
            order: []
        }
    }
    componentWillMount(){
        const userinfo = this.props.userinfo.name
        if(userinfo){
        //网络请求
        api.order.orderData(userinfo)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                order: data
            })
            
        })

        }else{
            //重定向到登录
            this.props.history.push("/login")
        }
    }

    render(){
        return (
            <div>
                <ShopCartHeader title="购物车" />
                <UserView user={ this.props.userinfo.name } city={ this.props.city.cityName }/>
                {
                    this.state.order.length > 0 ?
                    <OrderView data={this.state.order} />
                    : <div>数据加载中</div>
                }              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.userinfo,
        city: state.city
    }
}

export default connect(mapStateToProps)(ShopCart)