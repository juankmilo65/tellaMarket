import {
  setStatus,
  getProductsByCategorySuccess,
  getProductsByPlanSuccess,
  getProductsByPlanError,
  GET_PRODUCTS_BY_PLAN,
  GET_PRODUCTS_BY_CATEGORY
} from "../actions/queryResultActions";

import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function queryResultEpics(action$) {
  return action$.pipe(
    ofType(GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_PLAN),
    switchMap(action => {
      if (action.type === GET_PRODUCTS_BY_CATEGORY) {
        let itemList = [];
        return concat(
          of(setStatus("pending"))
          //   getFS
          //     .collection("items")
          //     .where("subcategory.categorySelectedId", "==", action.payload)
          //     .get()
          //     .then(snapshot => {
          //       snapshot.forEach(doc => {
          //         var obj = {
          //           id: doc.id,
          //           data: doc.data()
          //         };
          //         itemList.push(obj);
          //       });
          //       return getProductsByCategorySuccess(itemList);
          //     })
        );
      } else if (action.type === GET_PRODUCTS_BY_PLAN) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/getItemdsByIdPlan?idsPlan=" + action.payload, {
            mode: "cors",
            method: "GET",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8"
            })
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return getProductsByPlanError("Failed");
              }
            })
            .then(data => {
              return getProductsByPlanSuccess(data);
            })
        );
      }
    })
  );
}
