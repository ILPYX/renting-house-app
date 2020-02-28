import React, { Component } from 'react'

import './Calc.css'

import { Icon, Tab, Grid, Dropdown, Input, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import { calcAction } from "../../store/actionCreators";

class Calc extends Component {
  constructor() {
    super()

    this.state = {
      // 贷款方式
      types: [
        { key: '1', value: '1', text: '按贷款总额' },
        { key: '2', value: '2', text: '按房间总额' }
      ],
      type: '2', // 默认贷款方式
      loanTotal: 0,
      // 贷款年限
      years: [
        { key: '1', value: '1', text: '10年' },
        { key: '2', value: '2', text: '20年' },
        { key: '3', value: '3', text: '30年' }
      ],
      year: '3', // 默认贷款年限
      // 贷款利率
      rates: [
        { key: '1', value: '1', text: '基准利率(4.9)' },
        { key: '2', value: '2', text: '利率9.5折' },
        { key: '3', value: '3', text: '利率9折' },
        { key: '4', value: '4', text: '利率8.5折' },
      ],
      rate: '1' // 默认贷款利率
    }
  }

  // 更改贷款方式
  changeType = (e, data) => {
    this.setState({
      type: data.value
    })
  }

  // 更改贷款年限
  changeYear = (e, data) => {
    this.setState({
      year: data.value
    })
  }

  // 更改贷款利率
  changeRate = (e, data) => {
    this.setState({
      rate: data.value
    })
  }

  renderCommercialLoans = () => {
    const { types, type, loanTotal, years, year, rates, rate } = this.state
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              贷款方式
                    </Grid.Column>
            <Grid.Column width={10}>
              <Dropdown fluid selection onChange={this.changeType} options={types} value={type} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              贷款总额(万元)
                    </Grid.Column>
            <Grid.Column width={10}>
              <Input fluid onChange={e => { this.setState({ loanTotal: e.target.value }) }} value={loanTotal} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              贷款年限
                    </Grid.Column>
            <Grid.Column width={10}>
              <Dropdown fluid selection onChange={this.changeYear} options={years} value={year} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              贷款年限
                    </Grid.Column>
            <Grid.Column width={10}>
              <Dropdown fluid selection onChange={this.changeRate} options={rates} value={rate} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button fluid positive>计算</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  panes = [
    { menuItem: '商业贷款', render: () => <Tab.Pane>{this.renderCommercialLoans()}</Tab.Pane> },
    { menuItem: '公积金贷款', render: () => <Tab.Pane>公积金贷款</Tab.Pane> },
    { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> }
  ]

  render() {
    return (
      <div className="home-calc">
        <div className="home-calc-title">
          <Icon onClick={this.props.hideCalc} name="angle left" size="large" />
          <span>贷款计算器</span>
        </div>
        <div className="home-calc-content">
          <Tab panes={this.panes} />
        </div>
      </div>
    )
  }
}

export default connect(null, dispatch => {
  return {
    hideCalc() {
      dispatch(calcAction(false))
    }
  }
})(Calc)