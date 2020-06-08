import {
  CREATE_MENU,
  EDIT_MENU,
  GET_SUBCATEGORIES,
  GET_CATALOG,
  setStatus,
  getSubcategoresSuccess,
  getSubcategoresFailed,
  getCatalogSuccess,
  getCatalogFailed,
  editMenuSuccess,
  editMenuFailed,
  createMenuSuccess,
  createMenuFailed
} from "../actions/createMenuActions";
import { switchMap, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function createMenuEpics(action$) {
  return action$.pipe(
    ofType(CREATE_MENU, EDIT_MENU, GET_SUBCATEGORIES, GET_CATALOG),
    switchMap(action => {
      if (action.type === CREATE_MENU) {
        return concat(
          of(setStatus("pending")),
          fetch("/api/hello")
            .then((req, res) => {
              res.json();
            })
            .then(data => {
              return data;
            })
        );
      } else if (action.type === GET_SUBCATEGORIES) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/getAllSubcategories", {
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
                return getSubcategoresFailed("Failed");
              }
            })
            .then(data => {
              return getSubcategoresSuccess(data);
            })
        );
      } else if (action.type === GET_CATALOG) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/getAllCatalogs", {
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
                return getCatalogFailed("Failed");
              }
            })
            .then(data => {
              return getCatalogSuccess(data);
            })
        );
      }
    })
  );
}
