import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitIncome,graph,readIncomes,searchIncomesCategoli} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';


class SubmitIncome extends Component {
    constructor(props){
        super(props)
        this.SubmitIncome = this.SubmitIncome.bind(this);
        this.onChangeCategoliValue = this.onChangeCategoliValue.bind(this);
        this.SubmitIncomeNext = this.SubmitIncomeNext.bind(this);
        this.state={
            categoli_value: ""
        }
    }

    async SubmitIncomeNext(){
        await this.props.graph()
        await this.props.readIncomes()
    }

    onChangeCategoliValue(e){
        if(e.target.value){
            e.preventDefault();
            this.props.searchIncomesCategoli(e.target.value)
            this.setState({categoli_value: e.target.value})
        }
    }   


    SubmitIncome(e){
        e.preventDefault()
        const income = e.target.income.value
        const categoli = e.target.categoli.value
        this.props.submitIncome(income,categoli)
        setTimeout(this.SubmitIncomeNext,1000);
        e.target.income.value = '';
        e.target.categoli.value = '';
    }


    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <form onSubmit={this.SubmitIncome}>
                        <br/>
                        <TextField label="カテゴリー" name="categoli" type="text" onChange={this.onChangeCategoliValue} required />
                        <br/>
                        <br/>
                        <TextField label="収入金額"  name="income" type="number" required />
                        <br/>
                        <br/>
                        {this.props.result ? 
                            <p>カテゴリー<b>「{this.props.result}」</b>は存在しています。そちらに収入を追加します。</p>
                        :
                            <p style={{display: this.state.categoli_value ? "" : "none"}}>カテゴリー「{this.state.categoli_value}」は存在しません。新規に作成します。</p>
                        }
                        <Button variant="contained" type="submit">
                            送信
                        </Button>
                    </form> 
                </div>
            </React.Fragment>
        )
    }   
}

const mapStateToProps = state => ({result: state.searches.result  })

const mapDispatchToProps = ({submitIncome,graph,readIncomes,searchIncomesCategoli })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitIncome))