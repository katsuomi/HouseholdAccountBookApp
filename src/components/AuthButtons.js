import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {  MenuItem } from 'material-ui';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {logout} from "../actions";
import Icon from '@material-ui/core/Icon';


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
                <Link to="/" className="text_decoration_none">
                    <MenuItem><Icon>home</Icon>ホーム</MenuItem>
                </Link>
                {props.uid ? 
                    <div>
                        <MenuItem>{this.props.email}でログイン中</MenuItem>
                        <MenuItem onClick={this.logout}><Icon>trending_down</Icon>ログアウト</MenuItem>     
                    </div>
                :
                    <div>
                        <Link to="/login_user" className="text_decoration_none"><MenuItem><Icon>trending_up</Icon>ログイン</MenuItem></Link>
                        <Link to="/signup_user" className="text_decoration_none"><MenuItem><Icon>open_in_new</Icon>新規登録</MenuItem></Link>
                    </div>
                }
            </div>
        );
    }
}


const mapDispatchToProps = ({ logout })

const mapStateToProps = state => ({uid: state.users.currentuser_uid,email: state.users.currentuser_email })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthButtons))


