import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import LoginUser from './LoginUser';
import SubmitExpend from './SubmitExpend';
import SubmitIncome from './SubmitIncome';
import Graph from './Graph';
import {readCurrentUser} from "../actions";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

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
            <Grid container>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <Tabs className="marginTop100px">
                  <TabList>
                    <Tab>収入を記入</Tab>
                    <Tab>支出を記入</Tab>
                  </TabList>

                  <TabPanel>
                    <SubmitIncome />
                  </TabPanel>
                  <TabPanel>
                    <SubmitExpend />
                  </TabPanel>
                </Tabs>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Graph />
            </Grid>
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