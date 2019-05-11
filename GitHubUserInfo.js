import React, { Component } from "react";
import axios from "axios";

export default class GitHubUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      name: ""
    };
  }
  async componentDidMount() {
    const url = `https://api.github.com/users/${this.props.username}`;
    let response = await axios.get(url);
    let data = response.data;
    console.log(data);
    this.setState({ imgUrl: data.avatar_url, name: data.name });
  }
  render() {
    return (
      <div>
        <h1>{this.props.username}</h1>
        <img src={this.state.imgUrl} alt="Profile" />
      </div>
    );
  }
}
