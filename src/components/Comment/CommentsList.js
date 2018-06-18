import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getPostComments } from '../../actions'
import Comment from './Comment'

const styles = theme => ({
  comment: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class CommentsList extends Component {

  componentDidMount() {
    const { loadComments, post } = this.props
    post && loadComments(post)
  }

  render(){

    const { comments, classes } = this.props

    return (
      <div className={classes.comment}>
        { comments && comments.map( comment =>
            <Comment key={comment.id} comment={comment}/>
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