import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useLazyQuery } from '@apollo/client';
import { GET_CATALOGS_STANDAR_PREMIUM_PLAN } from "../graphQL/Autocomplete/autocompleteQueries";

function useAutocomplete(url, type) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('');
    const [result, setResult] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const lang = useSelector(state => state.navar.lang);
    const [getData, { loading, data }] = useLazyQuery(GET_CATALOGS_STANDAR_PREMIUM_PLAN);

    useEffect(() => {
        if (value !== '') doFetch();
    }, [value])


    function getSuggestions(data, type) {

        if (type === "indexAutocomplete") {
            return data.map(result => {
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
        value,
        onChange: e => {
            const escapedValue = escapeRegexCharacters(e.target.value.trim());
            setValue(escapedValue)
        }
    }

    const doFetch = () => {
        try {
            getData({ variables: { "keyword": value } })
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) return { suggestions, bind, renderSuggestion, renderSectionTitle, error };
    if (data) {
        setResult(getSuggestions(data, type));
    }

    return { suggestions, bind, renderSuggestion, renderSectionTitle, error }
}


export default useAutocomplete
