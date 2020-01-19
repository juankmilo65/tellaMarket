import {
  setStatus,
  getPremiumHeaderImageSuccess,
  getPremiumHeaderImageError,
  getPromoDashboardSuccess,
  getPromoDashboardErros,
  GET_PREMIUM_HEADER_IMAGES,
  GET_PROMO_DASHBOARD
} from "../actions/dashboardActions";
import { concatMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../config/constants";

export default function dashboardEpics(action$) {
  return action$.pipe(
    ofType(GET_PREMIUM_HEADER_IMAGES, GET_PROMO_DASHBOARD),
    concatMap(action => {
      if (action.type === GET_PROMO_DASHBOARD) {
        return concat(
          of(setStatus("pending")),
          fetch(
            apiServices + "/getAllPromotionImages?tableName=" + action.payload,
            {
              mode: "cors",
              method: "GET",
              headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8"
              })
            }
          )
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return getPromoDashboardErros("Failed");
              }
            })
            .then(data => {
              return getPromoDashboardSuccess(data);
            })
        );
      } else if (action.type === GET_PREMIUM_HEADER_IMAGES) {
        return concat(
          of(setStatus("pending")),
          fetch(
            apiServices + "/getPremiumHeaderImages?tableName=" + action.payload,
            {
              mode: "cors",
              method: "GET",
              headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8"
              })
            }
          )
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return getPremiumHeaderImageError("Failed");
              }
            })
            .then(data => {
              return getPremiumHeaderImageSuccess(data);
            })
        );
      }
    })
  );
}
