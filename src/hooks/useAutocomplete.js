function useAutocompleteIndex(type) {
    function getSuggestions(data) {
        if (type === "autocompleteIndex") {
            var listItems = [];
            var response = data.getCatalogsStandardPremiumItemPlanFiltered.map(result => {

                if (result.__typename === 'Item') {
                    listItems.push(result)
                }

                return {
                    title: result.__typename === 'Catalog' ? result.name : "",
                    items: result.__typename === 'Catalog' ? result.filteredItems : []
                }
            }).filter(section => section.items.length > 0);

            response.push({
                title: "",
                items: listItems
            })
            return response;
        }
        return [];
    }

    return { getSuggestions }
}

export default useAutocompleteIndex
