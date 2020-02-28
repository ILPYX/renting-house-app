import { IS_SHOW_MAP, IS_SHOW_CALC } from "./actionTypes"

const intialState = {
  isShowMap: false, // 是否显示地图
  isShowCalc: true // 是否显示计算器
}

export default function (prevState = intialState, action) {
  switch (action.type) {
    case IS_SHOW_MAP:
      const mapObj = JSON.parse(JSON.stringify(prevState))
      mapObj.isShowMap = action.isShowMap
      return mapObj
    
    case IS_SHOW_CALC:
      const calcObj = JSON.parse(JSON.stringify(prevState))
      calcObj.isShowCalc = action.isShowCalc
      return calcObj
    
    default:
      return prevState
  }
}