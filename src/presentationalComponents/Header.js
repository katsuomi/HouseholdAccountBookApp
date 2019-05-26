import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthButtons from "../components/AuthButtons"
import { AppBar, Drawer } from 'material-ui';
import CurrentUserEmail from "../components/CurrentUserEmail"

class Header extends Component {
    constructor() {
        super()
        this.state = {
          open: false,
          user: null
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
          open: !this.state.open
        })
    }


    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <Drawer
                    docked={false}
                    width={270}
                    open={this.state.open}
                    onRequestChange={this.handleToggle}
                    >
                        <AuthButtons />
                    </Drawer>
                    <AppBar
                    title="家計簿アプリ"
                    onLeftIconButtonClick={this.handleToggle}
                    color="default"
                    >
                        <CurrentUserEmail />
                    </AppBar>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Header;

