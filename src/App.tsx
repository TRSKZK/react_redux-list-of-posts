import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { connect, ConnectedProps } from 'react-redux';
import { showPosts, loadPosts } from './app/store';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';
import { Post } from './react-app-env';
import AddPostForm from './components/AddPostForm';
import { Routes, Route } from 'react-router';
import PostDetailsPage from './components/PostDetailsPage';

const mapDispatch = {
  load: loadPosts,
};

const connector = connect(null, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({ load }) => {
  const posts = useSelector(showPosts);
  const [filterBy, setFilterBy] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null >(null);

  const filterPosts = useCallback((filterBy: string) => {
    setFilterBy(filterBy);
  },[]);

  const filterdPosts = posts.filter((post: Post) => {
    if (post.title.toLowerCase().includes(filterBy.toLowerCase())
      || post.body.toLowerCase().includes(filterBy.toLowerCase())) {
      return post;
    };
    return null;
  });

  const getDeailedPost = useCallback((postId: number) => {
    setSelectedPost(posts.filter((post: Post) => post.id === postId)[0]);
  },[posts]);

  useEffect(() => {
    load();

  }, [load, filterBy]);


  return (
    <Routes>
      <Route
        path="/"
        element={(
          <div className="App">
            {filterdPosts.length > 0
              ? (
                <PostList
                  posts={filterdPosts}
                  getPostId={getDeailedPost}
                />
              )
              : (<p>Post Not found</p>)
            }
            <FilterForm filterdPosts={filterPosts} />
            <AddPostForm />
          </div>
        )}
      />
      <Route
        path="/details"
        element={<PostDetailsPage post={selectedPost}/>}
      />
    </Routes>
  );
}

export default connector(App);
