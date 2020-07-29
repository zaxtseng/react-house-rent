import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as cityActions from "../actions/city"
import { bindActionCreators } from "redux"

class App extends Component{
    //初始化数据
componentDidMount(){
    //city默认如果存在
    const city = localStorage.getItem("city")

    this.props.cityActions.initCity({
        cityName: city || "北京"
    })
}

    render(){
        return(
            <div>{this.props.children}</div>
        )
    }
}
const mapStateToProps = state => {
    return {
        city: state.city
    }
}
const mapDispatchToProps = dispatch => {
    return {
        cityActions: bindActionCreators(cityActions, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
