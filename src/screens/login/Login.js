import React, { Component } from "react";
import './Login.css';
import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
            usernamePasswordIncorrect: "displayNone",
            usernameRequired: "displayNone",
            passwordRequired: "displayNone",
            username: "",
            password: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    /* To Handel Input User Name Change */
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    };

    /* To Handle User Password Change */
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    };
    loginClickHandler = () => {
        let username = "sreedhar";
        let password = "sreedhar123";
        let accessToken = "IGQVJWZAUpiODFKREUwQk83WkUyam1qTXpsMG1ZAYmJzU3N1YXpELTd4YlN4S01GWkEwTmtXd2l3bktBRGZA4d2JuSUVwYlNqR0ZACblNLakwtTVp0a3o3YUJuMEthSGpmMEJ0djdabnk5NXBtOHRvYUFOUnRKMXdoX0RFUGdZA";

        //This will set display of earlier errors to none
        this.setState({ usernamePasswordIncorrect: "displayNone" });

        //This is to Check whether Username and Password
        this.state.username === "" ? this.setState({ usernameRequired: "displayBlock" }) : this.setState({ usernameRequired: "displayNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "displayBlock" }) : this.setState({ passwordRequired: "displayNone" });

        //To validate entered User Name and Password
        if (this.state.username === username && this.state.password === password) {
            window.sessionStorage.setItem(
                "access-token",
                accessToken
            );
            this.props.history.push('/home');
        } else {
            //In case both user name and password entered but are invalid
            if (this.state.username !== "" && this.state.password !== "") {
                this.setState({ usernamePasswordIncorrect: "displayBlock" });
            }
        }
    }

    render() {
        return (
            <div>
                <Header title="Image Viewer" history = {this.props.history} />
                <div className="login-card-container">
                    <Card variant="outlined" className="login-card">
                        <CardContent className="login-card-content">
                            <div className="login-title-holder">
                                <Typography variant="inherit" className="login-title">
                                    LOGIN
                                </Typography>
                            </div>
                            <FormControl className="input-form-control" required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}><span className="error">required</span></FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl className="input-form-control" required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}><span className="error">required</span></FormHelperText>
                                <br />
                                <FormHelperText className={this.state.usernamePasswordIncorrect}><span className="error">Incorrect username and/or password</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl className="input-form-button">
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
export default Login;