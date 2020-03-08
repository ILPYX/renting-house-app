import React, { Component } from 'react'

import { Item, Button, Icon } from "semantic-ui-react";

import Tloader from 'react-touch-loader'

import './Loader.css'

class Loader extends Component {
  constructor() {
    super()

    this.state = {
      list: [],
      type: '1', // 1 资讯  2 头条  3 问答
      pageNum: 0, // limit 0,2  2,2  4,2
      pagesize: 2,
      hasMore: true // 是否还有更多
    }
  }

  // 第一次进来, 默认加载资讯的数据
  componentWillMount() {
    // 加载资讯的数据
    this.loadData()
  }

  // 当父组件传递了不同的type过来之后, 我们也需要加载新的type数据
  componentWillReceiveProps(props) {
    // 重置
    this.setState({
      list: [],
      type: props.type,
      pageNum: 0
    }, () => {
        this.loadData()
    })
  }

  loadData = async (callback) => {
    const res = await this.axios.post('info/list', {
      type: this.state.type,
      pagenum: this.state.pageNum * this.state.pagesize,
      pagesize: this.state.pagesize
    })

    const newArray = [...this.state.list, ...res.data.data.list.data]

    this.setState({
      list: newArray,
      hasMore: newArray.length < res.data.data.list.total
    })

    callback && callback()
  }

  renderLoader = () => {
    const { type, list } = this.state
    
    if (type === '1' || type === '2') {
      return <Item.Group unstackable>
        {list.map(item => {
          return <Item key={item.id}>
            <Item.Image size="tiny" src='http://47.96.21.88:8086/public/1.png' />
            <Item.Content>
              <Item.Header className="info-title" as='a'>{item.info_title}</Item.Header>
              <Item.Meta>$1200 1 Month</Item.Meta>
            </Item.Content>
          </Item>
        })}
      </Item.Group>
    } else {
      return <div>
        <Button positive fluid>快速提问</Button>
        <div className="info-ask-list">
          <ul>
            {list.map(item => {
              return <li key={item.id}>
                <div className="title">
                  <Icon color='green' size="small" />
                  {item.question_name}
                </div>
                <div className="user">
                  <Icon name='users' size="small" />
                  {item.username}的回答
                </div>
                <div className="info">
                  {item.answer_content}
                </div>
                <div className="tag">
                  {item.question_tag && item.question_tag.split(',').map(item => <span key={item}>{item}</span>)}
                  <span>{item.qnum}个回答</span>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    }
  }

  // 下拉刷新
  handleRefresh = (resolve) => {
    // 重置
    this.setState({
      list: [],
      pageNum: 0
    }, () => {
        this.loadData(resolve)
    })
  }

  // 上拉加载更多
  handleLoadMore = (resolve, reject) => {
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => {
        this.loadData(resolve)
    })
  }

  render() {
    return (
      <div style={{paddingBottom:60}}>
        <Tloader
          initialzing={0}
          onRefresh={this.handleRefresh}
          hasMore={this.state.hasMore}
          onLoadMore={this.handleLoadMore}
          autoLoadMore={true}
          className="tloader some class">
          {this.renderLoader()}
        </Tloader>
      </div>
    )
  }
}

export default Loader
