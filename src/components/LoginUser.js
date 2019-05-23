import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import {loginuser} from "../actions";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class LoginUser extends Component {
    constructor(props){
        super(props)
        this.SubmitLogin = this.SubmitLogin.bind(this);
    }


    async SubmitLogin(values){
        let email = values.email;
        let password = values.password;
        await this.props.loginuser(email,password)
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
        const props = this.props
        return (
            <React.Fragment>
                <Header />
                <div className="center marginTop100px">
                    家計簿アプリ <span className="bold">ログイン</span>
                </div>
                <div>
                    <section className="marginTop20px">
                        <Grid justify="center" container>
                            <Card className="width200px">
                                <Typography className="boderBottomGrey center">DEMOアカウント</Typography>
                                <Typography className="paddingLeft10px">email: demo@demo.com</Typography>
                                <Typography className="paddingLeft10px">pass : demo123</Typography>
                            </Card>
                        </Grid>
                    </section>
                </div>
                <div className="center">
                    <section>
                        <form onSubmit={handleSubmit(this.SubmitLogin)}>
                            <br/>
                            <Field label="メールアドレス" name="email" component={this.emailField} />
                            <br/>
                            <br/>
                            <Field label="パスワード" name="password" component={this.passField} />
                            <br/>
                            <br/>
                            <Button variant="outlined" color="primary" type="submit" disabled={pristine || submitting}>
                                ログイン
                            </Button>
                        </form> 
                    </section>
                    <br/>
                    <Link to="/password_reset" className="text_decoration_none">パスワードを忘れた方はこちら</Link>
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

const mapDispatchToProps = ({loginuser })

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate,form: "loginuser" })(LoginUser)
)