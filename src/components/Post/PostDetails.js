import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from '../Comment/CommentsList'
import Divider from '@material-ui/core/Divider'
import { getPostComments } from '../../actions'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

class PostDetails extends Component {

  componentDidMount() {
    const { loadComments, postId } = this.props
    loadComments(postId)
  }

	render(){

		const { post, handleOpenPostModal, postId } = this.props

		return (
        <div>
          { post &&
            <div>
        			<Post post={post} handleOpenPostModal={handleOpenPostModal}/>
              <Divider />
              <CommentsList postParentId={postId}/>
            </div>
          }
          { !post &&
            <Typography variant="headline" component="h2" align="center" >
              Either this post does not exist or it was deleted!
            </Typography> }
        </div>
		)
	}
}

function mapStateToProps ({ posts }, ownProps) {
  return { post: posts.find(p => p.id === ownProps.postId) }
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: (postId) => dispatch(getPostComments(postId)),
  }
}

PostDetails.propTypes = {
	postId: PropTypes.string.isRequired,
	handleOpenPostModal: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)