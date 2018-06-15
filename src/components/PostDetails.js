import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Post from './Post'

const styles = theme => ({
  comment: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class PostDetails extends Component {
	render(){
		
		const { post, handleOpenPostModal } = this.props
		debugger
		return (
			<div>
				<Post post={post} handleOpenPostModal={handleOpenPostModal}/>
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