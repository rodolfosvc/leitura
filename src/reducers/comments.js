import {
  LOAD_POST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT
} from '../actions'


function comments (state = [], action){
    switch(action.type){
      case LOAD_POST_COMMENTS:
        return action.comments
      case ADD_COMMENT:
        const { comment } = action
        return state.concat([comment])
      case EDIT_COMMENT:
        return state.filter(c => c.id !== action.comment.id).concat([action.comment])
      case DELETE_COMMENT:
        debugger
        return state.filter(c => c.id !== action.comment.id)
      default:
        return state
    }
}

export default comments