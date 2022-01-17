import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { ListFormat } from 'typescript';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then(response => {
      console.log(response);
      setPosts(response.data);
    })
  }, []) // add array of dependencies to stop the loop

  return (
    <div className="App">
      <header>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <List>
        {posts.map((post:any) => (
            <List.Item key={post.id}>
              {post.title}
            </List.Item>
          ))}
        </List>
      </header>
    </div>
  );
}

export default App;
