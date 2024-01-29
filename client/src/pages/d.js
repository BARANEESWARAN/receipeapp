import React, { useState, useEffect } from 'react';
import { useFetchPostsQuery } from './api';

function App() {
  const [userId, setUserId] = useState(1);

  const { data: posts, refetch } = useFetchPostsQuery(userId, {
    skip: !userId, // Skip the query if userId is falsy
    pollingInterval: shouldPoll ? 10000 : null,
    providesTags: ['Posts'],
  });

  // Manually refetch the data when the component mounts
  useEffect(() => {
    if (!userId) {
      // Optionally handle the case when userId is falsy
      return;
    }
    refetch();
  }, [userId]);

  return (
    <div>
      <h1>Post List</h1>
      <PostList posts={posts} />
      <button onClick={() => setUserId((prevUserId) => prevUserId + 1)}>Next User</button>
    </div>
  );
}

export default App;
