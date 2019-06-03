import React, { Component } from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip,AreaChart,linearGradient ,Area} from "recharts"
import { connect } from 'react-redux';
import {readYourGraph} from "../actions";


  
class Graph extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.readYourGraph()
    }
    

    render(){
    return (
        <React.Fragment>
        <h2 style={{marginLeft: "90px"}}>収支グラフ</h2>
        <LineChart  width={380} height={300} data={this.props.graph_results} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
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


const mapDispatchToProps = ({readYourGraph })

const mapStateToProps = state => ({graph_results: state.graphs.graph_results })

export default connect(mapStateToProps, mapDispatchToProps)(Graph)