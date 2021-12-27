import { Post, NewPost } from "../react-app-env";
const ALL_POST_URL = 'https://mate.academy/students-api/posts';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(ALL_POST_URL);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  const posts = await response.json();

  return posts;
};

export async function addNewPost(body: NewPost): Promise<Post> {
  const response = await fetch (ALL_POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  const newPost  = await response.json();

  return newPost;
}
