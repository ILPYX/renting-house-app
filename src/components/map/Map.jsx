import React, { Component } from 'react'

import { Icon } from "semantic-ui-react"

import './Map.css'

import { mapAction } from '../../store/actionCreators'

import { connect } from "react-redux"

class Map extends Component {
  componentDidMount() {
    const BMap = window.map
    // 创建地图实例
    var map = new BMap.Map("container")

    // 创建中心点
    var point = new BMap.Point(116.404, 39.915)

    // 设置到地图实例上, 并且设置缩放范围
    map.centerAndZoom(point, 15)

    var marker = new BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画

    // 添加其它地图控件
    // var bottom_right_control = new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT});// 右下角，添加比例尺
    // map.addControl(bottom_right_control)

    // // var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    // // map.addControl(top_left_navigation)

    // var top_right_navigation = new BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
    // map.addControl(top_right_navigation)

    // map.addControl(new BMap.NavigationControl());    
    // map.addControl(new BMap.ScaleControl());    
    // map.addControl(new BMap.OverviewMapControl());    
    // map.addControl(new BMap.MapTypeControl());    
    // map.setCurrentCity("北京");

    // 将标注添加到地图中
    var opts = {
      width: 100, // 信息窗口宽度
      height: 50, // 信息窗口高度
      title: "Hello" // 信息窗口标题
    }
    var infoWindow = new BMap.infoWindow("World", opts) // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter()) // 打开信息窗口

    var driving = new BMap.WalkingRoute(map, {
      renderOption: {
        map: map,
        autoViewport: true
      }
    })
    var start = new BMap.Point(116.310791, 40.003419)
    var end = new BMap.Point(116.486419, 39.877282)
    driving.search(start, end)
  }
  render() {
    return (
      <div className="map-house">
        <div className="map-house-title">
          {/* <Icon onClick={() => {this.props.callback()}} name="angle left" size="large" /> */}
          <Icon onClick={this.props.hideMap} name="angle left" size="large" />
          <span>地图找房</span>
        </div>
        <div id="container" className="map-house-content">

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideMap() {
      dispatch(mapAction(false))
    }
  }
}

export default connect(null, mapDispatchToProps)(Map)