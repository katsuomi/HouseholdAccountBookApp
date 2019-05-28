import React, { Component } from 'react';
import { connect } from 'react-redux';
import {readIncomes,deleteIncome,graph} from "../actions";
import { withRouter } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


class ReadIncomes extends Component {
    constructor(props){
        super(props)
        this.Sum_your_incomes = this.Sum_your_incomes.bind(this)
        this.DeleteIncome = this.DeleteIncome.bind(this)
    }

    componentDidMount(){
        this.props.readIncomes()
    }

    Sum_your_incomes(){
        let sum = 0
        this.props.your_incomes.map((income) => {
            sum = sum + income.income
        })
        return sum
    }

    async DeleteIncome(id){
        await this.props.deleteIncome(id)
        await this.props.readIncomes()
        await this.props.graph()
    }

    renderIncomes(){
        return(
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">カテゴリー</TableCell>
                            <TableCell align="left">金額</TableCell>
                            <TableCell align="left">日時</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.your_incomes.map((income,i) => (
                            <TableRow key={i}>
                                <TableCell align="left">{income.categoli}</TableCell>
                                <TableCell align="left">{income.income}</TableCell>
                                <TableCell align="left">{(income.created_at)}</TableCell>
                                <TableCell align="left"><Typography color="primary" className="pointer" onClick={() => this.DeleteIncome(income.id)} variant="h5" component="h2"><Icon>delete_sweep</Icon></Typography></TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell>合計</TableCell>
                            <TableCell align="left"><span className="bold">{this.Sum_your_incomes()}</span></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render(){
        return (
            <React.Fragment>
                <h2>収入</h2>
                {this.renderIncomes()}
            </React.Fragment>
        )
    }   
}


const mapStateToProps = state => ({your_incomes: state.incomes.your_incomes  })

const mapDispatchToProps = ({readIncomes,deleteIncome,graph})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadIncomes))