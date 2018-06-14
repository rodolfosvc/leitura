import * as ServerAPI from '../utils/ServerAPI'
import uuidv4 from 'uuid/v4'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'

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