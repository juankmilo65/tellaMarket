import { gql } from '@apollo/client';

export const GET_CATALOGS_STANDAR_PREMIUM_PLAN = gql`
  query getCatalogsStandardPremimItemPlan($keyword: String!) {
  getCatalogsStandardPremimItemPlan(keyword: $keyword) {
  __typename
     ... on Catalog
    {
      mysqlId
      name
      filteredItems
      {
        mysqlId
        name
      }
    }
    ... on Item
    {
      planId
      mysqlId
      name
    }
  }
}
`;