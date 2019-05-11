import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardURL = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardURL);
      if (!cardRes.data.success) {
        throw new Error("No cards left");
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map(card => (
      <Card key={card.id} name={card.name} image={card.image} />
    ));
    return (
      <div className="Deck">
        <div>
          <h1 className="Deck-title">Card Dealer</h1>
          <h2 className="Deck-title subtitle">A little demo made with react</h2>
        </div>
        <div className="Deck-cardArea">{cards}</div>
        <div>
          <button className="Deck-btn" onClick={this.getCard}>
            Get Card!
          </button>
        </div>
      </div>
    );
  }
}
