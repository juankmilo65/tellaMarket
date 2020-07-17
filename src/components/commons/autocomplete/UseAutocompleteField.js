import React, { useState, useEffect } from 'react'
import "../../layout/navbar.scss";
import "./Autocomplete.css"
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import useAutocomplete from '../../../hooks/useAutocomplete'
import {
    InstantSearch,
    SearchBox,
    Hits,
    connectHighlight,
    connectSearchBox
} from "react-instantsearch-dom";

function UseAutocompleteField({ url, type }) {

    const [keyword, setKeyword] = useState('');
    const { suggestions, bind, renderSuggestion, renderSectionTitle, error } = useAutocomplete(url, type)


    // function getSuggestionValue(suggestion) {
    //     return `${suggestion.first} ${suggestion.last}`;
    // }

    function renderSuggestions() {

        if (suggestions.length === 0) {
            return null;
        };
        return (
            <ul>
                {suggestions.map(item => (
                    <li
                    //key={item.id}
                    //onClick={() => this.suggestionSelected(item.text, idInput)}
                    >
                        {/* {item.text} */}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        // <div className="input-search">
        //     <Autosuggest
        //         suggestions={suggestions}
        //         onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        //         onSuggestionsClearRequested={null}
        //         getSuggestionValue={getSuggestionValue}
        //         renderSuggestion={renderSuggestion}
        //         renderSectionTitle={renderSectionTitle}
        //         inputProps={bind} />
        // </div>
        <div className="AutocompleteText">
            <input
                id="autoComplete"
                type="text"
                {...bind}
            ></input>
            {/* {renderSuggestions} */}
        </div>
    )
}

export default UseAutocompleteField