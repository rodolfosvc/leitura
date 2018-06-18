import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getPostComments } from '../../actions'
import Comment from './Comment'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SortBy from '../SortBy'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  comment: {
    paddingLeft: theme.spacing.unit * 4,
  },
  commentsBar: {
    background: '#1D272F',
  },
  sortBy: {
    float: 'right'
  }
})

const defaultComment = {
  id: '',
  body: '',
  author: ''
}

class CommentsList extends Component {
	
  state = {
	showAddComment: false,
    comment: defaultComment
  }
  
  handleAddComment = () => {
	debugger
	this.setState({
		showAddComment: true,
		comment: defaultComment
	})
  }

  handleSaveComment = () => {
	debugger
    const { comment } = this.state
	//dispatch action to add new comment
	this.setState({showAddComment: false})
  }

  handleCancelSaveComment = () => {
	debugger
	this.setState({showAddComment: false})
  }
  
  handleEdit = (comment) => {
	  this.setState({comment})
  }
  
  handleSaveEdition = (comment) => {
	  //dispatch action to update comment
  }
  
  handleCommentPropChange = propName => event => {
    const { comment } = this.state
    this.setState({
      comment: {
        ...comment,
        [propName]: event.target.value,
      }
    })
  }

  componentDidMount() {
    const { loadComments, post } = this.props
    post && loadComments(post)
  }

  render(){

    const { comments, classes } = this.props
	const { showAddComment, comment } = this.state

    return (
      <div className={classes.comment}>
		<AppBar position="static" className={classes.commentsBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Comments
            </Typography>
            <SortBy/>
            <Button color="inherit" onClick={this.handleAddComment}>Add comment</Button>
          </Toolbar>
        </AppBar>
        {showAddComment && 
			<Comment 
			key='newComment' 
			comment={comment}
			handleSave={this.handleSaveComment}
			handleCancel={this.handleCancelSaveComment}
			handleChange={this.handleCommentPropChange}
			isAdd={true}
			/>}
        { comments && comments.map( com =>
            <Comment 
			key={com.id} 
			comment={com}
			handleSaveChanges={this.handleSaveChanges}
			handleCancelUpdate={this.handleCancelUpdate}
			handleChange={this.handleCommentPropChange}
			isAdd={false}/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: (post) => dispatch(getPostComments(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentsList))