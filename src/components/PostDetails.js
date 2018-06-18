import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from './Comment/CommentsList'
import Divider from '@material-ui/core/Divider'

class PostDetails extends Component {

	render(){

		const { post, handleOpenPostModal } = this.props

		return (
			<div>
				<Post post={post} handleOpenPostModal={handleOpenPostModal}/>
        <Divider />
        
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
)(PostDetails)