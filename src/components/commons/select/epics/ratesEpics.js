import {
  UPDATE_RATES,
  GET_RATES,
  setStatus,
  updateRatesSuccess,
  getRatesSuccess
} from "../actions/ratesActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { getFirestore } from "redux-firestore";

export default function rateEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(UPDATE_RATES, GET_RATES),
    switchMap(action => {
      if (action.type === UPDATE_RATES) {
        return concat(
          of(setStatus("pending")),
          fetch(
            "https://openexchangerates.org/api/latest.json?app_id=5b627f48b2314f19b5971241dc8ac8f3"
          )
            .then(response => {
              return response.json();
            })
            .then(res => {
              return getFS
                .collection("currenciesUSDBase")
                .doc("gmX8vRZz944lqHEmJa53")
                .update(res.rates);
            })
            .then(() => updateRatesSuccess())
        );
      } else if (action.type === GET_RATES) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("currenciesUSDBase")
            .doc("gmX8vRZz944lqHEmJa53")
            .get()
            .then(snapshot => {
              return getRatesSuccess(snapshot.data());
            })
        );
      }
    })
  );
}
