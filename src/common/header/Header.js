import React from 'react';
import { Component } from "react";
import './Header.css';
import userLogo from '../../assets/userlogo.jpeg';
import SearchIcon from '@material-ui/icons/Search';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
const styles = theme => ({
    appheader: {
        height: '65px',
        backgroundColor: '#263238',
        display: 'inline-flex',
        width: '100%',
        alignItems: 'center',
    },
    headerHomeRight: {
        position: 'relative',
        marginLeft: '63%',
        display: 'inline-flex',
        alignItems: 'center',
    },
    headerProfileRight: {
        position: 'relative',
        marginLeft: '85.2%',
        display: 'inline-flex',
        alignItems: 'center',
    },
    search: {
        display: 'inline-flex',
        backgroundColor: '#c0c0c0',
        width: "300px",
        borderRadius: "4px",
        alignItems: 'center',
        padding: '4px 10px',
    },
    searchIcon: {
        height: '100%',
        color: 'black',
    },
    searchInputHolder: {
        width: '100%',
    },
    profileHolder: {
        padding: '10px',
    },
    profileIconButton: {
        padding: '0px',
    },
    profileIcon: {
        width: '50px',
        borderRadius: '50%',
    },
    menuHolder: {
        marginTop: '45px',
        borderRadius: '4px',
        width: '100%',
        height: '100%',
        color: '#c0c0c0'
    }
})
class Header extends Component {
    //This is to Handle My Account Click
    myAccountClickHandler = () => {
        this.props.history.push("/profile");
    }
    //This is to Handle Logout
    logoutClickHandler = () => {
        sessionStorage.removeItem("access-token");
        this.props.history.push("/");
    }
    //This is Handle Menu Open
    openMenuHandler = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            isMenuOpen: true
        });
    }
    closeMenuHandler = (e) => {
        this.setState({
            isMenuOpen: false
        });
    }
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            isMenuOpen: false,
            headerMenudisplay: sessionStorage.getItem("access-token") == null ? "displayNone" : "displayBlock",
            anchorEl: null
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.appheader}>
                <div>
                    <span className="app-logo">{this.props.title}</span>
                </div>
                {this.props.showPageMenuItems === "home" && (

                    <div className={classes.headerHomeRight}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}><SearchIcon /></div>
                            <div className={classes.searchInputHolder}><Input disableUnderline={true} className="search-input" placeholder="Search…" onChange={(e) => { this.props.postSearchHandler(e.target.value) }} /></div>
                        </div>
                        <div className={classes.profileHolder}>
                            <IconButton className={classes.profileIconButton} onClick={this.openMenuHandler}>
                                <img className={classes.profileIcon} aria-controls="simpleMenu" src={userLogo} alt={"logo"} /></IconButton>
                            <Menu className={classes.menuHolder} open={this.state.isMenuOpen} onClose={this.closeMenuHandler} anchorEl={this.state.anchorEl} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}>
                                <MenuItem onClick={this.myAccountClickHandler}>My Account</MenuItem>
                                <hr className="menu-item-separator" />
                                <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                )}
                {this.props.showPageMenuItems === "profile" && (
                    <div className={classes.headerProfileRight}>
                        <div className={classes.profileHolder}>
                            <IconButton className={classes.profileIconButton} onClick={this.openMenuHandler}>
                                <img className={classes.profileIcon} aria-controls="simpleMenu" src={userLogo} alt={"logo"} /></IconButton>
                            <Menu className={classes.menuHolder} open={this.state.isMenuOpen} onClose={this.closeMenuHandler} anchorEl={this.state.anchorEl} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}>
                                <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}
export default withStyles(styles)(Header);