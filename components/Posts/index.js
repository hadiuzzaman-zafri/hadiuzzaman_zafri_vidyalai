import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';

import { useWindowWidthContext } from '../hooks/windowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if there are more posts to load
  const [start, setStart] = useState(0); // Track the start index for pagination
  const limit = 10; // Number of posts to load per page

  const { isSmallerDevice } = useWindowWidthContext();

  useEffect(() => {
    fetchPosts();
  }, [isSmallerDevice]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data: newPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });

      if (newPosts.length > 0) {
        setPosts([...posts, ...newPosts]); // Append new posts to the existing ones
        setStart(start + limit); // Increment start for the next fetch
      } else {
        setHasMorePosts(false); // No more posts to load
      }
    } catch (error) {
      console.error('Error in fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Control the Load More Button
  const handleClick = () => {
    if (!isLoading && hasMorePosts) {
      fetchPosts();
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMorePosts && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
