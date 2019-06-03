import React, { Component } from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip,AreaChart,linearGradient ,Area} from "recharts"

import { connect } from 'react-redux';
import {readGraphs} from "../actions";



class ReadGraphs extends Component {
  constructor(props){
    super(props)
  }

  async componentDidMount(){
    await this.props.readGraphs()
  }



  render() {
    console.log(this.props.graph_results)
    return (
      <React.Fragment>
        <br/>
        <hr color="#EEEEEE" width="80%" />
        <h2>みんなの収支グラフ</h2>
        <LineChart  width={1400} height={700} data={this.props.graph_results} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
            <XAxis dataKey="categoli" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="rgb(15, 185, 207)" />
        </LineChart>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({readGraphs })

const mapStateToProps = state => ({graph_results: state.graphs.graph_results })

export default connect(mapStateToProps, mapDispatchToProps)(ReadGraphs)