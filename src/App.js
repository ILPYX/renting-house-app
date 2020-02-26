import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 导入semantic-ui 全局样式
import 'semantic-ui-css/semantic.min.css'

// 导入子组件
import Login from './components/login/Login'
import Layout from './components/layout/Layout'
import List from './components/list/List'
import NotFound from './components/404/404'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/layout" component={Layout} />
          {/* <Route path="/list" component={List} /> */}
          <Route path="/list/:house_type/:name" component={List} />
          <Redirect exact from="/" to="/login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
