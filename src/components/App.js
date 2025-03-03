import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      searchText: "",
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((res) => {
        this.setState({ posts: res.data });
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((error) => console.log(error));
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((error) => console.log(error));
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((error) => console.log(error));
  }

  setSearchText(text) {
    this.setState({ searchText: text });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header setSearchText={this.setSearchText} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts
            .filter((post) => {
              if (this.state.searchText === "") {
                return post;
              } else if (
                post.text
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post) => {
              return (
                <Post
                  key={post.id}
                  text={post.text}
                  date={post.date}
                  id={post.id}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                />
              );
            })}
        </section>
      </div>
    );
  }
}

export default App;
