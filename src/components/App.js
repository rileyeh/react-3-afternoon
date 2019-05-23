import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

let baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    // axios.get(`${baseUrl}/posts`)
    // .then(response => {
    //   this.setState({
    //     posts: response.data
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  updatePost(id, text) {
    axios.put(`${baseUrl}/posts?id=${ id }`, {text})
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${ id }`)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
    }


  createPost(id, text) {
    axios.post(`${baseUrl}/posts`, {text}) 
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />

          {
            posts.map(post => (
              <Post key={ post.id }
                    text={ post.text }
                    date={ post.date } 
                    updatePostFn={ this.updatePost } 
                    id={ post.id }
                    deletePostFn={ this.deletePost }
                    />
          ))
        }
          
        </section>
      </div>
    );
  }
}

export default App;
