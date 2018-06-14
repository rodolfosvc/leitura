import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../actions'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class PostList extends Component {

  componentDidMount(){
    this.props.loadPosts()
  }

  handleRemove = post => {
    const { removePost } = this.props
    removePost(post)
  }

  render() {

    const { posts, path, classes, handleOpenPostModal} = this.props

    return (
      <div>
        {posts && posts.filter(p => {
            if (path === "home")
              return true
            return p.category === path
          } ).map(p =>
              <Card key={p.id}>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h4">
                    {p.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Author: {p.author}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <IconButton
                    aria-owns={null}
                    aria-haspopup="false"
                    onClick={() => handleOpenPostModal(p)}
                    color="inherit"
                  >
                    <EditIcon/>
                  </IconButton>
                  <IconButton
                    aria-owns={null}
                    aria-haspopup="false"
                    onClick={() => this.handleRemove(p)}
                    color="inherit"
                  >
                    <DeleteIcon/>
                  </IconButton>
                </CardActions>
              </Card>)}
        </div>
    )
  }
}

function mapStateToProps ({posts}) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    removePost: (post) => dispatch(deletePost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostList))




