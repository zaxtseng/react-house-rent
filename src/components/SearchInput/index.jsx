import React, { Component } from 'react'
import './style.less'

export default class SearchInput extends Component {
    constructor(){
        super()
        this.state={
            value: ''
        }
    }
    getValuesHandler = (event)=>{
        this.setState({
            value: event.target.value
        })
    }
    keyUpHandler = (event)=>{
        if(event.keyCode === 13){
            this.props.history.push('/search/'+this.state.value)
        }
    }

    render() {
        return (
            <input type="text"
                className="search-input"
                value={this.state.value}
                placeholder="请输入搜索内容"
                onKeyUp={this.keyUpHandler}
                onChange={this.getValuesHandler}
            />)
    }
}
