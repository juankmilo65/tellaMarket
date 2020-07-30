import { gql } from '@apollo/client';

export const GET_SOUGHT_ITEMS = gql`
query getItemsPaginationAndFIltered($keyword: String!, $lang: String!, $order: String!, $pageNumber:Int!, $nPerPage:Int!) {
  getItemsPaginationAndFIltered(keyword: $keyword,lang: $lang, order:$order, pageNumber: $pageNumber, nPerPage:$nPerPage ) {
    items  { 
    mysqlId
      name
      planId
      image
      description
      price
    }  
    pageInfo{
      count 
    }
    itemsIds{
      _id
    }
    catalogsItems{
     _id
    {
      mysqlId,
      name
    }
    items
    }
    }
}
`;