import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import {signupUser} from "../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router';


class SignupUser extends Component {
    constructor(props){
        super(props)
        this.SubmitRegister = this.SubmitRegister.bind(this);
    }


    async SubmitRegister(values){
        let email = values.email
        let password = values.password
        await this.props.signupUser(email,password)
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

    passField = ({
        input,
        label,
        meta: { touched, error },
        type='password',
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
        return (
            <React.Fragment>
                <Header />
                <div className="center marginTop100px">
                    家計簿アプリ <span className="bold">新規登録</span>
                    <section>
                        <form onSubmit={handleSubmit(this.SubmitRegister)}>
                            <br/>
                            <Field label="メールアドレス" name="email" component={this.emailField} />
                            <br/>
                            <br/>
                            <Field label="パスワード" name="password" component={this.passField} />
                            <br/>
                            <br/>
                            <Button variant="outlined" color="inherit" type="submit" disabled={pristine || submitting}>
                                新規登録
                            </Button>
                        </form> 
                    </section>

                </div>
            </React.Fragment>
        )
    }   
}

const validate = values => {
    const errors = {}

    if(!values.email) errors.email = "この項目を入力してください。"
    if(!values.password) errors.password = "この項目を入力してください。"
    return errors
}

const mapDispatchToProps = ({signupUser })

export default withRouter(connect(null, mapDispatchToProps)(
    reduxForm({ validate,form: "signupcompany" })(SignupUser)
))