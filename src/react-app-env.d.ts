/// <reference types="react-scripts" />

import { PostAdd } from "@mui/icons-material";

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
};

export type NewPost = Pick<Post, 'title', 'body'>; 
