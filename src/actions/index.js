import * as ServerAPI from '../utils/ServerAPI'
import uuidv4 from 'uuid/v4'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'

export const updateCommentVoteScore = (comment, option) => dispatch => {
  debugger
  return ServerAPI
        .VoteComment(comment, option)
        .then(data => {
          dispatch(editComment(data))
        })
}

export const sortComments = (option) => ({
    type: SORT_COMMENTS,
    option
})

export const sortPosts = (option) => ({
    type: SORT_POSTS,
    option
})

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
})

export const updateComment = (comment) => dispatch => {
  return ServerAPI
        .updateComment(comment)
        .then( data => {
          dispatch(editComment(data))
        })
}

export const removeComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
})

export const deleteComment = (comment) => dispatch => {
  return ServerAPI
        .deleteComment(comment)
        .then( () => {
          dispatch(removeComment(comment))
        })
}

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const saveComment = (comment) => dispatch => {
  const newComment = {
    ...comment,
    id: uuidv4(),
    timestamp: Date.now()
  }
  return ServerAPI
        .createComment(newComment)
        .then( data => {
          dispatch(addComment(data))
        })
}

export const loadPostComments = (comments) => ({
  type: LOAD_POST_COMMENTS,
  comments
})

export const getPostComments = (postId) => dispatch => {
  return ServerAPI
        .getPostComments(postId)
        .then( (comments) => {
          dispatch(loadPostComments(comments))
        })
}

export const removePost = (post) => ({
  type: REMOVE_POST,
  post
})

export const deletePost = (post) => dispatch => {
  return ServerAPI
        .deletePost(post)
        .then( () => {
          dispatch(removePost(post))
        })
}

export const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const savePost = (post) => dispatch => {
  const newPost = {
    ...post,
    id: uuidv4(),
    timestamp: Date.now()
  }
  return ServerAPI
        .createPost(newPost)
        .then( data => {
          dispatch(addPost(data))
        })
}

export const editPost = (post) => ({
  type: EDIT_POST,
  post
})

export const updatePost = (post) => dispatch => {
  return ServerAPI
        .updatePost(post)
        .then( data => {
          dispatch(editPost(data))
        })
}

export const updatePostVoteScore = (post, option) => dispatch => {
  return ServerAPI
        .VotePost(post, option)
        .then(data => {
          dispatch(editPost(data))
        })
}

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  ServerAPI
      .getAllPosts()
      .then(posts => {
        dispatch(loadPosts(posts))
      })
)

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ServerAPI
      .getAllCategories()
      .then(categories => {
        dispatch(loadCategories(categories))
      })
);