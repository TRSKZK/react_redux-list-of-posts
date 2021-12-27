import React from 'react';
import { Post } from '../../react-app-env';
import './PostDetailsPage.scss';

interface Props {
  post: Post | null;
}

export const PostDetailsPage: React.FC<Props> = ({ post }) => {

  const capitalize = (text: string | undefined) => {
    return text ? text.slice(0, 1).toUpperCase() + text.slice(1) : 'no text provided';
  };

  return (
    <div className="post-details">
      <h1 className="post-details__title">
        {capitalize(post?.title)}
      </h1>
      <h2 className="post-details__body">
        {capitalize(post?.body)}
      </h2>
      <p className="post-details__date">
        {post?.createdAt}
      </p>
    </div>
  )
};
