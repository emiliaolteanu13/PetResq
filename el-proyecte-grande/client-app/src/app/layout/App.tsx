import React, {useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './navbar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {postStore} = useStore();

  //local states
  const [posts, setPosts] = useState<Post[]>([]);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])

  
  function handleDeletePost(id: string) {
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    setPosts([...posts.filter(x => x.id !== id)])
  }

  if (postStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <PostDashboard 
          posts={postStore.posts}
          deletePost={handleDeletePost}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer (App);
