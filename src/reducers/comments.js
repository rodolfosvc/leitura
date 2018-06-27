import {
  LOAD_POST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  SORT_COMMENT
} from '../actions'
import CONST from '../utils/consts'

function comments (state = [], action){
    switch(action.type){
      case LOAD_POST_COMMENTS:
        return action.comments
      case ADD_COMMENT:
        const { comment } = action
        return state.concat([comment])
      case EDIT_COMMENT:
        return state.map(c => c.id === action.comment.id ? {...c, ...action.comment} : c)
      case DELETE_COMMENT:
        return state.filter(c => c.id !== action.comment.id)
      case SORT_COMMENT:
        return CONST.SORT_BY.FUNC(state, action.property, action.ascending)
      default:
        return state
    }
}

export default comments