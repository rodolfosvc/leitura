import React, { Component } from 'react'
import { fetchPosts, fetchCategories } from '../actions'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import CategoryMenu from './CategoryMenu'

class App extends Component {

  componentDidMount(){
    this.props.loadPosts()
    this.props.loadCategories()
  }

  render() {
    const { posts, categories } = this.props
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={4}>
              <CategoryMenu categories={categories}></CategoryMenu>
            </Col>
            <Col md={8}>
              <ul>
                {posts && posts.map(p => <li key={p.id}> {p.title} </li>)}
              </ul>
            </Col>
          </Row>
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
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)