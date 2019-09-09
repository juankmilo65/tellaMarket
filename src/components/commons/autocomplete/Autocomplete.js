import React, { Component } from "react";
import "./Autocomplete.css";

class Autocomplete extends Component {
  items = ["David", "Daniel", "Sara", "Juan"];
  state = {
    suggestions: [],
    text: ""
  };

  setStore(e, catalogoName) {
    // if (this.propertiesEn.length > 0 && e.target.id.includes("en")) {
    //   Object.values(this.propertiesEn).map(property => {
    //     Object.keys(property).map(prop => {
    //       property[e.target.id] = e.target.value;
    //     });
    //   });
    // } else if (e.target.id.includes("en")) {
    //   this.propertiesEn.push({ [e.target.id]: e.target.value });
    // }
    // this.setState({
    //   [catalogoName]: this.propertiesEn
    // });
  }

  handleChange = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ text: value, suggestions }));

    // if (e.target.id.includes("en")) {
    //   this.setStore(e, "catalogoEn");
    // } else if (e.target.id.includes("es")) {
    //   this.setStore(e, "catalogoEs");
    // } else if (e.target.id.includes("pt")) {
    //   this.setStore(e, "catalogoPt");
    // }
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestions.map(item => (
          <li onClick={() => this.suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  render() {
    const { idInput } = this.props;
    const { text } = this.state;
    return (
      <div className="AutocompleteText">
        <input
          id={idInput}
          onChange={this.handleChange}
          type="text"
          autocomplete="off"
          value={text}
        ></input>
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Autocomplete;
