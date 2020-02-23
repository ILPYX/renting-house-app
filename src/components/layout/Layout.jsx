import React, { Component } from 'react'

import './Layout.css'

import { Route, Link, Switch, Redirect } from "react-router-dom";

import { Grid, Icon } from "semantic-ui-react"

// 导入子组件
import Home from '../home/Home'
import Info from '../info/Info'
import Chat from '../chat/Chat'
import Mine from '../mine/Mine'
import NotFound from '../404/404'

// 自定义Link
function TabBarLink({name, icon, to}) {
  return <Route
    path={to}
    children={({ match }) => (
      <Link to={to}>
        <div className={match ? "placeholder active" : "placeholder"}>
          <Icon name={icon} />
          <div>{name}</div>
        </div>
      </Link>
    )}
  />
}

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="main-content">
          <Switch>
            <Route path="/layout/home" component={Home} />
            <Route path="/layout/info" component={Info} />
            <Route path="/layout/chat" component={Chat} />
            <Route path="/layout/mine" component={Mine} />
            <Redirect exact path="/layout/" to="/layout/home" />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div className="main-menu">
          <Grid padded>
            <Grid.Row centered columns={4}>
              <Grid.Column>
                <TabBarLink name="首页" icon="user secret" to="/layout/home" />
              </Grid.Column>
              <Grid.Column>
                <TabBarLink name="资讯" icon="window restore" to="/layout/info" />
              </Grid.Column>
              <Grid.Column>
                <TabBarLink name="微聊" icon="microchip" to="/layout/chat" />
              </Grid.Column>
              <Grid.Column>
                <TabBarLink name="我的" icon="window maximize" to="/layout/mine" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Layout
