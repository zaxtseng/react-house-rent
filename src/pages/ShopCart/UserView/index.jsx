import React, { Component } from 'react'
import "./style.less"

export default class UserView extends Component {
    render() {
        const user = this.props.user
        const city = this.props.city

        return (
            <div className="userinfo-container">
                <p>
                    <i className="icon-user"></i>
                    &nbsp;
                    <span>{user}</span>
                </p>
                <p>
                    <i className="icon-map-marker"></i>
                    &nbsp;
                    <span>{city}</span>
                </p>
            </div>
        )
    }
}
