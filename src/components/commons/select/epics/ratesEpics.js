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

export default function rateEpics(action$) {
  return action$.pipe(
    ofType(UPDATE_RATES, GET_RATES),
    switchMap(action => {
      if (action.type === UPDATE_RATES) {
        return concat(
          of(setStatus("pending"))
          // fetch()
          //   .then(response => {
          //     return response.json();
          //   })
          //   .then(res => {
          //     return getFS
          //       .collection("currenciesUSDBase")
          //       .doc("gmX8vRZz944lqHEmJa53")
          //       .update(res.rates);
          //   })
          //   .then(() => updateRatesSuccess())
        );
      } else if (action.type === GET_RATES) {
        return concat(
          of(setStatus("pending"))
          // getFS
          //   .collection("currenciesUSDBase")
          //   .doc("gmX8vRZz944lqHEmJa53")
          //   .get()
          //   .then(snapshot => {
          //     return getRatesSuccess(snapshot.data());
          //   })
        );
      }
    })
  );
}
