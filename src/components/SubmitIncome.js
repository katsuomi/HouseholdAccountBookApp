import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitIncome,graph} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';


class SubmitIncome extends Component {
    constructor(props){
        super(props)
        this.SubmitIncome = this.SubmitIncome.bind(this);
        this.SubmitIncomeNext = this.SubmitIncomeNext.bind(this);
    }

    async SubmitIncomeNext(){
        await this.props.graph()
    }


    SubmitIncome(e){
        e.preventDefault()
        const income = e.target.income.value
        this.props.submitIncome(income)
        setTimeout(this.SubmitIncomeNext,1000);
        e.target.income.value = '';
    }


    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <form onSubmit={this.SubmitIncome}>
                        <br/>
                        <TextField label="収入金額"  name="income" type="number" required />
                        <br/>
                        <br/>
                        <Button variant="contained" type="submit">
                            送信
                        </Button>
                    </form> 
                </div>
            </React.Fragment>
        )
    }   
}


const mapDispatchToProps = ({submitIncome,graph })

export default withRouter(connect(null, mapDispatchToProps)(SubmitIncome))