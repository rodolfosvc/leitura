import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { sortComments } from '../../actions'
import Comment from './Comment'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SortBy from '../SortBy'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

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
    showAddComment: false
  }

  showAddCommentElem = () => {
    this.setState({ showAddComment: true	})
  }

  hideAddCommentElem = () => {
    this.setState({showAddComment: false})
  }

  sortByCommentsFunc = (option) => {
    this.props.dispatch(sortComments(option))
  }

  render(){

    const { comments, classes, postParentId } = this.props
    const { showAddComment } = this.state

    return (
      <div className={classes.comment}>
        <AppBar position="static" className={classes.commentsBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
            Comments
            </Typography>
            <SortBy sortByFunc={this.sortByCommentsFunc}/>
            <Button color="inherit" onClick={this.showAddCommentElem}>Add comment</Button>
          </Toolbar>
        </AppBar>
        {showAddComment &&
    			<Comment
    			key='newComment'
    			initValue={{...defaultComment, parentId: postParentId}}
          afterSaveOrCancel={this.hideAddCommentElem}
    			isAdd={true}
    			/>}
        {comments && comments.map( comment =>
            <Comment
        			key={comment.id}
        			initValue={comment}
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

CommentsList.propTypes = {
	postParentId: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps
)(withStyles(styles)(CommentsList))