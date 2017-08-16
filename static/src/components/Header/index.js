import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
        this.setState({
            open: false,
        });

    }


    handleClickOutside() {
        this.setState({
            open: false,
        });
    }


    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.setState({
            open: false,
        });
    }

    openNav() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <header>
                <LeftNav open={this.state.open}>
                    <div>
                        <MenuItem onClick={() => this.dispatchNewRoute('/')}>
                            Home
                        </MenuItem>
                        <Divider />
                    </div>
                    {
                        !this.props.isAuthenticated ?
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                                    Login
                                </MenuItem>
                                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                    Register
                                </MenuItem>
                            </div>
                            :
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/dashboard')}>
                                    Dashboard
                                </MenuItem>

                                <MenuItem onClick={(e) => this.logout(e)}>
                                    Logout
                                </MenuItem>
                            </div>
                    }
                </LeftNav>
                <AppBar
                  title="Menu"
                  onLeftIconButtonTouchTap={() => this.openNav()}
                  iconElementRight={
                    !this.props.isAuthenticated ?
                      <div>
                        <RaisedButton style={{ margin: 4}} label={<span style={{ color: 'rgb(0, 188, 212)' }}>Login</span>} onClick={() => this.dispatchNewRoute('/login')} />
                        <RaisedButton style={{ margin: 4}} label={<span style={{ color: 'rgb(0, 188, 212)' }}>Register</span>} onClick={() => this.dispatchNewRoute('/register')} />
                      </div>    
                      :
                      <RaisedButton style={{ margin: 4}} label={<span style={{ color: 'rgb(0, 188, 212)' }}>Logout</span>} onClick={(e) => this.logout(e)} />
                    }
                />
            </header>

        );
    }
}

Header.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};
