import * as ServerAPI from '../utils/ServerAPI'
import uuidv4 from 'uuid/v4'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'

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