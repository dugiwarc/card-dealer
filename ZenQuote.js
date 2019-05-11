import React, { Component } from "react";
import axios from "axios";
import "./ZenQuote.css";

export default class ZenQuote extends Component {
  constructor() {
    super();
    this.state = {
      quote: ""
    };
  }
  componentDidMount() {
    // Load data
    axios.get("https://api.github.com/zen").then(response => {
      console.log(response);
      setTimeout(() => {
        this.setState({
          quote: response.data
        });
      }, 3000);
    });
    // Store
  }
  render() {
    const logoLogic = this.state.quote ? "container hide" : "container";
    return (
      <div>
        <h1>Always remember</h1>
        {this.state.quote}
        <div className={logoLogic}>
          <div className="big" />
          <div className="medium" />
          <div className="small" />
        </div>
      </div>
    );
  }
}
