import { createReducer, type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from 'app/createAppSlice';
import { deletePost, getComments, getPosts, getUsers } from 'utils/fetches';
import type { Post, PostsSliceState, User, Comment } from './postsTypes';

const initialState: PostsSliceState = {
  posts: [],
  users: [],
  comments: [],
  status: 'idle',
};

export const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers: (create) => ({
    toggleFavorites: create.reducer<number>(
      (state, action: PayloadAction<number>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload,
        );
        if (index !== -1)
          state.posts[index].isFavorite = !state.posts[index].isFavorite;
      },
    ),

    toggleIsChecked: create.reducer<number>(
      (state, action: PayloadAction<number>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload,
        );
        if (index !== -1)
          state.posts[index].isChecked = !state.posts[index].isChecked;
      },
    ),

    getPostsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Post[] = await getPosts();
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.posts = action.payload.map((post) => {
            return { ...post, isFavorite: false, isChecked: false };
          });
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),

    getCommentsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Comment[] = await getComments();
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.comments = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),

    getUsersAsync: create.asyncThunk(
      async (_: void) => {
        const response: User[] = await getUsers();
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),

    deletePostAsync: create.asyncThunk(
      async (postId: number) => {
        const response: {} = await deletePost(postId);
        return postId;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload,
          );
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),
  }),

  selectors: {
    selectPosts: (posts) => posts.posts,
    selectUsers: (posts) => posts.users,
    selectComments: (posts) => posts.comments,
    selectStatus: (posts) => posts.status,
  },
});

export const {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  deletePostAsync,
  toggleFavorites,
  toggleIsChecked,
} = postsSlice.actions;

export const { selectPosts, selectUsers, selectComments, selectStatus } =
  postsSlice.selectors;