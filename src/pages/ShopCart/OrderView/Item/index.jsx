import React, { Component } from 'react'
import "./style.less"
import api from '../../../../api'


export default class Item extends Component {
    constructor(){
        super()
        this.state = {
            commentState: 0
        }
        //增加非受控组件
        this.commentText = React.createRef()
    }

    componentDidMount(){
        this.setState({
            commentState: this.props.data.commentState
        })
    }

    commentHandler = ()=>{
        this.setState({
            commentState: 1
        })
    }

    submitCommentHandler = ()=>{
        this.setState({
            commentState: 2
        })
        //发送网络请求
        api.ordercomment.orderCommentData({
            info: this.commentText.current.value
        })
         .then(res=>res.json())
         .then(data =>{
             alert(data.msg)
         })
    }

    hideComment = ()=>{
        this.setState({
            commentState: 0
        })
    }

    render() {
        const data = this.props.data
        return (
            <div className="clear-fix order-item-container">
                <div className="order-item-img float-left">
                    <img src={data.img} alt={data.title}/>
                </div>
                <div className="order-item-comment float-right">
                    {
                        this.state.commentState === 0?
                        <button className="btn" onClick={this.commentHandler }>评价</button>
                        : this.state.commentState === 1 ?
                        <button className="btn">评价中</button>
                        : <button className="btn  unselected-btn">已评价</button>
                    }
                </div>
                <div className="order-item-content">
                    <span>商户:{data.title}</span>
                    <span>类型:{data.houseType}</span>
                    <span>价格:{data.price}</span>
                </div>
                {/* 评价框 */}
                {
                    this.state.commentState === 1 ?
                    <div className="comment-text-container">
                    <textarea style={{ width: '100%', height: '80px' }} className="comment-text" ref={ this.commentText }></textarea>
                    <button className="btn" onClick={this.submitCommentHandler}>提交</button>
                    &nbsp;
                            <button className="btn unseleted-btn" onClick={this.hideComment}>取消</button>
                    </div>
                    :  ""
                }
            </div>
        )
    }
}
