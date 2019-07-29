import React, {Component} from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';

import App from "../App.js";
import Login from "@/views/login/login";

/* const routers = [
  homeRouter,
  userManageRouter,
  storeManageRouter,
  authManageRouter,
  goodsManageRouter,
  historyRecordRouter,
  personalRouter
]; */

const renderRoutes = (routers) => {
  return routers.map((item, index)=>
    <Route path={item.path} component={item.component} exact={item.exact} key={index}>
      {item.children && renderRoutes(item.children)}
    </Route>)
};


export default class RouteConfig extends Component{
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/' render={()=>
            <App>
            </App>
          }>
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
