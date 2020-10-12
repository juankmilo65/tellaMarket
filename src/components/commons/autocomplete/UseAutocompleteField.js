import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import "./Autocomplete.css"
import searchImg from '../../../images/search.png';
import Autosuggest from "react-autosuggest";
import { GET_CATALOGS_STANDAR_PREMIUM_PLAN } from "../../../graphQL/Autocomplete/autocompleteQueries";
import useAutocompleteIndex from '../../../hooks/useAutocomplete'

function UseAutocompleteField({ type }) {
    const query = type === 'autocompleteIndex' ? GET_CATALOGS_STANDAR_PREMIUM_PLAN : ""
    const lang = useSelector(state => state.navar.lang);
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [skipQuery, setSkipQuery] = useState(true);
    const { getSuggestions } = useAutocompleteIndex(type);
    const history = useHistory();
    useQuery(query,
        {
            variables: { "keyword": value, "lang": lang.value },
            skip: skipQuery,
            onCompleted: data => {
                setSuggestions(getSuggestions(data, type))
                setSkipQuery(true);
            },
        }
    );

    function getSuggestionValue(suggestion) {
        return suggestion.title;
    }

    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    function getSectionSuggestions(section) {
        return section.items;
    }

    function renderSuggestionsContainer({ containerProps, children, query }) {
        return (
            <div>
                <div {...containerProps}>
                    {<div className="footer">
                        Press Enter to search <strong>{query}</strong>
                    </div>
                    }
                    {children}
                </div>
            </div>
        );
    }

    function renderSectionTitle(section) {
        return (
            <strong>{section.title}</strong>
        );
    }

    function onKeyPress(e) {
        if (e.key === 'Enter') {
            history.push(`/query/${e.target.value}`)
        }
    }

    const renderInputComponent = inputProps => (
        <div className="inputContainer">
            <img alt="Search" className="icon" src={searchImg} />
            <input {...inputProps} />
        </div>
    );

    const bind = {
        placeholder: "Buscar",
        autoComplete: "off",
        value,
        onKeyPress: onKeyPress,
        onChange: e => {
            if (e.target.outerText !== "") {
                setValue(e.target.outerText)
            } else {
                const escapedValue = escapeRegexCharacters(e.target.value);
                if (escapedValue !== "") {
                    setSkipQuery(false)
                }
                setValue(escapedValue)
            }
        }
    }

    return (
        <div className="input-search">
            <Autosuggest
                multiSection={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={() => { }}
                onSuggestionsClearRequested={() => { }}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                renderSuggestionsContainer={renderSuggestionsContainer}
                renderInputComponent={renderInputComponent}
                inputProps={bind} />
        </div>
    )
}

export default UseAutocompleteField
