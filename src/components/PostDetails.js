import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from './Comment/CommentsList'
import Divider from '@material-ui/core/Divider'
import SortBy from './SortBy'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Comment from './Comment/Comment'

const styles = theme => ({
  commentsBar: {
    background: '#1D272F',
  },
  sortBy: {
    float: 'right'
  }
})

class PostDetails extends Component {

  state = {
    addComment: false,
    newComment: {
      id: '',
      body: '',
      author: ''
    }
  }

  handleAddComment = () => {
    this.setState({addComment: true})
  }

	render(){

		const { post, handleOpenPostModal, classes } = this.props
    const { addComment, newComment } = this.state

		return (
			<div>
				<Post post={post} handleOpenPostModal={handleOpenPostModal}/>
        <Divider />
        <AppBar position="static" className={classes.commentsBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Comments
            </Typography>
            <SortBy/>
            <Button color="inherit" onClick={this.handleAddComment}>Add comment</Button>
          </Toolbar>
        </AppBar>
        {addComment && <Comment key='newComment' comment={newComment}/>}
        <CommentsList post={post}/>
			</div>
		)
	}
}

function mapStateToProps ({ posts }, ownProps) {
  return { post: posts.find(p => p.id === ownProps.postId) }
}

export default connect(
  mapStateToProps
)(withStyles(styles)(PostDetails))