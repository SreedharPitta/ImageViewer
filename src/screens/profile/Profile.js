import React, {Component} from 'react';
import './Profile.css';
import Header from "../../common/header/Header";

class Profile extends Component{
    render(){
        return(
            <Header title="Image Viewer" showPageMenuItems="profile" history = {this.props.history} />
        )
    }
}
export default Profile;