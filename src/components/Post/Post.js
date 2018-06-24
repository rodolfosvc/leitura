import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost, updatePostVoteScore } from '../../actions'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import VoteScore from '../Utils/VoteScore'
import { withRouter } from 'react-router-dom'

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  timeStamp: {
    marginBottom: 16,
    fontSize: 14
  }
}

class Post extends Component {

  handleRemove = post => {
    this.props.dispatch(deletePost(post))
        .then(() =>{
            if (!this.props.path){
                this.props.history.push('/home')
            }
        })
  }

  clickVoteScore = (option) => {
    const { post } = this.props
    this.props.dispatch(updatePostVoteScore(post, option))
  }

  render() {

    const { post, path, classes, handleOpenPostModal } = this.props
    const postDate = post ? new Date(post.timestamp) : null
    const formatDate = postDate ?  `${postDate.getDate()}/${postDate.getMonth() + 1/* Janeiro = 0 */}/${postDate.getFullYear()}` : null

    return (
      <div>
  		  {post && <Card key={post.id}>
    			<CardContent>
                  <Typography className={classes.timeStamp} color="textSecondary">
                    Creation time: {formatDate}
                  </Typography>
    			  <Typography gutterBottom variant="headline" component="h4">
    				  {post.title}
    			  </Typography>
    			  <Typography color="textSecondary">
    				  Author: {post.author}
    			  </Typography>
    			</CardContent>
    			<CardActions>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <VoteScore voteFunc={this.clickVoteScore} voteValue={post.voteScore}/>
                        </Grid>
                        <Grid item xs={6} className={classes.cardActions}>
            				{path &&
                                <Tooltip id="tooltip-detail" title="Details">
                					<IconButton
                					aria-owns={null}
                					aria-haspopup="false"
                                    aria-label="Details"
                					component={Link}
                					to={`/${path}/${post.id}`}
                					color="inherit"
                					>
                						<VisibilityIcon/>
                					</IconButton>
                                </Tooltip>}
                            <Tooltip id="tooltip-detail" title="Edit">
                                <IconButton
                                aria-owns={null}
                                aria-haspopup="false"
                                onClick={() => handleOpenPostModal(post)}
                                color="inherit"
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip id="tooltip-detail" title="Delete">
                                <IconButton
                                aria-owns={null}
                                aria-haspopup="false"
                                onClick={() => this.handleRemove(post)}
                                color="inherit"
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
    			</CardActions>
  		  </Card>}
      </div>
    )
  }
}

Post.propTypes = {
	path: PropTypes.string,
	post: PropTypes.object,
	handleOpenPostModal: PropTypes.func.isRequired
}

export default connect()(withRouter(withStyles(styles)(Post)))




