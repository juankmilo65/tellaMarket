import { gql } from '@apollo/client';

export const GET_CATALOGS_STANDAR_PREMIUM_PLAN = gql`
  query getCatalogsStandardPremiumItemPlanFiltered($keyword: String!, $lang: String!) {
  getCatalogsStandardPremiumItemPlanFiltered(keyword: $keyword, lang: $lang) {
  __typename
     ... on Catalog
    {
      mysqlId
      name
      filteredItems
      {
        planId
        mysqlId
        name
        image
      }
    }
    ... on Item
    {
      planId
      mysqlId
      name
      image
    }
  }
}
`;