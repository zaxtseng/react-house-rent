import React, { Component } from 'react'
import './style.less'

export default class StoreBuyView extends Component {

    collectHandler = ()=>{
        this.props.onStoreHandler()
    }

    buyHandler = ()=>{
        this.props.onBuyHandler()
    }

    render() {
        const collected = this.props.collected
        return(
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                    {
                        collected ? <button className="selected o" onClick={this.collectHandler}>已收藏</button>
                        : <button className="selected" onClick={this.collectHandler}>收藏</button>
                    }
                </div> 
                <div className="item-container float-right">
                <button onClick={ this.buyHandler }>购买</button>
                    </div> 
            </div>
        )
    }
}

