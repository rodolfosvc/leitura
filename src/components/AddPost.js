import React, { Component } from 'react'
import { connect } from 'react-redux'
import { savePost } from '../actions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import MaterialUISelect from './MaterialUISelect'

const deafultTitle = 'New Post'

class AddPost extends Component {

  state = {
    openDialog: false,
    post: {
      title: deafultTitle,
      body: '',
      author: '',
      categorie: ''
    }
  }

  handleClickOpen = event => {
    this.setState({ openDialog: true })
  }

  handleClose = () => {
    this.setState({ openDialog: false })
  }

  handleSave = () => {
    debugger
    const { post } = this.state
    this.props.savePost(post).then( () => {
      this.setState({ openDialog: false })
    })
  }

  handlePostPropChange = propName => event => {
    const { post } = this.state

    this.setState({
      post: {
        ...post,
        [propName]: event.target.value ? event.target.value : deafultTitle,
      }
    });
  }

  render() {

    const { openDialog, post } = this.state

    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>Add post</Button>
        <Dialog
          open={openDialog}
          onClose={this.handleClose}
          aria-labelledby="addPostDialog"
        >
          <DialogTitle id="addPostDialog">{post.title}</DialogTitle>
          <DialogContent>
            <MaterialUISelect post={post}></MaterialUISelect>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              onChange={this.handlePostPropChange('title')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="author"
              label="Author"
              type="text"
              onChange={this.handlePostPropChange('author')}
              fullWidth
            />
            <TextField
              id="content"
              label="Body"
              multiline
              rowsMax="4"
              onChange={this.handlePostPropChange('body')}
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps ({posts}) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    savePost: (post) => dispatch(savePost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)