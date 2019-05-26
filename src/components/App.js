import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import LoginUser from './LoginUser';
import SubmitExpend from './SubmitExpend';
import {readCurrentUser} from "../actions";

class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.readCurrentUser()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.uid ? 
          <div>
            <Header />
            <SubmitExpend />
          </div>
        :
          <div>
            <LoginUser />
          </div>     
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({readCurrentUser })

const mapStateToProps = state => ({ uid: state.users.currentuser_uid })

export default connect(mapStateToProps, mapDispatchToProps)(App)