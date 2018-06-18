import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class PostList extends Component {

  render() {

    const { posts, path, handleOpenPostModal} = this.props

    return (
      <div>
        {posts && posts.map(p => <Post key={p.id} handleOpenPostModal={handleOpenPostModal} path={path} post={p}></Post>)}
      </div>
    )
  }
}

function mapStateToProps ({posts}, ownProps) {
  return { posts: posts.filter(p => ownProps.path === "home" || p.category === ownProps.path)}
}

export default connect(mapStateToProps)(PostList)




