import React, { Component } from 'react'
import './style.less'


export default class LoginView extends Component {
    constructor(){
        super()
        this.state = {
            value: ''
        }
    }
    userNameHandler = (event)=>{
        this.setState({
            value: event.target.value
        })
    }

    loginHandler = ()=>{
        this.props.onLoginHandler(this.state.value)
    }
    
    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input 
                        placeholder="请输入手机号"
                        value={ this.state.username }
                        onChange={ this.userNameHandler }
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码" />
                </div>
                <button className="btn-login" onClick={ this.loginHandler }>登录</button>
            </div>
        )
    }
}
