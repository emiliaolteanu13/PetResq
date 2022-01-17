import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Icon, Header, List } from 'semantic-ui-react';


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then(response => {
      console.log(response);
      setPosts(response.data);
    })
  }, []) // add array of dependencies to stop the loop

  return (
    <div>
      <Header as='h2' icon='users' content='Posts' />
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <List>
        {posts.map((post:any) => (
            <List.Item key={post.id}>
              {post.title}
            </List.Item>
          ))}
        </List>
      
    </div>
  );
}

export default App;
