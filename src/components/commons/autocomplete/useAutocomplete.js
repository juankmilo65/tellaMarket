import { useState, useEffect } from 'react'

const useAutocomplete = (url, keyword) => {
    const [error, setError] = useState('');
    const [data, setData] = useState('');

    const doFetch = async = () => {
        try {
            const response = await fetch(url + keyword);

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        doFetch();

        return () => {
            cleanup
        }
    }, [keyword])

    return {};
}


export default useAutocomplete