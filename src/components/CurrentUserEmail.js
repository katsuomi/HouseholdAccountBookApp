import React, { Component } from 'react';
import { connect } from 'react-redux';
import {readCurrentUser} from "../actions";
import { withRouter } from 'react-router';

class CurrentUserEmail extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.readCurrentUser()
    }



    render() {
        return (
            <React.Fragment>
                {this.props.email ?
                    <div style={{position: "absolute",top: "20px",right: "0"}}><span className="bold">{this.props.email}</span>でログイン中</div>                
                :
                    <div></div>
                }

            </React.Fragment>
        )
    }   
}

const mapStateToProps = state => ({ email: state.users.currentuser_email })

const mapDispatchToProps = ({readCurrentUser })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentUserEmail))