import React, { Component } from "react";
import api from "../../../api";
import DetailsDataView from "./DetailsDataView";


export default class DetailsData extends Component {
  constructor() {
    super();
    this.state = {
      datas: {},
      comments: []
    };
  }

  componentDidMount() {
    //房屋信息
    const id = this.props.id;
    api.details.detailsData(id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          datas: data
        });
      });
    
    //评论数据
    api.comment.commentData(id)
      .then(res=>res.json())
      .then(data => {
        this.setState({
          comments: data.data
        })
      })
  }

  render() {
    return (
      <div>
        {
          this.state.datas.imgs && this.state.comments ? 
          <DetailsDataView id={this.props.id} history={ this.props.history } data={this.state.datas} comments={this.state.comments} />
        : 
          <div>数据请求中</div>
        }
      </div>
    );
  }
}
