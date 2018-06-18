import React, { Component } from 'react'
import { fetchCategories, fetchPosts, savePost, updatePost } from '../actions'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import CategoryMenu from './CategoryMenu'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SortBy from './SortBy'
import PostModal from './PostModal'
import PostList from './PostList'
import PostDetails from './PostDetails'

const styles = {
  appBar: {
    background: '#1D272F'
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
    this.props.loadCategories()
    this.props.loadPosts()
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
    const { categories, classes } = this.props
    return (
      <BrowserRouter>
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
              <Route exact path='/:category' render={({match})=> {
              return <PostList handleOpenPostModal={this.handleOpenPostModal} path={match.params.category} />
              }}/>
              <Route path='/:category/:postId' render={({match})=> {
              return <PostDetails handleOpenPostModal={this.handleOpenPostModal} postId={match.params.postId} />
              }}/>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadCategories: () => dispatch(fetchCategories()),
    savePost: (post) => dispatch(savePost(post)),
    updatePost: (post) => dispatch(updatePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))