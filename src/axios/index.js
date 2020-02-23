import React from 'react'
import axios from 'axios'

// axios 相关的设置
axios.defaults.baseURL = 'http://47.96.21.88:8086/'

React.Component.prototype.axios = axios