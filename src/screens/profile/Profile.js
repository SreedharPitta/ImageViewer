import React, { Component } from 'react';
import './Profile.css';
import userLogo from "../../assets/userlogo.jpeg";
import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { auto } from 'async';

const styles = {
    userNameInfo: {
        fontSize: '28px',
        padding: '5px 0px'
    },
    profileStatsSection: {
        padding: '5px 0px',
        display: 'inline-flex',
        alignContent: 'center',
        alignItems: 'center',

    },
    profileStatDetail: {
        width: '180px',
        fontSize: '20px',
        fontWeight: 500
    },
    fullNameHolder: {
        fontSize: '25px',
        fontWeight: 500,
        padding: '5px 0px',
    },
    editFullNameHolder: {
        boxShadow: "2px 2px #f2f2f1",
        padding: "25px",
        position: 'relative',
        width: "200px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
    },
    buttonControl: {
        marginTop: '20px',
    },
    postsDisplayHolder : {
        margin : '10px auto',
    },
    postsGridListHolder : {
        margin : '0px auto !important',
        padding : '40px 100px',
    },
    postMedia: {
        height: '350px',
        cursor: 'pointer'
    },
    openedImageObjModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openedImageObjContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: '70%',
        height: '70%'
    },
    openedImageObjContainerRow1: {
        width: '50%',
        padding: 10
    },
    openedImageObjContainerRow2: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        padding: 10
    },
    openedImageObjContainerRow21: {
        borderBottom: '2px solid #c0c0c0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    openedImageObjContainerRow22: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            userPostIds: [],
            userPostDetails: [],
            isLiked: false,
            username: "sreedhar",
            fullName: "Sreedhar Pitta",
            likesCount: Math.floor(Math.random() * 10) + 1,
            followingCount: Math.floor(Math.random() * 100) + 1,
            followersCount: Math.floor(Math.random() * 50) + 1,
            updatedFullName: '',
            isFullNameEditModalOpen: false,
            fullNameRequired: 'displayNone',
            isPostInfoModalOpen: false,
            viewedPostId: null,
            viewedPostDetail: null,
            userComments: {},
            comment: '',
        }
    }

    //This is to Open Modal to Open Full Name
    openUserFullNameEditModalHandler = () => {
        this.setState({
            isFullNameEditModalOpen: true,
            updatedFullName: "",
            fullNameRequired: 'displayNone'
        });
    }

    //Close Full Name Edit Modal
    closeFullNameEditModalHandler = () => {
        this.setState({
            isFullNameEditModalOpen: false,
            fullNameRequired: 'displayNone'
        });
    }

    //This is called on Change in Full name
    changeFullNameHandler = (e) => {
        this.setState({
            updatedFullName: e.target.value
        })
    }

    //To update the Full No entered by User
    updateFullNameHandler = () => {
        if (this.state.updatedFullName === '') {
            this.setState({ fullNameRequired: 'displayBlock' });
        } else {
            this.setState({ fullNameRequired: 'displayNone' });
        }
        if (this.state.updatedFullName === '') { return }
        this.setState({
            fullName: this.state.updatedFullName
        })
        this.closeFullNameEditModalHandler()
    }

    //API Call 1 to Fetch Post Ids
    UNSAFE_componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let thisRef = this;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let responseData = JSON.parse(this.responseText).data;
                thisRef.setState({
                    userPostIds: responseData
                });
                thisRef.getUserPostsDetailedInfo();
            }
        });
        xhr.open("GET", this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem('access-token'));
        xhr.send(data)
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
                    userPostDetails: thisRef.state.userPostDetails.concat(responseData)
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem('access-token'))
        xhr.send(data)
    }

    //This is for Opening Post Modal on Clicking on it
    postInfoOpenModalHandler = (e) => {
        console.log("Called Post Modal Event");
        var userPostId = this.state.userPostIds.find(item => {
            return item.id === e.target.id
        })
        console.log("Opened Post Id:" + userPostId)
        var postDetails = this.state.userPostDetails.find(item => {
            return item.id === e.target.id
        })
        console.log("Opened Post Detail" + postDetails)
        this.setState({ isPostInfoModalOpen: true, viewedPostId: userPostId, viewedPostDetail: postDetails });
    }

    //For Closing the Modal which has been opened
    closePostModalHandler = () => {
        this.setState({ isPostInfoModalOpen: false });
    }

    postLikeClickHandler = (id) => {
        if (!this.state.isLiked) {
            this.setState({
                likesCount: this.state.likesCount + 1
            })
        } else {
            this.setState({
                likesCount: this.state.likesCount - 1
            })
        }
        if (this.state.isLiked) {
            this.setState({
                isLiked: false
            });
        } else {
            this.setState({
                isLiked: true
            });
        }
    }

    //To add Comments for a Specific Post
    addUserCommentHandler = (id) => {
        console.log('id', id);
        if (this.state.postComment === "" || typeof this.state.postComment === undefined) {
            return;
        }

        let commentList = this.state.userComments.hasOwnProperty(id) ?
            this.state.userComments[id].concat(this.state.postComment) : [].concat(this.state.postComment);

        this.setState({
            userComments: {
                ...this.state.userComments,
                [id]: commentList
            },
            postComment: ''
        })
    }


    commentChangeHandler = (e) => {
        this.setState({
            postComment: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        let likeCount = this.state.likesCount;
        return (
            <div>
                <Header title="Image Viewer" showPageMenuItems="profile" history={this.props.history} />
                <div className="profile-content-holder">
                    <div className="user-profile-holder">
                        <Avatar className="user-profile-img-holder"
                            alt="User Img"
                            style={{ cursor: 'pointer' }}
                            src={userLogo}
                        />
                    </div>
                    <div className="profile-extra-info-holder">
                        <div className={classes.userNameInfo}> {this.state.userPostDetails !== undefined && this.state.userPostDetails.length > 0 ? this.state.userPostDetails[0].username : this.state.username}</div>
                        <div className={classes.profileStatsSection}>
                            <span className={classes.profileStatDetail}> Posts: {this.state.userPostDetails.length} </span>
                            <span className={classes.profileStatDetail}> Follows:  {this.state.followingCount}</span>
                            <span className={classes.profileStatDetail}> Followed By: {this.state.followersCount} </span>
                        </div>
                        <div className={classes.fullNameHolder}> {this.state.fullName}
                            <Fab variant="round" color="secondary" aria-label="Edit" style={{ marginLeft: "25px", width: '50px', height: '50px' }} onClick={this.openUserFullNameEditModalHandler}>
                                <EditIcon />
                            </Fab>
                        </div>
                        <Modal
                            aria-labelledby="full-name-edit-modal"
                            open={this.state.isFullNameEditModalOpen}
                            onClose={this.closeFullNameEditModalHandler}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <div style={styles.editFullNameHolder}>
                                <Typography variant="h4" id="modalTitle">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                                    <Input id="fullName" onChange={this.changeFullNameHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="error">required</span></FormHelperText>
                                </FormControl><br /><br />
                                <FormControl className={classes.buttonControl}>
                                    <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>
                                        UPDATE
                                    </Button>
                                </FormControl>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={classes.postsDisplayHolder}>
                    {this.state.userPostDetails != null &&
                        <GridList className={classes.postsGridListHolder} cellHeight={'auto'} cols={3}>
                            {this.state.userPostDetails.map(item => (
                                <GridListTile key={item.id}>
                                    <CardMedia
                                        id={item.id}
                                        style={styles.postMedia}
                                        image={item.media_url}
                                        title="Ig Post"
                                        onClick={this.postInfoOpenModalHandler}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>}
                </div>
                {this.state.viewedPostId != null &&
                    <Modal
                        aria-labelledby="post-info-modal"
                        aria-describedby="Post Information Modal"
                        open={this.state.isPostInfoModalOpen}
                        onClose={this.closePostModalHandler}
                        className={classes.openedImageObjModal}>
                        <div className={classes.openedImageObjContainer}>
                            <div className={classes.openedImageObjContainerRow1}>
                                <img style={{ cursor: 'pointer', height: '100%', width: '100%' }}
                                    src={this.state.viewedPostDetail.media_url}
                                    alt={this.state.viewedPostId.caption} />
                            </div>
                            <div className={classes.openedImageObjContainerRow2}>
                                <div className={classes.openedImageObjContainerRow21}>
                                    <Avatar
                                        alt="User Image"
                                        src={userLogo}
                                        style={{ cursor: 'pointer', width: "50px", height: "50px", margin: '10px' }} />
                                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                                        {this.state.user}
                                    </Typography>
                                </div>
                                <div className={classes.openedImageObjContainerRow22}>
                                    <div>
                                        <Typography component="p" style={{ fontWeight: 'bold', marginLeft: '5px', paddingTop: '8px' }}>
                                            {this.state.viewedPostId.caption}
                                        </Typography>
                                        <Typography style={{ color: '#4dabf5', marginLeft: '5px' }} component="p" >
                                            #Coding #Skills #Passion
                                        </Typography>
                                        {this.state.userComments.hasOwnProperty(this.state.viewedPostId.id) && this.state.userComments[this.state.viewedPostId.id].map((comment, index) => {
                                            return (
                                                <div key={index} className="row" style={{ paddingTop: '12px' }}>
                                                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                                                        {this.state.user}:
                                                    </Typography>
                                                    <Typography component="p" style={{ marginLeft: '6px', fontWeight: 'bold' }}>
                                                        {comment}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <div className="row">
                                            <IconButton aria-label="Add to favorites" onClick={this.postLikeClickHandler.bind(this, this.state.viewedPostId.id)}>
                                                {this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
                                                {!this.state.isLiked && <FavoriteIconBorder />}
                                            </IconButton>
                                            <Typography component="p" style={{ fontWeight: 'bold' }}>
                                                {likeCount} likes
                                            </Typography>
                                        </div>
                                        <div className="row">
                                            <FormControl style={{ flexGrow: 1 }}>
                                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                                <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler} />
                                            </FormControl>
                                            <FormControl>
                                                <Button onClick={this.addUserCommentHandler.bind(this, this.state.viewedPostId.id)}
                                                    variant="contained" color="primary">
                                                    ADD
                                                </Button>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>}
            </div>
        )
    }
}

export default withStyles(styles)(Profile);