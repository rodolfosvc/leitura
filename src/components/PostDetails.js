import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from './Comment/CommentsList'
import Divider from '@material-ui/core/Divider'
import { getPostComments } from '../actions'


class PostDetails extends Component {

  componentDidMount() {
    const { loadComments, postId } = this.props
    loadComments(postId)
  }

	render(){

		const { post, handleOpenPostModal, postId } = this.props

		return (
			<div>
				<Post post={post} handleOpenPostModal={handleOpenPostModal}/>
        <Divider />
        <CommentsList postParentId={postId}/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)