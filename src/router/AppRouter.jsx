import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import App from '../pages/app'

import Home from '../pages/Home'
import Mine from '../pages/Mine'
import ShopCart from '../pages/ShopCart'
import Shop from '../pages/Shop'
import Life from '../pages/Life'
import NotFound from '../pages/NotFound'
import City from '../pages/City'
import Search from '../pages/Search'
import Details from '../pages/Details'
import Login from '../pages/Login'



export default class AppRouter extends React.Component {
    render(){
        return (
            <HashRouter>
                <App path="/">
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/mine" component={ Mine } />
                    <Route path="/shopcart" component={ ShopCart } />
                    <Route path="/shop" component={ Shop } />
                    <Route path="/life" component={ Life } />
                    <Route path="/city" component={ City } />
                    <Route path="/login" component={ Login } />
                    <Route path="/details/:id" component={ Details } />
                    <Route path="/search/:content" component={ Search } />
                    <Route path="*" component={ NotFound } />
                </Switch>
                </App>
            </HashRouter>
        )
    }
}