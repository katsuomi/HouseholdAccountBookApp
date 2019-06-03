import React, { Component } from 'react';
import { connect } from 'react-redux';
import {readIncomes,deleteIncome,readYourGraph,updateIncome} from "../actions";
import { withRouter } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class ReadIncomes extends Component {
    constructor(props){
        super(props)
        this.Sum_your_incomes = this.Sum_your_incomes.bind(this)
        this.DeleteIncome = this.DeleteIncome.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.UpdateIncome = this.UpdateIncome.bind(this);
        this.UpdateIncomeNext = this.UpdateIncomeNext.bind(this);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: 'md',
            income: 0,
            categoli: "",
            id: 0,
        };
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
        await this.props.readYourGraph()
    }

    handleClickOpen(income,categoli,id){
        this.setState({ open: true,income: income,categoli: categoli,id: id})
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    async UpdateIncomeNext(){
        await this.props.readYourGraph()
        await this.props.readIncomes()
    }


    UpdateIncome(e){
        e.preventDefault()
        const income = e.target.income.value
        const categoli = e.target.categoli.value
        this.props.updateIncome(income,categoli,this.state.id)
        setTimeout(this.UpdateIncomeNext,1000);
        this.setState({open: false})
    }



    renderIncomes(){
        return(
            <React.Fragment>
                <Paper style={{width: '100%',overflowX: 'auto',}}>
                    <Table style={{minWidth: "750px"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">カテゴリー</TableCell>
                                <TableCell align="left">金額</TableCell>
                                <TableCell align="left">日時</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.your_incomes.map((income,i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">{income.categoli}</TableCell>
                                    <TableCell align="left">{income.income}</TableCell>
                                    <TableCell align="left">{(income.created_at)}</TableCell>
                                    <TableCell align="left"><Typography color="primary" className="pointer" onClick={() => this.handleClickOpen(income.income,income.categoli,income.id)}  variant="h5" component="h2"><Icon>create</Icon></Typography></TableCell>
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <form onSubmit={this.UpdateIncome}>
                            <TextField label="カテゴリー" name="categoli" type="text" defaultValue={this.state.categoli}  required />
                            <br/>
                            <br/>
                            <TextField label="収入金額"  name="income" type="number" defaultValue={this.state.income} required />
                            <br/>
                            <br/>
                            <div className="center">
                                <Button variant="contained" type="submit" >
                                    変更
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            閉じる
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
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

const mapDispatchToProps = ({readIncomes,deleteIncome,readYourGraph,updateIncome})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadIncomes))