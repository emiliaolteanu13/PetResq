import React, { Component,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions/posts";

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
