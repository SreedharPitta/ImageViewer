import React, { Component } from "react";
import './Home.css';
import Header from "../../common/header/Header";
import { GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Post from "../home/post/Post";
const styles = theme => ({
    cardHolder: {
        margin: '2px auto',
    },
    gridHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '10px auto',
    },
    gridListHolder: {
        width: 1200,
        height: 'auto',
        overflowY: 'auto',
        justifyContent: 'flex-start',
        marginLeft: '10% !important',
    },
});

const gridListTileStyle = {
    width: "500px",
    margin: "10px",
};


class Home extends Component {
    constructor() {
        super();
        this.state = {
            userPostIds: [],
            userPostDetails: [],
            userPostIdsCopy: [],
            userPostDetailsCopy: []
        }
    }

    //API Call 1 to Fetch Post Ids
    componentWillMount() {
        if (sessionStorage.getItem('access-token') !== null) {
            let data = null;
            let xhr = new XMLHttpRequest();
            let thisRef = this;
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let responseData = JSON.parse(this.responseText).data;
                    thisRef.setState({
                        userPostIds: responseData,
                        userPostIdsCopy: responseData
                    });
                    thisRef.getUserPostsDetailedInfo();
                }
            });
            xhr.open("GET", this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem('access-token'));
            xhr.send(data)
        }
    }

    //This is to get all Posts Info
    getUserPostsDetailedInfo = () => {
        if (this.state.userPostIds !== undefined) {
            return this.state.userPostIds.map(post => {
                return this.getUserPostDetailedInfoById(post.id)
            });
        }
    }

    //API Call 2 to Fetch detailed Post Info
    getUserPostDetailedInfoById = (id) => {
        let thisRef = this
        let xhr = new XMLHttpRequest();
        let data = null
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let responseData = JSON.parse(this.responseText);
                thisRef.setState({
                    userPostDetails: thisRef.state.userPostDetails.concat(responseData),
                    userPostDetailsCopy: thisRef.state.userPostDetailsCopy.concat(responseData)
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem('access-token'))
        xhr.send(data)
    }
    //This will handle Post Search and display corresponding posts
    postSearchHandler = (searchKey) => {
        let postDetails = this.state.userPostDetailsCopy;
        if (searchKey === '') {
            postDetails = this.state.userPostDetailsCopy;
        } else {
            let userPosts = this.state.userPostIdsCopy;
            // for(var i = 0; i < userPosts.length; i++){
            //     console.log("Post Caption for id " + i + " is " + userPosts[i].id + " , " + userPosts[i].caption);
            // }
            let searchedPosts = []
            //Filter Post By Caption
            if (userPosts !== undefined && userPosts.length > 0) {
                userPosts = userPosts.filter((post) => {
                    if (post.caption !== undefined) {
                        let caption = post.caption.toLowerCase();
                        let enteredKey = searchKey.toLowerCase();
                        if (caption.includes(enteredKey)) {
                            searchedPosts.push(post.id);
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                })
            }
            this.setState({
                userPostIds: userPosts
            })
            postDetails = postDetails.filter(item => searchedPosts.includes(item.id));
        }
        this.setState({
            userPostDetails: postDetails
        })
    };
    render() {
        const { classes } = this.props;
        if (sessionStorage.getItem('access-token') === null) {
            this.props.history.push('/');
        }
        return (
            <div>
                <Header title="Image Viewer" showPageMenuItems="home" history={this.props.history} postSearchHandler={this.postSearchHandler} />
                <div className="cardHolder">
                    <br />
                    <div className={classes.gridHolder}>
                        <GridList cellHeight={'auto'} cols={2} className={classes.gridListHolder}>
                            {this.state.userPostDetails.map((item, index) => (
                                <GridListTile key={item.id} style={gridListTileStyle} cols={item.cols || 1}>
                                    <Post postDetail={item} postIds={this.state.userPostIds} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        )
    }

}
export default withStyles(styles)(Home);