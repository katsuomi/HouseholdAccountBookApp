import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import LoginUser from './LoginUser';

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        {this.props.uid ? 
          <div>
            <Header />
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

const mapDispatchToProps = ({ })

const mapStateToProps = state => ({ uid: state.users.currentuser_uid })

export default connect(mapStateToProps, null)(App)