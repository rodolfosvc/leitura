import React, { Component } from 'react'
import { fetchPosts, fetchCategories } from '../actions'
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

class App extends Component {

  componentDidMount(){
    this.props.loadPosts()
    this.props.loadCategories()
  }

  render() {
    const { posts, categories } = this.props
    return (
        <Grid container spacing={0}>
          <Grid item xs={2}>
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
              </Card>)}
          </Grid>
        </Grid>
    );
  }
}

function mapStateToProps ({posts, categories }) {
  return { posts , categories }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)