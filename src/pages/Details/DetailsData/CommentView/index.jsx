import React, { Component } from 'react'
import Item from './Item'
import './style.less'

export default class CommentView extends Component {
    render() {
        const data = this.props.comments

        return (
            <div className="comment-list">
                {data.map((item,index)=>{
                    return <Item key={index} data={item} />
                })}
            </div>
        )
    }
}
