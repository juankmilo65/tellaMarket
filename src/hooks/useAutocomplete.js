import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { GET_CATALOGS_STANDAR_PREMIUM_PLAN } from "../graphQL/Autocomplete/autocompleteQueries";

function useAutocomplete(url, type) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('');
    const [skipQuery, setSkipQuery] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const lang = useSelector(state => state.navar.lang);
    let { loading } = useQuery(GET_CATALOGS_STANDAR_PREMIUM_PLAN,
        {
            variables: { "keyword": value },
            skip: skipQuery,
            onCompleted: data => {
                setSuggestions(getSuggestions(data, type))
                setSkipQuery(true);
            },
        }
    );

    function getSuggestions(data, type) {

        if (type === "indexAutocomplete") {
            return data.getCatalogsStandardPremimItemPlan.map(result => {
                return {
                    catalog: result.__typename === 'Catalog' ? result.name : "",
                    items: result.__typename === 'Catalog' ? result.filteredItems : [],
                    item: result.__typename === 'Item' ? result.name : ""
                }
            })
        }

        return [];
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.catalog}</span>
        );
    }

    function renderSectionTitle(section) {
        return (
            <strong>{section.item}</strong>
        );
    }

    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const bind = {
        placeholder: "Buscar",
        autoComplete: "off",
        value,
        onChange: e => {
            const escapedValue = escapeRegexCharacters(e.target.value.trim());
            if (escapedValue !== "") {
                setValue(escapedValue)
                setSkipQuery(false)
            }
        }
    }

    if (loading) return { suggestions, bind, renderSuggestion, renderSectionTitle, error };

    return { suggestions, bind, renderSuggestion, renderSectionTitle, error }
}


export default useAutocomplete
