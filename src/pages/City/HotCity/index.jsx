import React, { Component } from 'react'
import './style.less'

export default class HotCity extends Component {
    clickHandler(cityName){
        this.props.cityNameHandler(cityName)
    }

    render() {
        return (
            <div className="city-list-container">
                <h3>热门城市</h3>
                <ul className="clear-fix">
                    <li>
                        <span onClick={this.clickHandler.bind(this,'北京')}>北京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'上海')}>上海</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'广州')}>广州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'深圳')}>深圳</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'天津')}>天津</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'杭州')}>杭州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'南京')}>南京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'成都')}>成都</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,'武汉')}>武汉</span>
                    </li>
                 
                </ul>
            </div>
        )
    }
}
