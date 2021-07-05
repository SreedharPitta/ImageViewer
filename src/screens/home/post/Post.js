import React, { Component } from 'react';
import './Post.css';
import userLogo from "../../../assets/userlogo.jpeg";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    postMedia: {
        height: 350,
        paddingTop: 0,
    },
    formControlHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    divider: {
        margin: '1px auto',
        height: '1px',
        backgroundColor: '#c0c0c0',
    },
    postLikeInfo : {
        padding: '0px',
        fontWeight : '600'
    },
    cardActionHolder: {
        padding : "8px 0px"
    }
})

const postStyle = {
    hashtagStyle: {
        display: "inline",
        padding: "2px 0px",
        fontSize: "14px",
        color: "#1c8dd0",
    },
    captionStyle: {
        marginTop: '8px',
        fontSize: "15px",
        fontWeight: "bold",
    },
    likedLikeStyle: {
        color: "red",
    }
};

const commentsStyle = {
    commentButtonStyle: {
        marginTop: "15px",
        marginLeft: "12px"
    },
};

class Post extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false,
            //This is random as no likes are coming in the API
            likesCount: Math.floor(Math.random() * 10) + 1,
            comments: [],
            comment: ""
        }
    }
    //Convert TimeStamp Into Given Date Format in the Problem
    convertTimeStampIntoUserDateFormat = (newDate) => {
        let date = new Date(newDate);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let hh = date.getHours();
        let MM = date.getMinutes();
        let ss = date.getSeconds();
        dd = dd < 10 ? "0" + dd : dd;
        mm = mm < 10 ? "0" + mm : mm;
        MM = MM < 10 ? "0" + MM : MM;
        ss = ss < 10 ? "0" + ss : ss;
        return (dd + "/" + mm + "/" + yyyy + " " + hh + ":" + MM + ":" + ss);
    }

    //User Comment Input
    userCommentChangeHandler = (e) => {
        this.setState({
            comment: e.target.value,
        });
    }

    //This is to add to the list of existing comments
    userCommentsAddHandler = () => {
        if (this.state.comment === '') {
            return
        }
        this.setState({
            comments: this.state.comments.concat(this.state.comment),
            comment: ''
        })
    }

    //Likes Handler to increase/decrease likes of a Post
    postLikeClickHandler = () => {
        if (this.state.isLiked) {
            this.setState({ isLiked: false });
        } else {
            this.setState({ isLiked: true });
        }
        if (!this.state.isLiked) {
            this.setState({ likesCount: this.state.likesCount + 1 })
        } else {
            this.setState({ likesCount: this.state.likesCount - 1 })
        }
    }

    render() {
        const { classes, postDetail, postIds } = this.props;
        let caption = '';
        //To populate the captions which are in API 1 Response
        postIds.forEach(post => {
            if (postDetail.id === post.id) {
                caption = post.caption;
            }
        });
        return (
            <div>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{ cursor: 'pointer' }} src={userLogo}></Avatar>
                        }
                        title={postDetail.username}
                        subheader={this.convertTimeStampIntoUserDateFormat(postDetail.timestamp)}
                    />
                    <CardContent>
                        <CardMedia
                            className={classes.postMedia}
                            image={postDetail.media_url}
                            alt={postDetail.username}
                        />
                        <br />
                        <Divider className={classes.divider} />
                        <Typography variant="h5" style={postStyle.captionStyle}>
                            {caption}
                        </Typography>
                        {/* This is hardcoded as no hashtags are being passed in API */}
                        <Typography display="inline" variant="caption" style={postStyle.hashtagStyle}>#Upgrad #Test #IgPost #React</Typography>
                        <CardActions disableSpacing className={classes.cardActionHolder}>
                            <IconButton aria-label="Add to favorites" onClick={this.postLikeClickHandler} className={classes.postLikeInfo}>
                                {this.state.isLiked && <FavoriteIconFill style={postStyle.likedLikeStyle} />}
                                {!this.state.isLiked && <FavoriteIconBorder />}
                            </IconButton>
                            <Typography>
                            <span className="likes-text">{this.state.likesCount} likes</span>
                            </Typography>
                        </CardActions>
                        {/* The the User Name is constant as only single user can comment */}
                        {this.state.comments.map((c, index) => (
                            <div key={index} className={classes.row}>
                                <Typography component="p" style={{ fontWeight: 'bold' }}>
                                    {postDetail.username}:
                                </Typography>
                                <Typography component="p" style={{ marginLeft: "3px" }}>
                                    {c}
                                </Typography>
                            </div>
                        ))}
                        <div className={classes.formControlHolder}>
                            <FormControl style={{ flexGrow: 1 }}>
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" value={this.state.comment} onChange={this.userCommentChangeHandler} />
                            </FormControl>
                            <FormControl className="addComment">
                                <Button className="addCommentBtn" variant="contained" color="primary" style={commentsStyle.commentButtonStyle} onClick={this.userCommentsAddHandler}>ADD</Button>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(Post);