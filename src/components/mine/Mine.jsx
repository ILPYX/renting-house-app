import React, { Component } from 'react'

import './Mine.css'

import { Button, Grid, Icon, Modal } from "semantic-ui-react";

import avatar from '../../static/images/avatar.png'

import AvatarEditor from 'react-avatar-editor'

// 图片裁剪的子组件
class ClipImage extends Component {
  constructor() {
    super()

    this.state = {
      scale: 1
    }

    this.clipRef = React.createRef()
  }

  changeScale = e => {
    this.setState({
      scale: parseFloat(e.target.value)
    })
  }

  clip = async () => {
    // 1. 拿到被裁剪的图片
    const base64Img = this.clipRef.current.getImage().toDataURL()

    // 2. 发送网络请求, 更新用户的头像
    const res = await this.axios.post('my/avatar', {
      avatar: base64Img
    })

    this.props.callback(base64Img)
  }

  render() {
    return <Modal size="small" open={this.props.open} onClose={() => { this.props.callback(null) }}>
      <Modal.Header>图片裁剪</Modal.Header>
      <Modal.Content>
        <AvatarEditor
          image={this.props.clipImage}
          ref={this.clipRef}
          borderRadius={90}
          width={180}
          height={180}
          border={50}
          color={[0, 0, 0, 0.55]} // RGBA
          scale={this.state.scale}
          rotate={0}
        /><br />
        <span className="avatar-zoom">缩放：</span>
        <input min="1" max="2" step="0.01" onChange={this.changeScale} value={this.state.scale} type="range" />
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => { this.props.callback(null) }}>取消</Button>
        <Button positive icon='checkmark' onClick={this.clip} labelPosition='right' content='确定' />
      </Modal.Actions>
    </Modal>
  }
}

// 图片选择的子组件
class SelectImage extends Component {
  sure = () => {
    const file = this.refs.fileRef.files[0]

    this.props.callback(file)
  }

  render() {
    return (
      <Modal size="small" open={this.props.open} onClose={() => { this.props.callback(null) }}>
        <Modal.Header>图片选择</Modal.Header>
        <Modal.Content>
          <input ref="fileRef" type="file" />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => { this.props.callback(null) }} negative>取消</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            onClick={this.sure}
            content="确定"
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

class Mine extends Component {
  constructor() {
    super()

    this.state = {
      info: {},
      avatarImg: null, // 裁剪之后的图片
      isShowSelectImage: false, // 是否展示选择图片组件
      isShowClipImage: false, // 是否展示裁剪图片组件
      clipImage: null
    }
  }

  componentWillMount() {
    this.loadData()
  }

  loadData = async () => {
    const res = await this.axios.post('my/info', {
      user_id: localStorage.getItem('uid')
    })

    this.setState({
      info: res.data.data
    })
  }

  // 关闭图片选择组件
  closeSelectImage = file => {
    this.setState({
      isShowSelectImage: false
    })
    if (file) {
      this.setState({
        clipImage: file,
        isShowClipImage: true
      })
    }
  }

  // 关闭裁剪图片组件
  closeClipImage = base64Img => {
    this.setState({
      isShowClipImage: false,
      avatarImg: base64Img
    })
  }

  render() {
    return (
      <div className="my-container">
        <div className="my-title">
          <img src="http://47.96.21.88:8086/public/my-bg.png" alt="" />
          <div className="info">
            <div className="myicon">
              {
                this.state.avatarImg ? <img onClick={() => { this.setState({ isShowSelectImage: true }) }} src={this.state.avatarImg} alt="" /> : <img onClick={() => { this.setState({ isShowSelectImage: true }) }} src={this.state.info.avatar || avatar} alt="" />
              }
            </div>
            <div className="name">{this.state.info.username}</div>
            <Button size="small" color="green">
              已认证
            </Button>
            <div className="edit">编辑资料</div>
          </div>
        </div>
        <Grid padded className="my-menu">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name="clock outline" size="big" />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="yen sign" size="big" />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="bookmark outline" size="big" />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="user outline" size="big" />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="home" size="big" />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="microphone" size="big" />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="my-ad">
          <img src="http://47.96.21.88:8086/public/ad.png" alt="" />
        </div>
        {/* 选择图片组件 */}
        <SelectImage open={this.state.isShowSelectImage} callback={this.closeSelectImage} />
        {/* 图片裁剪组件 */}
        <ClipImage open={this.state.isShowClipImage} callback={this.closeClipImage} clipImage={this.state.clipImage} />
      </div>
    )
  }
}

export default Mine
