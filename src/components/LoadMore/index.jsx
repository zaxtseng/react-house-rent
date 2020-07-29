import React from 'react'

export default class LoadMore extends React.Component {
    constructor(){
        super()
        this.load = React.createRef()
    }
    //监听页面滚动
    componentDidMount(){
        //事件防抖
        let timer = null
        const winHeight = document.documentElement.clientHeight
        window.onscroll = ()=>{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                if(this.load.current.getBoundingClientRect().top < winHeight){
                    this.props.onLoadMore()
                }
            },200)
        }
    }
    componentWillUnmount(){
        // 取消滚动事件
        window.onscroll = null;
    }
    render() {
        return (
            //获取元素偏移量
            <div ref={this.load}>
                正在加载更多...
            </div>
        )
    }
}
