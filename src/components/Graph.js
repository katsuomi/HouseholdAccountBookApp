import React, { Component } from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip,AreaChart,linearGradient ,Area} from "recharts"
import { connect } from 'react-redux';
import {graph} from "../actions";


  
class Graph extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.graph()
    }
    

    render(){
    return (
        <LineChart  width={300} height={300} data={this.props.graph_results} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="categoli" />
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="rgb(15, 185, 207)" />
        </LineChart>
    )
  }
}


const mapDispatchToProps = ({graph })

const mapStateToProps = state => ({graph_results: state.graphs.graph_results })

export default connect(mapStateToProps, mapDispatchToProps)(Graph)