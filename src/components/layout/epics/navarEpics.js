import {
  SELECT_LANGUAGE,
  GET_CURRENT_LOCATION,
  HIDE_HEADER,
  SET_CATEGORIES,
  setStatus,
  setCategoriesSuccess,
  setLanguageSuccess,
  hideHeaderSuccess,
  getCurrentLocationSuccess
} from "../actions/navarActions";
import { switchMap, concatAll } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createItemEpics(action$) {
  return action$.pipe(
    ofType(SELECT_LANGUAGE, HIDE_HEADER, GET_CURRENT_LOCATION, SET_CATEGORIES),
    switchMap(action => {
      if (action.type === SET_CATEGORIES) {
        return concat(
          of(setStatus("pending")),
          of(setCategoriesSuccess(action.payload))
        );
      } else if (action.type === SELECT_LANGUAGE) {
        return concat(
          of(setStatus("pending")),
          of(setLanguageSuccess(action.payload))
        );
      } else if (action.type === HIDE_HEADER) {
        return concat(
          of(setStatus("pending")),
          of(hideHeaderSuccess(action.payload))
        );
      } else if (action.type === GET_CURRENT_LOCATION) {
        return concat(
          of(setStatus("pending")),
          //of(getCurrentLocationSuccess("Colombia"))
          fetch("https://extreme-ip-lookup.com/json/")
            .then(response => {
              return response.json();
            })
            .then(result => {
              var country = result.country;
              return getCurrentLocationSuccess(country);
            })
        );
      }
    })
  );
}
