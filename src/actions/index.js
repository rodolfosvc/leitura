import * as ServerAPI from '../utils/ServerAPI';

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts
})

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories
})

export const fetchPosts = () => dispatch => (
  ServerAPI
      .getAllPosts()
      .then(posts => {
        dispatch(loadPosts(posts))
      })
);

export const fetchCategories = () => dispatch => (
  ServerAPI
      .getAllCategories()
      .then(categories => {
        dispatch(loadCategories(categories))
      })
);