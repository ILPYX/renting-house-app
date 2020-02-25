import React, { Component } from 'react'
import { Dimmer, Loader, Input, Grid, Icon, Item, Button } from "semantic-ui-react";

// 导入样式
import './Home.css'

// 导入轮播图组件第三方包
import ImageGallery from 'react-image-gallery'

// 导入轮播图样式
import 'react-image-gallery/styles/css/image-gallery.css'

// 自定义子组件, 用来显示房屋列表
function HousesList({ title, houses }) {
  return (
    <div>
      <div className="home-hire-title">{title}</div>
      <Item.Group unstackable>
        {houses.map(item => {
          return (
            <Item key={item.id}>
              <Item.Image
                size="tiny"
                src="http://47.96.21.88:8086/public/home.png"
              />

              <Item.Content>
                <Item.Header as="a">{item.home_name}</Item.Header>
                <Item.Description>{item.home_desc}</Item.Description>
                <Item.Description>
                  {item.home_tags.split(',').map(subitem => {
                    return (
                      <Button key={subitem} basic color="green">
                        {subitem}
                      </Button>
                    )
                  })}
                </Item.Description>
                <Item.Description>{item.home_price}</Item.Description>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </div>
  )
}

class Home extends Component {
  constructor() {
    super()

    this.state = {
      swipes: [], // 轮播图
      menus: [], // 菜单
      infos: [], // 资讯
      faqs: [], // 问答
      houses: [], // 房屋列表
      isLoding: true, // 正在加载中
    }
  }

  async componentWillMount() {
    const results = await Promise.all([
      this.axios.post('home/swipe'),
      this.axios.post('home/menu'),
      this.axios.post('home/info'),
      this.axios.post('home/faq'),
      this.axios.post('home/house'),
    ])

    // 数据加载完毕
    this.setState({
      swipes: results[0].data.data.list,
      menus: results[1].data.data.list,
      infos: results[2].data.data.list,
      faqs: results[3].data.data.list,
      houses: results[4].data.data.list,
      isLoding: false
    })
  }

  // 渲染菜单
  renderMenus = menus => {
    return (
      <Grid padded>
        {/* 每一行最多显示4列, 装不下自动再整一行 */}
        <Grid column={4}>
          {menus.map(item => {
            return (
              <Grid.Column
                onClick={() => {
                  this.clickMenu(item.id, item.menu_name)
                }}
                key={item.id}
              >
                <div className="home-menu-item">
                  <Icon name="home" size="big" />
                </div>
                <div style={{ marginTop: 5 }}>{item.menu_name}</div>
              </Grid.Column>
            )
          })}
        </Grid>
      </Grid>
    )
  }

  // 渲染资讯
  renderInfos = infos => {
    return (
      <div className="home-msg">
        <Item.Group unstackable>
          <Item className="home-msg-img">
            <Item.Image
              size="tiny"
              src="http://47.96.21.88:8086/public/zixun.png"
            />
            <Item.Content>
              {infos.map(item => {
                return (
                  <Item.Header as="a" key={item.id}>
                    <span>限购 ●</span>
                    <span>{item.info_title}</span>
                  </Item.Header>
                )
              })}
            </Item.Content>
            <div>
              <Icon name="angle right" size="big" />
            </div>
          </Item>         
        </Item.Group>
      </div>
    )
  }

  // 渲染问答区域
  renderFaqs = faqs => {
    return (
      <div className="home-ask">
        <div className="home-ask-title">好客问答</div>
        <ul>
          {faqs.map(item => {
            return (
              <li key={item.question_id}>
                <div>
                  <Icon name="question circle outline" />
                  <span>{item.question_name}</span>
                </div>
                <div>
                  {item.question_tag.ChannelSplitterNode(',').map(subitem => {
                    return (
                      <Button basic color="green" key={subitem}>
                        {subitem}
                      </Button>
                    )
                  })}
                  <div>
                    {item.atime} ● <Icon name="comment alternate outline" />
                    {item.qnum}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // 渲染房屋列表
  renderHouses = houses => {
    // 最新开盘
    const newHouses = houses.filter(item => item.home_type === 1)
    // 二手精选
    const oldHouses = houses.filter(item => item.home_type === 2)
    // 热门房源
    const hotHouses = houses.filter(item => item.home_type === 3)

    return (
      <div>
        <HousesList title="最新开盘" houses={newHouses} />
        <HousesList title="二手精选" houses={oldHouses} />
        <HousesList title="热门房源" houses={hotHouses} />
      </div>
    )
  }

  render() {
    // 对state中的数据进行解构赋值
    const { isLoading, swipes, menus, infos, faqs, houses } = this.state
    return (
      <div className="home-container">
        {/* 加载器视图 */}
        <Dimmer active={isLoading} inverted>
          <Loader inverted>正在加载中...</Loader>
        </Dimmer>
        {/* 头部 */}
        <div className="home-topbar">
          <Input
            fluid
            icon={{name: 'search', circluar: 'true', link: true }}
            placeholder="搜房源..."
          />
        </div>
        <div className="home-content">
          {/* 轮播图 */}
          <ImageGallery
            autoPlay
            showBullets
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            items={swipes}
          />
          {/* 菜单 */}
          {this.renderMenus(menus)}
          {/* 资讯 */}
          {this.renderInfos(infos)}
          {/* 问答区域 */}
          {this.renderFaqs(faqs)}
          {/* 房屋列表 */}
          {this.renderHouses(houses)}
        </div>
      </div>
    )
  }
}

export default Home
