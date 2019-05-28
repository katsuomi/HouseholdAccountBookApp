import React, { Component } from 'react';
import { connect } from 'react-redux';
import {readExpends,deleteExpend,graph,updateExpend} from "../actions";
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


class ReadExpends extends Component {
    constructor(props){
        super(props)
        this.Sum_your_expends = this.Sum_your_expends.bind(this)
        this.DeleteExpend = this.DeleteExpend.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.UpdateExpend = this.UpdateExpend.bind(this);
        this.UpdateExpendNext = this.UpdateExpendNext.bind(this);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: 'md',
            expend: 0,
            categoli: "",
            id: 0,
        };
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

    async DeleteExpend(id){
        await this.props.deleteExpend(id)
        await this.props.readExpends()
        await this.props.graph()
    }

    handleClickOpen(expend,categoli,id){
        this.setState({ open: true,expend: expend,categoli: categoli,id: id})
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    async UpdateExpendNext(){
        await this.props.graph()
        await this.props.readExpends()
    }


    UpdateExpend(e){
        e.preventDefault()
        const expend = e.target.expend.value
        const categoli = e.target.categoli.value
        this.props.updateExpend(expend,categoli,this.state.id)
        setTimeout(this.UpdateExpendNext,1000);
        this.setState({open: false})
    }



    renderExpends(){
        return(
            <React.Fragment>
                <Paper>
                    <Table>
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
                            {this.props.your_expends.map((expend,i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">{expend.categoli}</TableCell>
                                    <TableCell align="left">{expend.expend}</TableCell>
                                    <TableCell align="left">{(expend.created_at)}</TableCell>
                                    <TableCell align="left"><Typography color="primary" className="pointer" onClick={() => this.handleClickOpen(expend.expend,expend.categoli,expend.id)}  variant="h5" component="h2"><Icon>create</Icon></Typography></TableCell>
                                    <TableCell align="left"><Typography color="primary" className="pointer" onClick={() => this.DeleteExpend(expend.id)} variant="h5" component="h2"><Icon>delete_sweep</Icon></Typography></TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell>合計</TableCell>
                                <TableCell align="left"><span className="bold">{this.Sum_your_expends()}</span></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <DialogContent>
                        <form onSubmit={this.UpdateExpend}>
                            <TextField label="カテゴリー" name="categoli" type="text" defaultValue={this.state.categoli}  required />
                            <br/>
                            <br/>
                            <TextField label="支出金額"  name="expend" type="number" defaultValue={this.state.expend} required />
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
                <h2>支出</h2>
                {this.renderExpends()}
            </React.Fragment>
        )
    }   
}


const mapStateToProps = state => ({your_expends: state.expends.your_expends  })

const mapDispatchToProps = ({readExpends,deleteExpend,graph,updateExpend})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadExpends))