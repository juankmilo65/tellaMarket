import {
  SET_FILE,
  setStatus,
  setFileSuccess
} from "../actions/fileUploadActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function fileUploadEpics(action$) {
  return action$.pipe(
    ofType(SET_FILE),
    switchMap(action => {
      if (action.type === SET_FILE) {
        return concat(
          of(setStatus("pending")),
          of(setFileSuccess(action.payload))
        );
      }
    })
  );
}
