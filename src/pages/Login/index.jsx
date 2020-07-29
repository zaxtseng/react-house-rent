import React from 'react'
import LoginView from './LoginView'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActions from '../../actions/userinfo'

class Login extends React.Component {

    loginHandler = (user)=>{
        this.props.userInfoActions.loginUser({
            //user就是后台返回的信息(可以是token)
            name: user
        })
        window.history.back(-1)
    }

    render(){
        return (
            <div>
               <LoginView onLoginHandler={this.loginHandler}/> 
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userinfo: state.userinfo
    }
}
const mapDispatchToProps = (dispatch)=>{
   return {
       userInfoActions: bindActionCreators(userInfoActions,dispatch)
   } 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)