import {
  LOAD_POSTS,
  ADD_POST,
  REMOVE_POST
} from '../actions'

function posts (state = [], action){
  switch(action.type){
    case LOAD_POSTS:
      return action.posts
    case ADD_POST:
      const { post } = action
      return state.concat([post])
	case REMOVE_POST:
	  return state.filter(p => p.id !== action.post.id)
    default:
      return state
  }
}

export default posts