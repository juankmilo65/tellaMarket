import {
  setStatus,
  getDashboardProductsPlanPremiumSuccess,
  getDashboardProductsPlanPlusSuccess,
  getDashboardProductsPlanBasicSuccess,
  GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM,
  GET_DASHBOARD_PRODUCTS_PLAN_PLUS,
  GET_DASHBOARD_PRODUCTS_PLAN_BASIC
} from "../actions/dashboardActions";

import { getFirestore } from "redux-firestore";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function dashboardEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(
      GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM,
      GET_DASHBOARD_PRODUCTS_PLAN_PLUS,
      GET_DASHBOARD_PRODUCTS_PLAN_BASIC
    ),
    switchMap(action => {
      if (action.type === GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .where("planId", "==", 1)
            .where("expirationDate", ">=", new Date())
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
              return getDashboardProductsPlanPremiumSuccess(itemList);
            })
        );
      } else if (action.type === GET_DASHBOARD_PRODUCTS_PLAN_PLUS) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .where("planId", "==", 1)
            .where("expirationDate", ">=", new Date())
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
              return getDashboardProductsPlanPlusSuccess(itemList);
            })
        );
      } else if (action.type === GET_DASHBOARD_PRODUCTS_PLAN_BASIC) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .where("planId", "==", 1)
            .where("expirationDate", ">=", new Date())
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
              return getDashboardProductsPlanBasicSuccess(itemList);
            })
        );
      }
    })
  );
}
