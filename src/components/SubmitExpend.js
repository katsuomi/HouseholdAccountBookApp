import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitExpend} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';

class SubmitExpend extends Component {
    constructor(props){
        super(props)
        this.SubmitExpend = this.SubmitExpend.bind(this);
        this.onChangeExpendValue = this.onChangeExpendValue.bind(this);
        this.onChangeCategoliValue = this.onChangeCategoliValue.bind(this);
    }

    onChangeExpendValue(e){
        e.preventDefault();
    }   

    onChangeCategoliValue(e){
        e.preventDefault();
    }   


    async SubmitExpend(e){
        let expend = e.target.expend.value
        let categoli = e.target.categoli.value
        await this.props.submitExpend(expend,categoli)
        e.target.expend.value = '';
        e.target.categoli.value = '';
    }


    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <form onSubmit={this.SubmitExpend}>
                        <br/>
                        <TextField label="支出金額"  name="expend" onChange={this.onChangeExpendValue} type="number" required />
                        <br/>
                        <br/>
                        <TextField label="カテゴリー" name="categoli" type="text" onChange={this.onChangeCategoliValue} required />
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


const mapDispatchToProps = ({submitExpend })

export default withRouter(connect(null, mapDispatchToProps)(SubmitExpend))