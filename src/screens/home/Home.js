import React, { Component } from "react";
import './Home.css';
import Header from "../../common/header/Header";

class Home extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    componentWillMount(){
    const url = this.props.baseUrl + "me/media?fields=id,caption&access_token="+this.props.accessToken
    }
    render(){
        const {classes} = this.props;
        return(
            <Header title="Image Viewer" />
            
        )
    }

}
export default Home;