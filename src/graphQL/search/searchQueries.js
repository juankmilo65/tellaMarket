import { gql } from '@apollo/client';

export const GET_SOUGHT_ITEMS = gql`
query getCatalogsStandardPremiumItemPlan($keyword: String!, $lang: String!) {
    getCatalogsStandardPremiumItemPlan(keyword: $keyword, lang: $lang) {
        mysqlId
        name
        filteredItems
        {
            mysqlId
            name
            planId
            image
            description
        }
    }
}
`;