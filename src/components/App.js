import React, { Component } from 'react'
import { fetchPosts, fetchCategories } from '../actions'
import { connect } from 'react-redux'
import { Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap'

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
              <ul>
                {categories && categories.map(c => <li key={c.name}> {c.name} </li>)}
              </ul>
            </Col>
            <Col md={8}>
              <ul>
                {posts && posts.map(p => <li key={p.id}> {p.title} </li>)}
              </ul>
              <Button onClick={() => {}} bsSize="xsmall"><Glyphicon glyph="info-sign"/> information </Button>

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