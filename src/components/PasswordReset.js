import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import {passwordreset} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';

class PasswordReset extends Component {
    constructor(props){
        super(props)
        this.SubmitPasswordReset = this.SubmitPasswordReset.bind(this);
    }


    async SubmitPasswordReset(values){
        let email = values.email;
        await this.props.passwordreset(email)
        this.props.history.push("/")
    }


    emailField = ({
        input,
        label,
        meta: { touched, error },
        type='email',
        required = false,
        rootClass = '',
      }) => (
        <TextField
          required={required}
          classes={{root: rootClass}}
          error={!!(touched && error)}
          label={label}
          type={type}
          helperText={touched && error}
          {...input}
          className="width200px"
        />
    )


    render() {
        const { handleSubmit,pristine,submitting } = this.props 
        const props = this.props
        return (
            <React.Fragment>
                <Header />
                <br/>
                <div className="center marginTop100px">
                    家計簿アプリに登録済みのメールアドレスを入力してください。<br/>
                    パスワード再設定用のURLをお送りします。
                    <div>
                        <form onSubmit={handleSubmit(this.SubmitPasswordReset)}>
                            <br/>
                            <Field label="メールアドレス" name="email" type="email" id="email" component={this.emailField}  />
                            <br/>
                            <br/>
                            <Button variant="outlined" color="primary" type="submit" disabled={pristine || submitting}>
                                送信
                            </Button>
                        </form> 
                    </div>
                    <br/>
                </div>
            </React.Fragment>
        )
    }   
}

const validate = values => {
    const errors = {}
    if(!values.email) errors.email = "この項目を入力してください。"
    return errors
}

const mapDispatchToProps = ({passwordreset })

export default withRouter(connect(null, mapDispatchToProps)(
    reduxForm({ validate,form: "logincompany" })(PasswordReset)
))