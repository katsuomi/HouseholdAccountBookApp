import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitExpend,searchExpendsCategoli,graph,readExpends} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';


class SubmitExpend extends Component {
    constructor(props){
        super(props)
        this.SubmitExpend = this.SubmitExpend.bind(this);
        this.onChangeCategoliValue = this.onChangeCategoliValue.bind(this);
        this.SubmitExpendNext = this.SubmitExpendNext.bind(this);
        this.state={categoli_value: ""}
    }

    componentDidMount(){
        this.props.graph()
    }

    onChangeCategoliValue(e){
        if(e.target.value){
            e.preventDefault();
            this.props.searchExpendsCategoli(e.target.value)
            this.setState({categoli_value: e.target.value})
        }
    }   

    async SubmitExpendNext(){
        await this.props.graph()
        await this.props.readExpends()
    }


    SubmitExpend(e){
        e.preventDefault()
        const expend = e.target.expend.value
        const categoli = e.target.categoli.value
        this.props.submitExpend(expend,categoli)
        setTimeout(this.SubmitExpendNext,1000);
        e.target.expend.value = '';
        e.target.categoli.value = '';
    }


    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <form onSubmit={this.SubmitExpend}>
                        <br/>
                        <TextField label="カテゴリー" name="categoli" type="text" onChange={this.onChangeCategoliValue} required />
                        <br/>
                        <br/>
                        <TextField label="支出金額"  name="expend" type="number" required />
                        <br/>
                        <br/>
                        {this.props.result ? 
                            <p>支出カテゴリー<b>「{this.props.result}」</b>は存在しています。そちらに支出を追加します。</p>
                        :
                            <p style={{display: this.state.categoli_value ? "" : "none"}}>支出カテゴリー「{this.state.categoli_value}」は存在しません。新規に作成します。</p>
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

const mapDispatchToProps = ({submitExpend,searchExpendsCategoli,graph,readExpends })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitExpend))