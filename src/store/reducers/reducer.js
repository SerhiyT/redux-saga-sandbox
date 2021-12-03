import { SAVE_USER_ALBUMS, SAVE_USER_POSTS, USER_POST_FETCH_SUCCEEDED } from "../actions"


export const reducer = (state={
  posts: null,
}, 
action
) => {
  switch (action.type) {
    case USER_POST_FETCH_SUCCEEDED:
      const posts = action.payload.data
      return {
        ...state,
        posts
      }

      case SAVE_USER_ALBUMS: {
        const albums = action.payload.data
        return {
          ...state,
          albums,
        }
      }

      case SAVE_USER_POSTS: {
        const posts = action.payload.data
        return {
          ...state,
          posts,
        }
      }
  
    default:
      return state
  }
}