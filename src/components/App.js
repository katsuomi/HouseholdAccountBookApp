import React, { Component } from 'react';
import Header from "../presentationalComponents/Header";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import LoginUser from './LoginUser';
import ReadGraphs from './ReadGraphs';
import SubmitExpend from './SubmitExpend';
import SubmitIncome from './SubmitIncome';
import ReadIncomes from './ReadIncomes';
import ReadExpends from './ReadExpends';
import ReadNews from './ReadNews';
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
            <h2 style={{marginLeft: "90px"}}>{new Date().getFullYear()}年{new Date().getMonth()+1}月</h2>
            <Grid container>
              <Grid item xs={12} sm={2}></Grid> 
              <Grid item xs={12} sm={4}>
                <Tabs>
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
              <Grid item xs={12} sm={6}>
                <Graph />
              </Grid>
              <Grid item xs={12} sm={12} md={1}></Grid> 
              <Grid item xs={12} sm={12} md={10}>
                <br/>
                <ReadIncomes />
                <br/>
                <ReadExpends />
              </Grid>
              <Grid item xs={12} sm={12} md={1}></Grid> 

              <Grid item xs={12} sm={12} md={3}></Grid> 
              <Grid item xs={12} sm={12} md={6}>
                <ReadNews  />
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid> 
            </Grid>
          </div>
        :
          <div>
            <Grid item xs={12} sm={12} md={12}>
              <LoginUser />
              <div className="center top-graph-style">
                <ReadGraphs />
              </div>
            </Grid>
          </div>     
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({readCurrentUser })

const mapStateToProps = state => ({ uid: state.users.currentuser_uid })

export default connect(mapStateToProps, mapDispatchToProps)(App)