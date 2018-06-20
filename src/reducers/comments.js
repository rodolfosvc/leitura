import {
  LOAD_POST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  SORT_COMMENTS
} from '../actions'


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
      case SORT_COMMENTS:
        const { option } = action
        return state.slice().sort((c1, c2) => {
          if(c1[option] < c2[option])
            return -1
          if(c1[option] > c2[option])
            return 1
          return 0
        })
      default:
        return state
    }
}

export default comments