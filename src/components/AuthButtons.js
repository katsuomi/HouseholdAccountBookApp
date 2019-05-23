import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {  MenuItem } from 'material-ui';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {logout} from "../actions";


class AuthButtons extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.logout()
    }

    render(){
        const props = this.props
        return (
            <div>
                <Link to="/" className="text_decoration_none"><MenuItem>ホーム</MenuItem></Link>
                {props.uid ? 
                    <div>
                        <MenuItem onClick={this.logout}>ログアウト</MenuItem>     
                    </div>
                :
                    <div>
                        <Link to="/login_user" className="text_decoration_none"><MenuItem>ログイン</MenuItem></Link>
                        <Link to="/signup_user" className="text_decoration_none"><MenuItem>新規登録</MenuItem></Link>
                    </div>
                }
            </div>
        );
    }
}


const mapDispatchToProps = ({ logout })

const mapStateToProps = state => ({uid: state.users.currentuser_uid })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthButtons))


