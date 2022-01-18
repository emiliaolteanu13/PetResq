import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Icon, Header, List, Container } from 'semantic-ui-react';
import { Post } from './model/post';
import NavBar from './navbar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedActivity] = 

  useEffect(() => {
    axios.get<Post[]>('http://localhost:5000/api/posts').then(response => {
      setPosts(response.data);
    })
  }, []) // add array of dependencies to stop the loop

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <PostDashboard posts={posts} />
      </Container>
    </>
  );
}

export default App;
