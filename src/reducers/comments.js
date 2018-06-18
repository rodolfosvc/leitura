import {
  LOAD_POST_COMMENTS
} from '../actions'


function comments (state = [], action){
    switch(action.type){
      case LOAD_POST_COMMENTS:
        return action.comments
      default:
        return state
    }
}

export default comments