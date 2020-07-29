import React from 'react'
import api from '../../../api';
import SearchListView from './SearchListView';
import LoadMore from '../../../components/LoadMore'

 export default class SearchList extends React.Component {
     constructor(){
         super()
         this.state = {
             searchData:[],
             page: 0,
             hasMore: false
         }
     }
    
    http(city,content,page){
        api.search.searchData(city,content,page)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchData: this.state.searchData.concat(data.data),
                page: this.state.page + 1,
                hasMore: data.hasMore
            })               
        })
     }


    componentDidMount(){
        //获取城市
        const city = this.props.city
        //获取搜索内容
        const content = this.props.content
        
        this.http(city,content,this.state.page)
        
    }

    componentDidUpdate(prevProps,prevState){
        console.log(prevProps)
        //获取城市
        const city = this.props.city
        //获取搜索内容
        const content = this.props.content
        if(prevProps.content === content){
            return
        }
            this.http(city, content,0 )
        
    }
    componentWillUnmount(){
        // 清除
        this.setState = (state,callback) => {
            return;
        }
    }

    loaderMoreHandler = ()=>{
        const city = this.props.city
        const content = this.props.content
        this.http(city, content, this.state.page)
    }
    
    render(){
        return (
            <div>
                {
                 this.state.searchData ?
                 <SearchListView data={this.state.searchData}/> 
                 : <div>数据正在加载</div>
                }
                {this.state.hasMore ? 
                <LoadMore onLoadMore={ this.loaderMoreHandler}/>
                : <div>数据加载完成</div>}
           </div>
        )
    }
}