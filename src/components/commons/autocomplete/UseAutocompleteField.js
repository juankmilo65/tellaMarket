import React, { useState } from 'react'
import "../../layout/navbar.scss";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import useAutocomplete from '../../../hooks/useAutocomplete'

function UseAutocompleteField({ url, type }) {

    const [keyword, setKeyword] = useState('');
    const { suggestions, bind, renderSuggestion, renderSectionTitle, error } = useAutocomplete(url, type)

    function getSuggestionValue(suggestion) {
        return `${suggestion.first} ${suggestion.last}`;
    }



    return (
        <div className="input-search">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={null}
                onSuggestionsClearRequested={null}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                inputProps={bind} />
        </div>
    )
}

export default UseAutocompleteField
