import React, { Component } from 'react'
import { fetchPosts, fetchCategories, deletePost, savePost, updatePost } from '../actions'
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import SortBy from './SortBy'
import PostModal from './PostModal'

const styles = {
  appBar: {
    background: '#1D272F'
  },
  cardActions: {
	  display: 'flex',
	  justifyContent: 'flex-end'
  },
  sortBy: {
	  float: 'right'
  }
};

const defaultPostModal = {
  title: 'New Post',
  category: '',
  author: '',
  body: ''
}

class App extends Component {

  state = {
    openModalPost: false,
    postModal: defaultPostModal
  }

  componentDidMount(){
    this.props.loadPosts()
    this.props.loadCategories()
  }

  handleRemove = post => {
	  const { removePost } = this.props
	  removePost(post)
  }

  handleOpenPostModal = post => {
    if(post && post.id){
      this.setState({
        openModalPost: true,
        postModal: post
      })
    }else{
      this.setState({
        openModalPost: true,
        postModal: defaultPostModal
      })
    }
  }

  handleClosePostModal = () => {
    this.setState({
      openModalPost: false,
      postModal: defaultPostModal
    })
  }

  handleSavePostModal = () => {
    const { postModal } = this.state
    if(postModal && postModal.id){
      this.props.updatePost(postModal).then( () => {
        this.handleClosePostModal()
      })
    }else{
      this.props.savePost(postModal).then( () => {
        this.handleClosePostModal()
      })
    }
  }

  handlePostModalPropChange = propName => event => {
    const { postModal } = this.state
    this.setState({
      postModal: {
        ...postModal,
        [propName]: event.target.value,
      }
    })
  }

  render() {
    const { openModalPost, postModal } = this.state
    const { posts, categories, classes } = this.props
    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Udacity Leitura
            </Typography>
            <SortBy style={classes.sortBy}></SortBy>
            <Button color="inherit" onClick={this.handleOpenPostModal}>Add post</Button>
          </Toolbar>
        </AppBar>
        <PostModal
              open={openModalPost}
              post={postModal}
              handleClose={this.handleClosePostModal}
              handleSave={this.handleSavePostModal}
              handleChange={this.handlePostModalPropChange}
              >
            </PostModal>
        <Grid container spacing={0}>
          <Grid item xs={2} className={classes.navGrid}>
              <CategoryMenu categories={categories}></CategoryMenu>
          </Grid>
          <Grid item xs={10}>
            {posts && posts.map(p =>
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
            onClick={() => this.handleOpenPostModal(p)}
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps ({posts, categories }) {
  return { posts , categories }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadCategories: () => dispatch(fetchCategories()),
    removePost: (post) => dispatch(deletePost(post)),
    savePost: (post) => dispatch(savePost(post)),
    updatePost: (post) => dispatch(updatePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))