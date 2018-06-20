import {
  LOAD_POSTS,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  SORT_POSTS
} from '../actions'

function posts (state = [], action){
  switch(action.type){
    case LOAD_POSTS:
      return action.posts
    case ADD_POST:
      const { post } = action
      return state.concat([post])
    case EDIT_POST:
      return state.map(p => p.id === action.post.id ? {...p, ...action.post} : p)
    case REMOVE_POST:
      return state.filter(p => p.id !== action.post.id)
    case SORT_POSTS:
      const { option } = action
      return state.slice().sort((p1, p2) => {
        if(p1[option] < p2[option])
          return -1
        if(p1[option] > p2[option])
          return 1
        return 0
      })
    default:
      return state
  }
}

export default posts