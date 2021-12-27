import {
  Dispatch,
  applyMiddleware,
  AnyAction,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { Post } from "../react-app-env";
import { getPosts } from "../api/posts";

const LOAD_POSTS = 'load/posts';
const DELETE_POST = 'delete/post';

export const putPostsInStore = (posts: Post[]) => ({type: LOAD_POSTS, posts})

export const loadPosts = () => async (dispatch: Dispatch) => {
  try {
    const posts = await getPosts();

    if (posts) {
      posts.sort((post1: Post, post2: Post) => new Date(post2.createdAt).getTime()
        - new Date(post1.createdAt).getTime());

      dispatch(putPostsInStore(posts));
    }

  } catch(error) {
    console.error(error)
  }
};

export const deletePost = (postId: number) => ({type: DELETE_POST, postId});

export const showPosts = (state: RootState) => state.posts;

export type RootState = {
  posts: Post[],
};

const innitialState: RootState = {
  posts: [],
}

const postReducer = (state = innitialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.posts],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post: Post) => post.id !== action.postId)],
      };

    default:

    return state;
  };
};

const composedEnhencer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(postReducer, composedEnhencer);

export default store;
