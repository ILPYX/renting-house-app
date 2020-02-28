import { createStore } from "redux";

// 导入reducers
import reducers from './reducers'

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store