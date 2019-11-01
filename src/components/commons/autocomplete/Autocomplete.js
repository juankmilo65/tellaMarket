import React, { Component } from "react";
import "./Autocomplete.css";

import {
  InstantSearch,
  SearchBox,
  Hits,
  connectHighlight,
  connectSearchBox
} from "react-instantsearch-dom";

const Hit = ({ hit }) => (
  <p>
    <CustomHighlight attribute="subcategory.subcategoryName" hit={hit} />
  </p>
);

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit
  });

  return (
    <li
      key={hit.userId}
      onClick={() =>
        this.suggestionSelected(
          hit.productInformation.productName,
          hit.subcategory.categorySelectedId
        )
      }
    >
      {hit.productInformation.productName}
    </li>
  );
});

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  items = [
    { id: 1, text: "David" },
    { id: 2, text: "Daniel" },
    { id: 3, text: "Sara" },
    { id: 3, text: "Juan" }
  ];
  state = {
    suggestions: [],
    idInput: this.props.idInput
  };

  handleChange(event) {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v.text));
    }
    this.setState(() => ({ suggestions }));
    this.props.onChange(event);
  }

  suggestionSelected(value, idInput) {
    const valueSelected = {
      target: {
        value: value,
        id: idInput
      }
    };
    this.props.onChange(valueSelected);

    this.setState(() => ({
      suggestions: []
    }));
  }

  renderSuggestions() {
    // const { suggestions, idInput } = this.state;
    // if (suggestions.length === 0) {
    //   return null;
    // }

    // return (
    //   <ul>
    //     {suggestions.map(item => (
    //       <li
    //         key={item.id}
    //         onClick={() => this.suggestionSelected(item.text, idInput)}
    //       >
    //         {item.text}
    //       </li>
    //     ))}
    //   </ul>
    // );
    return <Hits hitComponent={Hit} />;
  }

  render() {
    const { idInput, value } = this.props;
    return (
      <div className="AutocompleteText">
        {/* <input
          id={idInput}
          onChange={this.handleChange}
          type="text"
          autoComplete="off"
          value={value}
          required
          placeholder="Buscar"
        ></input> */}
        <SearchBox />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Autocomplete;
