import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, MenuItem, Drawer } from 'material-ui';
import { Link } from 'react-router-dom'

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
                <Drawer
                docked={false}
                width={270}
                open={this.state.open}
                onRequestChange={this.handleToggle}
                >
                    <Link to="/login_user" className="text_decoration_none"><MenuItem>ログイン</MenuItem></Link>
                    <Link to="/signup_user" className="text_decoration_none"><MenuItem>新規登録</MenuItem></Link>
                </Drawer>
                <AppBar
                title="家計簿アプリ"
                onLeftIconButtonClick={this.handleToggle}
                />
            </MuiThemeProvider>
        );
    }
}

export default Header;

