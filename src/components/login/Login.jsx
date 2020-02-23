import React, { Component } from 'react'
import './Login.css'

import { Form } from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super()

    this.state = {
      uname: '',
      pwd: ''
    }
  }

  login = async () => {
    const res = await this.axios.post('users/login', this.state)

    if (res.data.meta.status === 200) {
      // 保存uid和token到本地
      localStorage.setItem('uid', res.data.data.uid)
      localStorage.setItem('token', res.data.data.token)

      // 跳转到布局页面
      this.props.history.push('/layout')
    } else {
      alert(res.data.meta.msg)
    }
  }

  change = e => {
    this.setState({
      // 属性名表达式
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { uname, pwd } = this.state

    return (
      <div className="login-container">
        <div className="login-title">登录</div>
        <div className="login-form">
          <Form onSubmit={this.login}>
            <Form.Field>
              <Form.Input
                icon="user"
                iconPosition="left"
                placeholder="请输入用户名"
                name="uname"
                required
                value={uname}
                onChange={this.change}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="请输入密码"
                type="password"
                name="pwd"
                required
                value={pwd}
                onChange={this.change}
              />
            </Form.Field>
            <Form.Field>
              <Form.Button positive>登录</Form.Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;
