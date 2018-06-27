import {
  LOAD_POSTS,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  SORT_POST
} from '../actions'
import CONST from '../utils/consts'

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
    case SORT_POST:
      return CONST.SORT_BY.FUNC(state, action.property, action.ascending)
    default:
      return state
  }
}

export default posts