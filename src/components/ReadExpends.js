import React, { Component } from 'react';
import { connect } from 'react-redux';
import {readExpends} from "../actions";
import { withRouter } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ReadExpends extends Component {
    constructor(props){
        super(props)
        this.Sum_your_expends = this.Sum_your_expends.bind(this)
    }

    componentDidMount(){
        this.props.readExpends()
    }

    Sum_your_expends(){
        let sum = 0
        this.props.your_expends.map((expend) => {
            sum = sum + expend.expend
        })
        return sum
    }

    renderExpends(){
        return(
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">カテゴリー</TableCell>
                            <TableCell align="left">金額</TableCell>
                            <TableCell align="left">日時</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.your_expends.map((expend,i) => (
                            <TableRow key={i}>
                                <TableCell align="left">{expend.categoli}</TableCell>
                                <TableCell align="left">{expend.expend}</TableCell>
                                <TableCell align="left">{(expend.created_at)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell>合計</TableCell>
                            <TableCell align="left"><span className="bold">{this.Sum_your_expends()}</span></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render(){
        return (
            <React.Fragment>
                <h2>支出</h2>
                {this.renderExpends()}
            </React.Fragment>
        )
    }   
}


const mapStateToProps = state => ({your_expends: state.expends.your_expends  })

const mapDispatchToProps = ({readExpends})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadExpends))