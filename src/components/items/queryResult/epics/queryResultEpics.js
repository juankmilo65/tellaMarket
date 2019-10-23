import {
  setStatus,
  getProductsByCategorySuccess,
  GET_PRODUCTS_BY_CATEGORY
} from "../actions/queryResultActions";

import { getFirestore } from "redux-firestore";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function queryResultEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(GET_PRODUCTS_BY_CATEGORY),
    switchMap(action => {
      if (action.type === GET_PRODUCTS_BY_CATEGORY) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .where(
              "subcategory.categorySelectedId",
              "==",
              action.payload.idCategory
            )
            .get()
            .then(snapshot => {
              let itemList = [];
              snapshot.forEach(doc => {
                var obj = {
                  id: doc.id,
                  data: doc.data()
                };
                itemList.push(obj);
              });
              return getProductsByCategorySuccess(itemList);
            })
        );
      }
    })
  );
}
