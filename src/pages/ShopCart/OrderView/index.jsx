import React, { Component } from 'react'
import Item from './Item'

export default class OrderView extends Component {
    render() {
        const data = this.props.data
        return (
            <div>
                {data.map((item,index)=>{
                    return <Item key={index} data={item} />
                })}
            </div>
        )
    }
}
