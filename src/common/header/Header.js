import React from 'react';
import { Component} from "react";
import './Header.css';

class Header extends Component{
    render(){
        return(
            <div className="app-header">
               <span className="app-logo">{this.props.title}</span>
            </div>
        )
    }
}
export default Header;