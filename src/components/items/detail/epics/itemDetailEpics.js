import {
  setStatus,
  getItemSuccess,
  GET_ITEM
} from "../actions/itemDetailActions";
import { ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function itemDetailEpics(action$) {
  return action$.pipe(
    ofType(GET_ITEM),
    switchMap(action => {
      if (action.type === GET_ITEM) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/getItemdsByIdItem?idItem=" + action.payload, {
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
              }
            })
            .then(dataItem => {
              return getItemSuccess(dataItem[0]);
            })
        );
      }
    })
  );
}
