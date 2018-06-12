import {
  LOAD_POSTS,
  ADD_POST
} from '../actions'

function posts (state = [], action){
  switch(action.type){
    case LOAD_POSTS:
      return action.posts
    case ADD_POST:
      const { post } = action
      return state.concat([post])
    default:
      return state
  }
}

export default posts