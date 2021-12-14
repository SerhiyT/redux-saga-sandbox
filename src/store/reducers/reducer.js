import { FILES_UPLOADING_PROGRESS, SAVE_USER_ALBUMS, SAVE_USER_POSTS, USER_POST_FETCH_SUCCEEDED } from '../actions';

const initialState = {
  posts: null,
  albums: null,
  filesUploadingProgress: 0,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_POST_FETCH_SUCCEEDED:
      const posts = action.payload.data;
      return {
        ...state,
        posts,
      };

    case SAVE_USER_ALBUMS: {
      const albums = action.payload.data;
      return {
        ...state,
        albums,
      };
    }

    case SAVE_USER_POSTS: {
      const posts = action.payload.data;
      return {
        ...state,
        posts,
      };
    }

    case FILES_UPLOADING_PROGRESS: {
      const filesUploadingProgress = action.payload.data;
      return {
        ...state,
        filesUploadingProgress,
      };
    }

    default:
      return state;
  }
};
