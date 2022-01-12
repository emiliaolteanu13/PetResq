import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className='home'>
      <Link to="/find">Adopt an Animal</Link>
      <Link to="/create">Make a post</Link>
      </div>
    );
  }
}
