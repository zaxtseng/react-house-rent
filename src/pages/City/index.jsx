import React, { Component } from "react";
import CityHeader from "../../components/Header";
import CurrentCity from "./CurrentCity";
import HotCity from "./HotCity";
import {connect} from 'react-redux'
import * as cityActions from '../../actions/city'
import {bindActionCreators} from 'redux'



class City extends Component {
  onCityNameHandler = (cityName)=>{
    //这里将点击城市写入到Redux中
    this.props.cityActions.updateCity({
      cityName
    })
    //改变之后返回
    window.history.back(-1)

    //选择的城市存储到本地
    localStorage.setItem("city",cityName)
  }
  render() {
    return (
      <div>
        <CityHeader title={"城市选择"} />
        <CurrentCity city={this.props.city.cityName} />
        <HotCity cityNameHandler={this.onCityNameHandler}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    cityActions: bindActionCreators(cityActions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City)