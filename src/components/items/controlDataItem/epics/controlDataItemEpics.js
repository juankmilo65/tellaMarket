import {
  setStatus,
  setSubcategorySuccess,
  setProductInformationSuccess,
  setMultimediaSuccess,
  setPlanSuccess,
  translationSuccess,
  createItemSuccess,
  createItemError,
  SET_SUBCATEGORY,
  SET_PRODUCT_INFORMATION,
  SET_MULTIMEDIA,
  SET_PLAN,
  TRANSLATION,
  CREATE_ITEM
} from "../actions/controlDataItemActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function controlDataItemEpics(action$) {
  return action$.pipe(
    ofType(
      SET_SUBCATEGORY,
      SET_PRODUCT_INFORMATION,
      SET_MULTIMEDIA,
      CREATE_ITEM,
      SET_PLAN,
      TRANSLATION
    ),
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
      } else if (action.type === SET_MULTIMEDIA) {
        return concat(
          of(setStatus("pending")),
          of(setMultimediaSuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === SET_PLAN) {
        return concat(
          of(setStatus("pending")),
          of(setPlanSuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === CREATE_ITEM) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/createItem", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8"
            }),
            body: JSON.stringify(action.payload)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return createItemError("Failed");
              }
            })
            .then(data => {
              console.log(data);
              return createItemSuccess("Ok");
            })
        );
      }
    })
  );
}
