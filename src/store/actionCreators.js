import { IS_SHOW_MAP, IS_SHOW_CALC } from "./actionTypes";

export function mapAction(isShowMap) {
  return {
    type: IS_SHOW_MAP,
    isShowMap
  }
}

export function calcAction(isShowCalc) {
  return {
    type: IS_SHOW_CALC,
    isShowCalc
  }
}