import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
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

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class Post extends Component {

  handleRemove = post => {
    this.props.dispatch(deletePost(post))
  }

  render() {

    const { post, path, classes, handleOpenPostModal} = this.props

    return (
      <div>
		  <Card key={post.id}>
			<CardContent>
			  <Typography gutterBottom variant="headline" component="h4">
				{post.title}
			  </Typography>
			  <Typography color="textSecondary">
				Author: {post.author}
			  </Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				{path && 
					<IconButton
					aria-owns={null}
					aria-haspopup="false"
					component={Link} 
					to={`/${path}/${post.id}`}
					color="inherit"
					>
						<VisibilityIcon/>
					</IconButton>}
			  <IconButton
				aria-owns={null}
				aria-haspopup="false"
				onClick={() => handleOpenPostModal(post)}
				color="inherit"
			  >
				<EditIcon/>
			  </IconButton>
			  <IconButton
				aria-owns={null}
				aria-haspopup="false"
				onClick={() => this.handleRemove(post)}
				color="inherit"
			  >
				<DeleteIcon/>
			  </IconButton>
			</CardActions>
		  </Card>
        </div>
    )
  }
}

export default connect()(withStyles(styles)(Post))




