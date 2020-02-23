import React, { Component } from 'react'

import img  from '../../static/images/404.png';

class notfound extends Component {
  render() {
    return (
      <div>
        <img src={img} alt=""/>
      </div>
    )
  }
}

export default notfound;
