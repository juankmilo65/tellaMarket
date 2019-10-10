import {
  setStatus,
  setSubcategorySuccess,
  setProductInformationSuccess,
  SET_SUBCATEGORY,
  SET_PRODUCT_INFORMATION
} from "../actions/controlDataItemActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function controlDataItemEpics(action$) {
  return action$.pipe(
    ofType(SET_SUBCATEGORY, SET_PRODUCT_INFORMATION),
    switchMap(action => {
      if (action.type === SET_SUBCATEGORY) {
        return concat(
          of(setStatus("pending")),
          of(setSubcategorySuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === SET_PRODUCT_INFORMATION) {
        return concat(
          of(setStatus("pending")),
          of(setProductInformationSuccess(action.payload)),
          of(setStatus("ok"))
        );
      }
    })
  );
}
