import React, { Component,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions/posts";

export class Home extends Component {
  static displayName = Home.name;
  

  render () {
    const mystyle = {
      color: "white",
      backgroundColor: "#BEBEDB",
      marginTop: "0px",
      padding: "10em",
      display: "flex"
    }

    const linkStyle= {
      backgroundColor: "#4985F4",
      color:"#08032F",
      fontSize: "20px",
      padding: "3em",
      margin: "10%",
      borderRadius: "16px"
    }
    return (
      <div className='home' style={mystyle}>
      <Link to="/find" style={linkStyle}>Adopt an Animal</Link>
      <Link to="/create" style={linkStyle}>Make a post</Link>
      </div>
    );
  }
}
